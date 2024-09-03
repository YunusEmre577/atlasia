import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    const links = [
        {
            icon: "bxl:github",
            href: "https://github.com/YunusEmre577"
        },
        {
            icon: "bxl:discord-alt",
            href: "https://discord.com/users/undefined"
        },
        {
            icon: "bxl:instagram",
            href: "https://instagram.com/yunus.emregun"
        }
    ]
  return (
    <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-1'>
            {links.map((item, index) => (
                <Link  key={index} target="_blank" href={`${item.href}`} className='h-10 w-10 text-xl rounded-full bg-secondary transition-all hover:bg-secondary+1 active:ring-[3px] active:ring-secondary+2 flex items-center justify-center cursor-pointer'>
                <Icon icon={`${item.icon}`} />
            </Link>
            ))}
        </div>
    </div>
  )
}
