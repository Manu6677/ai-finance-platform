"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/dist/types/server";
import { revalidatePath } from "next/cache";


const serializeTransaction = (obj)=>{
    const serialized = {...obj};

    if(obj.balance){
        serialized.balance = obj.balance.toNumber();
    }
}

export async function createAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) { return console.log("Unauthorized user"); }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) { console.log('User not found'); }

    // convert balance to float before saving
    const balanceFloat = parseFloat(data.balance);
    if(isNaN(balanceFloat)){
        throw new Error('Invalid balance amount');
    }

    // check if it is the user first account
    const existingAccounts = await db.account.findMany({
        where: { userId: user.id }
    })

    const shouldBeDefault = existingAccounts.length === 0 ? true: data.isDefault;

    // If this account should be default, unset other default account
    if(shouldBeDefault){
        await db.account.updateMany({
            where: { userId: user.id, isDefault: true },
            data: {isDefault: false },
        });
    }

    const account = await db.account.create({
        data: {
            ...data,
            balance: balanceFloat,
            userId: user.id,
            isDefault: shouldBeDefault,
        },
    });

    const serializedAccount = serializeTransaction(account);
    revalidatePath("/dashboard")
    return {success: true, data: serializedAccount}

  } catch (error) {
    throw new Error(error.message);
  }
}
