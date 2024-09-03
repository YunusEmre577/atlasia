"use client"
import React from 'react'
import pages from "./pages.json"
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import { usePathname } from 'next/navigation'
export default function Responsive() {
    const pathname = usePathname()
  return (
    <div className='grid grid-cols-4 border-t border-t-secondary items-center justify-center w-full text-center'>
        {pages.map((item, index) => (
            <Link href={item.href} className={`p-3 flex justify-center items-center hover:bg-secondary transition flex-col gap-2`} key={index}>
                <Icon className={`text-2xl ${pathname == item.href ? "text-primary+2" : "text-muted"}`} icon={`${item.icon}-${pathname == item.href ? "bold-duotone" : "outline"}`} />
                <p className={`whitespace-nowrap text-xs ${pathname == item.href ? "text-text" : "text-muted"}`}>{item.title}</p>
            </Link>
        ))}
    </div>
  )
}
