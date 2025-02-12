"use client";

import { usePokedex } from "@/context/pokedex";
import { PokemonPayload, PokemonResponse } from "@/interfaces/pokedex";
import { useEffect, useState } from "react";
import Image from "next/image";
export type PokemonCardsProps = {
  data: PokemonPayload;
};

export function PokemonCard(props: PokemonCardsProps) {
  const { data } = props;
  return (
    <div className="w-96 h-96 bg-base-200 rounded-lg hover:scale-105 cursor-pointer duration-300 m-4 flex flex-col justify-center items-center">
      <div className="w-[250px] h-[250px] relative rounded-t-lg flex justify-start items-center">
        <Image
          src={data.sprites.image}
          className=" object-cover"
          width={250}
          height={250}
          alt={data.name}
        ></Image>
      </div>
      <div className="w-full h-full rounded-b-lg p-4 flex flex-col justify-center items-center">
        <div className="w-full h-10 flex flex-row justify-start items-center">
          <p className="text-lg font-bold text-secondary mr-2">Nº {data.id}</p>
          <p className="text-lg font-bold text-white">
            {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
          </p>
        </div>
        <div className="w-full flex flex-row flex-wrap">
          {data.types.map((pokemonType) => {
            return (
              <div
                className="border-[1px] border-primary bg-base-300 text-primary rounded-md mr-2 px-2"
                key={pokemonType}
              >
                {pokemonType}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ContentPage() {
  const { currentPokemon, currentPage } = usePokedex();
  const [data, setData] = useState<PokemonResponse | null>(null);
  const [isLoading, setLoading] = useState(true);

  console.log(currentPage);
  console.log(data);

  useEffect(() => {
    const value = `${process.env["NEXT_PUBLIC_SERVER_URL"]}/pokemon/list?page=${currentPage}`;
    console.log(value);
    fetch(value, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <div className="w-full h-full flex flex-row justify-center items-center flex-wrap overflow-y-auto">
      {isLoading ? <h1>loading...</h1> : null}
      {data && currentPokemon === null ? (
        data.pokemons.map((pokemon) => {
          return <PokemonCard data={pokemon} key={pokemon.id}></PokemonCard>;
        })
      ) : currentPokemon !== null ? (
        <PokemonCard
          data={currentPokemon}
          key={currentPokemon.id}
        ></PokemonCard>
      ) : !data && !currentPokemon ? (
        <div>Nothing found</div>
      ) : null}
    </div>
  );
}
