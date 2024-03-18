import PokemonCard from "./components/PokemonCard";
import { GetPokemonWithNameDTO } from "../../types/pokemon";

interface PokemonListProps {
  pokemons: GetPokemonWithNameDTO[];
}


function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemonName={pokemon.name} />
      ))}
    </>
  );
}

export default PokemonList;
