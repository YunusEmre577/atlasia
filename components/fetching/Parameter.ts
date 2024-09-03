"use client"
import React, { useEffect, useState } from 'react'

interface CountryProps {
    name: {
        common: string;
        official: string;
    };
    flags: {
        svg: string;
    };
    capital: string[] | string;
    maps: {
        googleMaps: string;
    };
    continents: string[];
    currencies: {
        [key: string]: { name: string; symbol: string };
    };
    languages: Record<string, any>;
    population: string;
    borders: string[]
}

export function FetchCountries(cityName?: string) {
    const [country, setCountry] = useState<CountryProps | null>(null)

    useEffect(() => {
        const fetchCountry = async () => {
            if (cityName) {
                const res = await fetch(`https://restcountries.com/v3.1/name/${cityName}`)
                const data = await res.json();
                setCountry(data[0] || null);
            }
        }
        fetchCountry()
    }, [cityName])

    return {
        country,
        setCountry
    }
}
