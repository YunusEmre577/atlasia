"use client"
import React from 'react'
import Header from './Header'
import Middle from './Middle'
import Bottom from './Bottom'
import Footer from './Footer';
import Responsive from './Responsive';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { FetchAllCountries } from '../fetching/All';

export default function Navbar({ children }: { children: React.ReactNode }) {
  const { countries } = FetchAllCountries();

  const randomCountry = countries.length > 0 ? countries[Math.floor(Math.random() * countries.length)] : null;

  return (
    <>
    <aside className='fixed hidden lg:flex border-r border-secondary mx-36 h-screen w-72 pt-8'>
        <section className='flex flex-col justify-between gap-8 h-full w-full'>
        <article className='flex flex-col gap-8 w-full'>
        <Header />
        <Middle />
        <Bottom />
        </article>
        <article className='absolute bottom-8'>
          <Footer />
        </article>
        </section>
    </aside>
    <aside className='flex lg:hidden fixed bottom-0 w-full bg-foreground/90 backdrop-blur-sm z-50 border-t border-t-secondary'>
        <Link href={randomCountry ? `/${randomCountry.name.common.toLowerCase().replaceAll(" ", "-")}` : "/"} className='absolute right-4 bottom-20 h-14 w-14 flex items-center justify-center bg-primary hover:bg-primary+1 transition active:ring-[3px] active:ring-primary+2 rounded-full text-3xl text-text'>
        <Icon icon={"solar:transfer-vertical-bold-duotone"}/>
        </Link>
      <Responsive />
    </aside>
    <main className='pt-12 px-6 lg:pl-[470px] lg:pr-32'>
        {children}
    </main>
    </>
  )
}
