export interface Sprites {
  image: string;
  gif: string;
}

export interface PokemonPayload {
  id: number;
  name: string;
  sprites: Sprites;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
  stats: [string, number][];
}

export interface PokedexContextType {
  currentPokemon: PokemonPayload | null;
  handleCurrentPokemon: (pokemon: PokemonPayload) => void;
  currentPage: number;
  handleCurrentPage: (page: number) => void;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  pokemons: PokemonPayload[];
}
