import { pokemonAxios } from "./axios";
import { GetPokemonDTO, GetPokemonListDTO } from "../types/pokemon";
import { GetEvolutionChainsDTO } from "../types/pokemonEvolution";
import { GetPokemonSpeciesDTO } from "../types/pokemonSpecies";
import { LIST_LIMIT } from "../constant/const";

const pokemonAPI = {
  getPokemonList: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm?: string;
  }): Promise<GetPokemonListDTO | GetPokemonDTO> => {
    let url = searchTerm
      ? `pokemon/${searchTerm}?limit=${LIST_LIMIT}&offset=${LIST_LIMIT * page}`
      : `pokemon?limit=${LIST_LIMIT}&offset=${LIST_LIMIT * page}`;
    const { data } = await pokemonAxios.get(url);
    return data;
  },
  getPokemonByName: async (name: string): Promise<GetPokemonDTO> => {
    const { data } = await pokemonAxios.get(`pokemon/${name}`);
    return data;
  },
  getPokemonById: async (id: number): Promise<GetPokemonDTO> => {
    const { data } = await pokemonAxios.get(`pokemon/${id}`);
    return data;
  },
  getEvolutionChains: async (id: number): Promise<GetEvolutionChainsDTO> => {
    const { data } = await pokemonAxios.get(`evolution-chain/${id}`);
    return data;
  },
  getPokemonSpeciesById: async (id: number): Promise<GetPokemonSpeciesDTO> => {
    const { data } = await pokemonAxios.get(`pokemon-species/${id}`);
    return data;
  },
};

export default pokemonAPI;
