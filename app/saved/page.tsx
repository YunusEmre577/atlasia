"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Heading } from '../../components/ui/Heading';
import Link from 'next/link';
import { CountProps } from '@/components/fetching/All';
import { Card } from '@/components/ui/Card';

export default function Page() {
    const [isSaved, setIsSaved] = useState<boolean>(true)
    const [favorites, setFavorites] = useState<CountProps[]>([])

    useEffect(() => {
        const fetchCountries = async () => {
            if (localStorage.getItem("favorites")) {
                setIsSaved(true)
                const names = JSON.parse(localStorage.getItem("favorites") as string)

                // Use a temporary array to collect country data
                const fetchedCountries: CountProps[] = []

                // Fetch each country individually
                for (const item of names) {
                    try {
                        const res = await fetch(`https://restcountries.com/v3.1/name/${item}`)
                        if (!res.ok) throw new Error('Country not found');
                        const data = await res.json();
                        fetchedCountries.push(data[0]);
                    } catch (error) {
                        console.error(error);
                    }
                }

                // Update state with the collected data
                setFavorites(fetchedCountries);
            } else {
                setIsSaved(false)
            }
        }

        fetchCountries();
    }, [])

    return (
        <main>
            <Navbar>
                {!isSaved || favorites.length < 1 ? (
                    <section className='-translate-y-8 flex items-center flex-col justify-center h-[calc(100vh-48px)]'>
                        <div className='border-[3px] border-secondary+1 rounded-md text-center w-full flex flex-col gap-3 items-center justify-center p-20 border-dashed'>
                            <Icon className='text-8xl text-secondary+2' icon={"solar:bookmark-broken"} />
                            <article className='space-y-2'>
                                <Heading size='h1' className='font-medium'>
                                    Saved not found.
                                </Heading>
                                <p className="text-[15px] lg:text-sm">Tap the button to register your first country</p>
                            </article>
                            <Link href={"/"} className='p-3 hover:bg-muted transition focus:ring-[3px] focus:ring-muted font-medium text-[15px] lg:text-sm px-8 bg-text rounded-full text-foreground'>
                                Save now
                            </Link>
                        </div>
                    </section>
                ) : (
                    <section className='flex flex-col gap-6'>
                        <article className='flex items-center gap-3'>
                            <Heading size='h4'>Your favorites</Heading>
                            <span className='text-[11px] lg:text-[10px] p-1 px-2 bg-secondary text-text rounded-md font-medium'>
                                {favorites.length} available
                            </span>
                        </article>
                        <section className='grid grid-col gap-6 md:grid-cols-2 lg:grid-cols-3'>
                            {favorites.map((item, index) => (
                                <Card
                                    key={index}
                                    cardImg={item.flags?.svg}
                                    cardTitle={item.name?.common}
                                    CardDescription={item.capital as string}
                                    href={`/${item.name?.common?.toLowerCase()?.replaceAll(" ", "-")}`}
                                />
                            ))}
                        </section>
                    </section>
                )}
            </Navbar>
        </main>
    )
}
