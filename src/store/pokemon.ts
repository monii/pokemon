import { create } from "zustand";
import { splitString, convertToNumber } from "../util/util";

interface PokemonStore {
  evolutionId: number;
  searchTerm: string;
  userInput: string;
  setEvolutionId: (evolutuinUrl: string) => void;
  setSearchTerm: (searchTerm:string) => void;
  setUserInput: (userInput:string) => void;
}
const usePokemonStore = create<PokemonStore>((set) => ({
  evolutionId: 0,
  searchTerm: "",
  userInput:"",
  setEvolutionId: (url: string) => {
    const id = splitString(url, "/").at(-2);
    set({ evolutionId: convertToNumber(id) });
  },
  setSearchTerm: (searchTerm:string) => {
    set({ searchTerm});
  },
  setUserInput: (userInput:string) => {
    set({ userInput});
  }
}));

export default usePokemonStore;
