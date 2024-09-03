"use client";
import React, { useEffect, useState } from 'react';

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

export function FetchMultiple(cityNames?: string[]) {
    const [countries, setCountries] = useState<CountryProps[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            if (cityNames && cityNames.length > 0) {
                const countryPromises = cityNames.map(name =>
                    fetch(`https://restcountries.com/v3.1/name/${name}`)
                        .then(res => res.json())
                        .then(data => data[0])
                );
                
                const results = await Promise.all(countryPromises);
                setCountries(results);
            }
        };

        fetchCountries();
    }, [cityNames]);

    return {
        countries,
        setCountries
    };
}
