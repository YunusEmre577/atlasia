"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "next/navigation";
import { FetchCountries } from "@/components/fetching/Parameter";
import { Heading } from '../../components/ui/Heading';
import Snipper from "@/components/ui/Snipper";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { FetchMultiple } from "@/components/fetching/Multiple";
import { cn } from "@/components/lib/utils";
import { Card } from "@/components/ui/Card";

export default function Page() {
  const { name }: { name: string } = useParams();
  const { country } = FetchCountries(name.replaceAll("-", " "));
  const { countries } = FetchMultiple(country?.borders || []);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fav = localStorage.getItem("favorites");
    const favorites = fav ? JSON.parse(fav) : [];
    setIsFavorite(favorites.includes(country?.name.common));
  }, [country]);

  const handleFavoriteToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const fav = localStorage.getItem("favorites");
    let favorites = fav ? JSON.parse(fav) : [];

    if (favorites.includes(country?.name.common)) {
      favorites = favorites.filter(
        (item: any) => item !== country?.name.common
      );
    } else {
      favorites.push(country?.name.common);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const contentsInfo = [
    { title: "Capital", value: country?.capital instanceof Array ? country.capital.join(", ") : country?.capital },
    { title: "Continents", value: country?.continents.join(", ") },
    { title: "Currencies", value: Object.values(country?.currencies || {}).map(currency => `${currency.name} (${currency.symbol})`).join(", ") },
    { title: "Languages", value: Object.values(country?.languages || {}).join(", ") },
    { title: "Population", value: (country?.population ? (country.population as any / 1_000_000).toFixed(1) : 'N/A') + " Million" }
];

const validCountries = countries.filter(item => item && item.name && item.flags);

  return (
    <div>
      <Navbar>
        {country ? (
          <section className="flex flex-col gap-12">
            <div className="flex items-start flex-col lg:flex-row gap-6">
              <img
                className="bg-secondary rounded-md max-h-[220px] min-h-[220px] w-full lg:w-[400px]"
                src={country?.flags.svg}
                alt="country"
              />
              <div className="flex flex-col justify-between h-[180px] lg:h-[220px]">
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="uppercase text-muted font-semibold select-none text-sm">
                      name
                    </span>
                    <Heading className="pointer-events-none" size="h3">
                      {country?.name.common}
                    </Heading>
                  </div>
                  <div>
                    <span className="uppercase text-muted font-semibold select-none text-sm">
                      official name
                    </span>
                    <Heading className="pointer-events-none" size="h3">
                      {country?.name.official}
                    </Heading>
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <Link
                    target="_blank"
                    href={country.maps.googleMaps}
                    className="p-4 px-5 bg-secondary ring-1 transition hover:bg-secondary+1 active:ring-[3px] active:ring-secondary+2 text-text flex items-center gap-3 text-sm ring-secondary+1 rounded-lg"
                  >
                    <img className="h-[24px] w-[24px]" src="https://imgs.search.brave.com/7mPIwFT-my5WgS4nsXardPuJNpSrrrtOJz4cKw-I-UE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXZl/bG9wZXJzLmdvb2ds/ZS5jb20vc3RhdGlj/L21hcHMvaW1hZ2Vz/L21hcHMtaWNvbi5z/dmc" alt="googleMaps" />
                    Show on map
                  </Link>
                  <button
                    onClick={handleFavoriteToggle}
                    className="p-4 px-5 bg-secondary ring-1 transition-all hover:bg-secondary+1 focus:ring-[3px] focus:ring-secondary+2 text-text flex items-center gap-3 text-sm ring-secondary+1 rounded-lg"
                  >
                    {isFavorite ? (
                      <>
                        <Icon
                          className="text-2xl text-text"
                          icon={"solar:chat-round-check-bold"}
                        />
                        Remove
                      </>
                    ) : (
                      <>
                        <Icon
                          className="text-2xl text-text"
                          icon={"solar:chat-square-like-outline"}
                        />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-col">
                {contentsInfo.map((item, index) => (
                    <div key={index} className={`border flex items-center relative gap-5 border-secondary`}>
                    <span className="w-48 text-center p-5 uppercase font-semibold lg:text-xs text-[13px]">{item.title}</span>
                    <div className="w-[0.5px] h-full bg-secondary" />
                    <Heading size="h6" className="p-5 w-full">
                        {item.value}
                    </Heading>
                </div>
                ))}
            </div>
            <div className="flex flex-col gap-6">
            {validCountries.length ? (
                <div className="flex items-center gap-3">
                    <Heading size="h4">Border Countries</Heading>
                    <span className="text-xs lg:text-[11px] rounded-md bg-secondary text-text font-medium p-1.5 px-2.5">
                        {validCountries.length} available
                    </span>
                </div>
            ) : (
                <Heading size="h4">Border Countries</Heading>
            )}
            <div className={cn(`grid grid-col gap-6 mb-24 lg:mb-8`, {
                "md:grid-cols-2 lg:grid-cols-3": countries.length
            })}>
                {validCountries.length ? countries.map((item, index) => (
                    item && item.name && item.flags ? (
                        <Card
                            key={index}
                            href={`/${item.name.common.toLowerCase().replaceAll(" ", "-")}`}
                            cardTitle={item.name.common}
                            CardDescription={item.name.official}
                            cardImg={item.flags.svg}
                        />
                    ) : null
                )) : (
                    <div className="w-full p-16 rounded-md border-dashed border-secondary+1 border-[3px] flex items-center flex-col gap-5 justify-center">
                        <Icon className="text-6xl text-secondary+2" icon="solar:notes-broken" />
                        <Heading className="font-medium" size="h3">
                            Border Country not found.
                        </Heading>
                    </div>
                )}
            </div>
            </div>
          </section>
        ) : (
          <Snipper />
        )}
      </Navbar>
    </div>
  );
}
