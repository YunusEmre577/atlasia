import React from 'react';
import { FetchAllCountries } from '../fetching/All';
import { cn } from '../lib/utils';
import Link from 'next/link';

export default function Bottom() {
  const { countries } = FetchAllCountries();

  const randomCountry = countries.length > 0 ? countries[Math.floor(Math.random() * countries.length)] : null;

  return (
    <Link
      href={randomCountry ? `/${randomCountry.name.common.toLowerCase().replaceAll(' ', '-')}` : '#'}
      className={cn(
        `p-[18px] mr-12 flex justify-center items-center bg-primary hover:bg-primary+1 transition active:ring-[3px] active:ring-primary+2 rounded-full text-text font-medium`,
        {
          'bg-secondary+1': !countries.length
        }
      )}
    >
      Random Country
    </Link>
  );
}
