"use client";
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { FetchAllCountries } from '@/components/fetching/All';
import Snipper from '@/components/ui/Snipper';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';

export default function Page() {
  const { countries } = FetchAllCountries();

  // Kıtaları sayıya göre hesapla
  const continentsCount = countries.reduce((acc, country) => {
    if (country.continents && country.continents.length > 0) {
      country.continents.forEach(continent => {
        if (acc[continent]) {
          acc[continent]++;
        } else {
          acc[continent] = 1;
        }
      });
    }
    return acc;
  }, {} as Record<string, number>);

  // Kategorilere göre ayır
  const groupedByContinent = countries.reduce((acc, country) => {
    if (country.continents && country.continents.length > 0) {
      country.continents.forEach(continent => {
        if (!acc[continent]) {
          acc[continent] = [];
        }
        acc[continent].push(country);
      });
    }
    return acc;
  }, {} as Record<string, typeof countries>);

  return (
    <main>
      <Navbar>
        {countries.length ? (
          <main className='flex flex-col gap-8 mb-20 lg:mb-8'>
            <header className='p-3 flex items-center gap-2 sticky top-0 bg-foreground/90 backdrop-blur-md overflow-auto'>
              {Object.entries(continentsCount).map(([continent, count]) => (
                <div key={continent} className="text-[15px] cursor-pointer lg:text-sm p-2 px-4 bg-secondary text-text rounded-full transition-all hover:bg-secondary+1 active:ring-[3px] active:ring-secondary+2 flex items-center justify-center gap-4 whitespace-nowrap">
                  <span className="font-semibold">{continent}</span>
                  <span className="text-[13px] lg:text-xs text-muted font-semibold">{count}</span>
                </div>
              ))}
            </header>
            <section className="flex flex-col gap-8">
              {Object.entries(groupedByContinent).map(([continent, countries]) => (
                <div key={continent}>
                 <div className='flex items-center gap-3 mb-6'>
                 <Heading size="h3" className=''>{continent}</Heading>
                  <span className='text-[11px] lg:text-[10px] font-medium text-text bg-secondary rounded-md p-1 px-2 cursor-pointer'>
                    {countries.length} available
                  </span>
                 </div>
                  <div className="grid grid-col md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {countries.map((item, index) => (
                      <Card
                        key={index}
                        href={`/${item.name.common.toLowerCase().replaceAll(" ", "-")}`}
                        cardTitle={item.name.common}
                        CardDescription={item.capital as string}
                        cardImg={item.flags.svg}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </main>
        ) : (
          <Snipper />
        )}
      </Navbar>
    </main>
  );
}
