import { pokemonAxios } from "./axios";
import {
  GetPokemonDTO,
  GetPokemonListDTO,
} from "../types/pokemon";
import { GetEvolutionChainsDTO } from "../types/pokemonEvolution";
import { GetPokemonSpeciesDTO } from "../types/pokemonSpecies";

const pokemonAPI = {
  getPokemonList: async (page: number): Promise<GetPokemonListDTO> => {
    const { data } = await pokemonAxios.get(`pokemon?limit=20&offset=${page}`);
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
  getPokemonSpeciesById: async (id:number):Promise<GetPokemonSpeciesDTO> => {
    console.log("?id", id);
    const { data } = await pokemonAxios.get(`pokemon-species/${id}`);
    return data;
  }
};

export default pokemonAPI;
