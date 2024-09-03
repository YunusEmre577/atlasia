"use client"
import React, { useEffect, useState } from 'react'

export interface CountProps {
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
export function FetchAllCountries() {
    const [countries, setCountries] = useState<CountProps[]>([])
    useEffect(() => {
        const fetchCountries = async () => {
            const res = await fetch("https://restcountries.com/v3.1/all")
            const data = await res.json();
            setCountries(data)
        }
        fetchCountries()
    }, [])

    return {
        countries,
        setCountries
    }
}
