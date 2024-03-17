import { create } from "zustand";
import { splitString, convertToNumber } from "../util/utile";

interface PokemonStore {
  evolutionId: number;
  searchTerm: string;
  setEvolutionId: (evolutuinUrl: string) => void;
  setSearchTerm: (searchTerm:string) => void;
}
const usePokemonStore = create<PokemonStore>((set) => ({
  evolutionId: 1,
  searchTerm: "",
  setEvolutionId: (url: string) => {
    const id = splitString(url, "/").at(-2);
    set({ evolutionId: convertToNumber(id) });
  },
  setSearchTerm: (searchTerm) => {
    set({ searchTerm});
  },
}));

export default usePokemonStore;