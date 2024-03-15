import axios from "axios";

const END_POINT = "https://pokeapi.co/api/v2/";
export const pokemonAxios = axios.create({
  baseURL: END_POINT,
});
