"use client";
import React, { createContext, useState } from "react";
import { PokedexContextType, PokemonPayload } from "@/interfaces/pokedex";

export const PokedexContext = createContext<PokedexContextType>({
  currentPokemon: null,
  handleCurrentPokemon: () => {},
  currentPage: 0,
  handleCurrentPage: () => {},
});

interface PokedexProps {
  children: React.ReactNode;
}

export const PokedexProvider: React.FC<PokedexProps> = ({ children }) => {
  const [currentPokemon, setCurrentPokemon] = useState<PokemonPayload | null>(
    null
  );

  const handleCurrentPokemon = (pokemon: PokemonPayload) => {
    setCurrentPokemon(pokemon);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <PokedexContext.Provider
      value={{
        currentPokemon,
        handleCurrentPokemon,
        currentPage,
        handleCurrentPage,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export const usePokedex = () => {
  const context = React.useContext(PokedexContext);
  if (!context) {
    throw new Error("usePokedex must be used within PokedexContext");
  }
  return context;
};
