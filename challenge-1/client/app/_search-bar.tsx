"use client";
import { usePokedex } from "@/context/pokedex";
import { PokemonPayload } from "@/interfaces/pokedex";
import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const { handleCurrentPokemon } = usePokedex();
  const [loading, setLoading] = useState(false);
  const handleSearch = () => {
    if (!inputValue.trim()) {
      alert("Please enter a valid ID or Name.");
      return;
    }
    setLoading(true);
    fetchData(inputValue);
  };

  const fetchData = (query: string) => {
    fetch(`${process.env["NEXT_PUBLIC_SERVER_URL"]}/pokemon/${query}`)
      .then((response) => response.json())
      .then((data: PokemonPayload) => {
        handleCurrentPokemon(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (inputValue.trim()) {
      fetchData(inputValue);
    }
  }, []);

  return (
    <div className="w-full h-12 my-12 flex flex-row justify-center items-center">
      <label className="input input-bordered hover:input-primary flex items-center gap-2 w-96">
        <input
          type="text"
          className="grow"
          placeholder="ID or Name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleSearch} disabled={loading}>
          <IoIosSearch
            size={20}
            className="text-neutral-content active:text-primary"
          />
        </button>
      </label>
    </div>
  );
}
