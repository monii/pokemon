import styled from "styled-components";

import PokemonCard from "./components/PokemonCard";
import { GetPokemonWithNameDTO } from "../../types/pokemon";

interface PokemonListProps {
  pokemons: GetPokemonWithNameDTO[];
}

const ListContainer = styled.div`
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <ListContainer>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </ListContainer>
  );
}

export default PokemonList;
