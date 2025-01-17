"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";
import { toast } from "sonner";

const serializeTransaction = (obj)=>{
    const serialized = {...obj};
    
    if(obj.balance){
        serialized.balance = obj.balance.toNumber();
    }
}

export async function createAccount(data) {
  try {
    const { userId } = await auth();
    console.log(userId, 'userId server actions');
    if (!userId) { return toast.error('Invalid Credentials') }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) { console.log('User not found'); }

    // convert balance to float before saving
    console.log(data.balance, typeof data.balance, 'data.balance server actions');
    const balanceFloat = parseFloat(data.balance);
    console.log(balanceFloat, typeof balanceFloat, 'balanceFloat server actions');

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

    // console.log(...data);
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
