"use client"
import React from 'react'
import pages from "./pages.json"
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import { usePathname } from 'next/navigation'
export default function Middle() {
    const pathname = usePathname()
  return (
    <article className='flex flex-col gap-0'>
        {pages.map((item, index) => (
            <Link href={item.href} key={index} className='w-full group cursor-pointer'>
                <div className={`font-medium p-[18px] w-fit px-6 text-base ${pathname == item.href ? "group-active:ring-[3px] group-active:ring-secondary+2 font-semibold group-hover:bg-secondary text-text" : "group-active:ring-[3px] group-active:ring-secondary+2 group-hover:bg-secondary group-hover:text-text"} rounded-full transition flex items-center gap-4`}>
                <Icon className={`text-3xl ${pathname == item.href ? "text-primary" : "text-muted"}`} icon={`${item.icon}-${item.href == pathname ? "bold-duotone" : "outline"}`} />
                {item.title}
            </div>
            </Link>
        ))}
    </article>
  )
}
