import React from 'react'
import { Heading } from '../ui/Heading';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Header() {
  return (
    <header className='group w-full cursor-pointer'>
       <div className='group-hover:bg-secondary h-16 w-16 group-active:ring-[3px] group-active:ring-secondary+2 rounded-full transition flex items-center justify-center'>
       <Icon className='text-4xl text-text' icon={"solar:compass-big-bold"} />
       </div>
    </header>
  )
}
