import { pokemonAxios } from "./axios";
import { GetPokemonListDTO } from "../types/pokemon";

const pokemonAPI = {
  getPokemonList: async (page: number): Promise<GetPokemonListDTO> => {
    const { data } = await pokemonAxios.get(`pokemon?limit=20&offset=${page}`);
    return data;
  },
  getPokemonByName: async (name: string) => {
    const { data } = await pokemonAxios.get(`pokemon/${name}`);
    return data;
  },
};

export default pokemonAPI;
