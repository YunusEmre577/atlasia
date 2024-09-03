"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { CountProps, FetchAllCountries } from '@/components/fetching/All';
import { Card } from '@/components/ui/Card';
import { useDebounce } from 'use-debounce'; 
import Snipper from '@/components/ui/Snipper';
import { cn } from '@/components/lib/utils';
import { Heading } from '../../components/ui/Heading';

export default function Page() {
    const { countries } = FetchAllCountries(); // Veri alımı
    const [searchedCountries, setSearchedCountries] = useState<string>("");
    const [debouncedSearch] = useDebounce(searchedCountries, 500); 
    const [filteredCountries, setFilteredCountries] = useState<CountProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [noResults, setNoResults] = useState<boolean>(false);

    useEffect(() => {
        if (debouncedSearch.length > 0) {
            const filterCountries = async () => {
                setLoading(true); // Yüklenme işlemi başlat
                try {
                    const filtered = countries.filter(item => 
                        item.name.common.toLowerCase().includes(debouncedSearch.toLowerCase())
                    );
                    setFilteredCountries(filtered);
                    setNoResults(filtered.length === 0); // Sonuç yoksa noResults true
                } catch (error) {
                    console.error("Error filtering countries:", error);
                } finally {
                    setTimeout(() => {
                        setLoading(false)
                    }, 500);
                }
            }
            filterCountries();
        } else {
            setFilteredCountries([])
        }
    }, [debouncedSearch, countries]);

    return (
        <div>
            <Navbar>
                <section className='flex flex-col gap-8 mb-24 lg:mb-8'>
                    <label className='relative'>
                        <input 
                            value={searchedCountries} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchedCountries(e.target.value)} 
                            type="text" 
                            className={cn('text-text placeholder:text-secondary+2 font-semibold text-sm outline-none transition-all focus:ring-[3px] focus:ring-secondary+2 focus:bg-secondary+1 focus:w-full w-full lg:w-80 lg:focus:w-96 p-4 px-5 bg-secondary pl-14 rounded-full', {
                                "bg-secondary+1 ring-[3px] ring-secondary+2 w-full lg:w-96": searchedCountries
                            })}
                            placeholder='Search countries' 
                        />
                        <span className='absolute left-4 text-2xl text-secondary+2 top-1/2 -translate-y-1/2'>
                            <Icon icon={"solar:rounded-magnifer-outline"} />
                        </span>
                    </label>
                    {noResults && !loading && (
                            <div className='p-14 mt-12 border-[3px] border-dashed rounded-md flex flex-col gap-2 items-center text-center border-secondary+1'>
                                <Icon className='text-3xl text-secondary+2' icon={"solar:notes-broken"} />
                                <Heading size="h3" className='font-medium'>Country not found.</Heading>
                            </div>
                        )}
                    <div className='grid grid-col md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {loading && <Snipper/>} {/* Loading göstergesi */}
                        {!loading && filteredCountries.length > 0 && filteredCountries.map((item, index) => (
                            <Card
                                cardImg={item.flags.svg}
                                cardTitle={item.name.common}
                                CardDescription={`${item.capital}`}
                                href={`/${item.name.common.toLowerCase().replaceAll(" ", "-")}`}
                                key={index}
                            />
                        ))}
                    </div>
                </section>
            </Navbar>
        </div>
    );
}
