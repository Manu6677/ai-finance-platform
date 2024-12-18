import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'

const Header = () => {
  return (
    <header className='fixed w-full top-0 bg-white/80 backdrop-blur-md z-50 border-b'>
      <nav className='container mx-auto py-4 px-4 flex items-center justify-between'>
        <Link href={"/"}>
         <Image src={"/logo.png"} width={200} height={40} alt='noImg' className='h-12 w-auto object-contain'></Image>
        </Link>

      <div className='flex space-x-4'>
        <SignedIn>
          <Link href={"/dashboard"} className='flex items-center text-gray-600 hover:text-blue-600 gap-2'>
           <Button variant="outline">
             <LayoutDashboard></LayoutDashboard>
             <span className='hidden md:inline'>Dashboard</span>
           </Button>
          </Link>

          <Link href={"/transaction/create"} className='flex items-center text-gray-600 hover:text-blue-600 gap-2'>
           <Button>
             <PenBox></PenBox>
             <span className='hidden md:inline'>Add Transaction</span>
           </Button>
          </Link>
        </SignedIn>

        <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard'>
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{
              elements: {
                avatarBox: 'w-10 h-10',
              },
            }}>
              <Button variant="outline">Logout</Button>
            </UserButton>
          </SignedIn>
      </div>
      </nav>
    </header>

    
  )
}

export default Header
