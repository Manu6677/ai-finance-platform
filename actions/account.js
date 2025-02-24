"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

export async function updateDefaultAccount(accountId) {
  try {
    const { userId } = await auth();
    const testUserClerk = await auth();

    console.log("testUserClerk", testUserClerk);

    if (!userId) {
      throw new Error("Unauthorized User");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    // First, unset any existing default account
    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: {
        isDefault: false,
      },
    });

    // Then set the new default account
    const account = await db.account.update({
      where: { id: accountId, userId: user.id },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAccountWithTransactions(accountId) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized User");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    const account = await db.account.findUnique({
      where: { id: accountId, userId: user.id },
      include: {
        transactions: {
          orderBy: { date: "desc" },
        },
        _count: {
          select: { transactions: true },
        },
      },
    });
    console.log("account server", account);

    if (!account) return null;

    return {
      ...serializeTransaction(account),
      transactions: account.transactions.map(serializeTransaction),
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function bulkDeleteTransactions(transactionIds) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized User");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    console.log("transactionIds", transactionIds);

    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    console.log("transaction", transactions);

    // Group transactions by account to update balances
    const accountBalanceChanges = transactions.reduce((acc, transaction) => {
      const change =
        transaction.type === "EXPENSE"
          ? parseFloat(transaction.amount.toString())
          : -parseFloat(transaction.amount.toString());

      acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
      return acc;
    }, {});

    console.log("accountBalanceChanges", accountBalanceChanges);

    // delete transactions and update account balance in transactions

    await db.$transaction(async (tx) => {
      // delete transactions
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      for (const [accountId, balanceChange] of Object.entries(
        accountBalanceChanges
      )) {
        console.log("Updating account:", accountId, "Change:", balanceChange); // Log for debugging
        await tx.account.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: balanceChange, // This will now be a valid number
            },
          },
        });
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
}
