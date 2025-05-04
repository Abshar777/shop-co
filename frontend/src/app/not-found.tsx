import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'


const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[50vh] md:h-[80vh]'>
      <img src={'/404.svg'} alt='not found' className='md:w-1/2 w-full ' />
      <p className='text-xl'>Page Not Found</p>
      <Link href='/' className=''>
        <Button className='mt-4'>Go to Home</Button>
      </Link>
    </div>
  )
}

export default NotFound
