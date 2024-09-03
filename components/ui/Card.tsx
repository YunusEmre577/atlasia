import React from 'react'
import { Heading } from './Heading'
import Link from 'next/link'


function Card({ cardImg, cardTitle, CardDescription, className, href }: {href: string, cardImg: string, cardTitle: string, CardDescription: string, className?:string}) {
    return (
      <Link href={href} className='p-4 cursor-pointer bg-secondary transition hover:bg-secondary+1 active:ring-[3px] active:ring-secondary+2 rounded-md flex flex-col gap-2'>
        <img className="bg-cover bg-secondary+1 rounded-md h-44" src={cardImg} alt="countries card" />
        <div className='space-y-1'>
        <Heading size='h5'>{cardTitle}</Heading>
        <span className='text-sm'>{CardDescription}</span>
        </div>
      </Link>
    )
  }
  

  export {
    Card
  }