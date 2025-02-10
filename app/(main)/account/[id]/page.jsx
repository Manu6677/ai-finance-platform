import React from 'react'
import { getAccountWithTransactions } from '@/actions/account';
import { notFound } from 'next/navigation';

const AccountPage = async ({ params }) => {

  const accountData = await getAccountWithTransactions(params.id);

  console.log('accountData', accountData);
  if(!accountData){ return notFound(); }

  const { transaction, ...account } = accountData;

  return (
    <div className='space-y-8 px-5 flex gap-4 items-end justify-between border'>
      <div>
        <h1 className='text-5xl sm:text-6xl font-bold gradient-title capitalize tracking-tight'>{account.name}</h1>
        <p className='text-muted-foreground'>{ account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account</p>
      </div>

      <div className='text-right'>
        <div className='text-xl sm:text-2xl font-bold'>${parseFloat(account.balance).toFixed(2)}</div>
        <p className='text-muted-foreground text-sm'>{account._count.transaction} Transactions</p>
      </div>

      {/* chart section */}

      {/* transaction Table  */}
    </div>
  )
}

export default AccountPage; 