import { create } from "zustand";
import { splitString, convertToNumber } from "../util/utile";


interface PokemonStore {
  evolutionId: number;
  setEvolutionId: (evolutuinUrl: string) => void;
}
const usePokemonStore = create<PokemonStore>((set) => ({
  evolutionId: 1,
  setEvolutionId: (url: string) => {
      const id = splitString(url, "/").at(-2);
      console.log("in store", id)
    set({ evolutionId: convertToNumber(id) });
  },
}));

export default usePokemonStore;
