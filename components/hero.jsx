'use client'

import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {

    const imageRef = useRef();

    useEffect(()=>{

        const imageElement = imageRef.current;  
        const handleScroll =()=>{
            const scollPosition = window.scrollY;
            const scrollThreshold = 100;
            if(scollPosition > scrollThreshold){
                imageElement.classList.add('scrolled')
            }else{
                imageElement.classList.remove('scrolled')
            }
        }

        window.addEventListener('scroll', handleScroll);

        return ()=> window.removeEventListener('scroll', handleScroll);
    },[])


  return (
    <div className='pb-20 px-4'>
        <div className='container text-center mx-auto'>
            <h1 className='text-5xl md:text-8xl lg:text-[140px] pb-6 gradient-title'>Manage your finances <br/> with Intelligence </h1>
            <p className='text-xl text-gray-600 mb-4 mx-auto max-w-2xl'>
                An AI-powered financial management platform that help you track,
                analyze and optimize your spending with real-time insights
            </p>
            
          <div className='space-x-4 py-4'>
              <Link href={"/dashboard"}>
                 <Button size='lg' className='px-8'>Get Started</Button>            
              </Link>

              <Link href={"/"}>
                <Button size='lg' className='px-8' variant="outline">Demo</Button>            
              </Link>
         </div>
        </div>

        <div className='hero-image-wrapper'>
            <div ref={imageRef} className='hero-image'>
               <Image src={'/banner.jpeg'} width={1280} height={720} alt='noImg' className='mx-auto rounded-xl shadow-2xl border'></Image>
            </div>
        </div>

    </div>
  )
}

export default HeroSection
