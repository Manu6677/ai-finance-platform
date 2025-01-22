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
    revalidatePath("/dashboard") //Functions like revalidatePath for cache management are server-side only and cannot run in a client environment.
    //Authentication using auth() from @clerk/nextjs/server involves sensitive operations like accessing the user's userId. This should only occur on the server for security.
   //The Prisma database operations (db.user.findUnique, db.account.create, etc.) interact with the database directly, which should not be exposed to the client to avoid vulnerabilities like SQL injection.
    return {success: true, data: serializedAccount}

  } catch (error) {
    throw new Error(error.message);
  }
}


/* 
Flow Diagram
1) User Action: The user submits a form to create a new account.
2) Authentication: auth() ensures the user is logged in.
3) Validation:
     Validates the balance value.
      Checks if the user exists.
4) Logic:
6) Fetches existing accounts.
7) Determines if the account should be the default.
9) Updates existing default accounts (if necessary).
10) Database:
     Creates the new account with provided data.
11) Response:
   Revalidates the dashboard.
   Returns success or throws an error.


*/