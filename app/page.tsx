"use client"
import { Card } from '@/components/ui/Card';
import Navbar from '../components/Navbar/Navbar';
import { Heading } from '../components/ui/Heading';
import { FetchAllCountries } from '@/components/fetching/All';
import Snipper from '@/components/ui/Snipper';

export default function Home() {
  const { countries } = FetchAllCountries()

  return (
    <main className='w-full mb-24 lg:mb-8'>
      <Navbar>
        <section className='flex flex-col gap-6'>
        <div className='flex items-center gap-3'>
          <Heading size="h4">
            All Countries
          </Heading>
          <span className='bg-secondary rounded-md p-1.5 px-2.5 text-xs lg:text-[11px] font-medium text-text'>
            {countries.length} available
          </span>
        </div>
        <section className='grid grid-col md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {countries.length ? countries.map((item, index) => (
            <Card
            key={index}
            cardTitle={item.name.common}
            CardDescription={item.capital as string}
            href={`${item.name.common.toLowerCase().replaceAll(" ", "-")}`}
            cardImg={item.flags.svg}
            />
          )) : (
            <Snipper />
          )}
        </section>
        </section>
      </Navbar>
    </main>
  );
}
