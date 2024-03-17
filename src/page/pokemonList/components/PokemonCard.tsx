import styled from "styled-components";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import pokemonAPI from "../../../api/pokemon";
import { GetPokemonDTO } from "../../../types/pokemon";
import { GetPokemonSpeciesDTO } from "../../../types/pokemonSpecies";
import {
  convertId,
  convertNameToKoean,
  findColorByType,
} from "../../../util/utile";

interface PokemonCardProps {
  pokemonName: string;
}

const CardContainer = styled.div<{ bordercolor: string }>`
  padding: 1.4rem;
  max-width: 230px;
  border: 2px solid ${(props) => props.bordercolor};
  border-radius: 8px;
`;
const ImageWrapper = styled.section`
  box-shadow: 0 0 10px 10px rgba(202, 201, 201, 0.05);
  border-radius: 50%;
  width: 150px;
  height: 150px;
  text-align: center;
`;
const PokemonImage = styled.img`
  width: 85%;
  height: 85%;
`;
const DataWrapper = styled.section``;
const Text = styled.p`
  text-align: center;
`;

function PokemonCard({ pokemonName }: PokemonCardProps) {
  const { data: pokemonInfo } = useQuery<GetPokemonDTO>(
    ["getPokemon", pokemonName],
    () => pokemonAPI.getPokemonByName(pokemonName)
  );
  const { data: pokemonSpeciesInfo } = useQuery<GetPokemonSpeciesDTO>(
    ["getPokemonSpeciesByName", pokemonName],
    () => pokemonAPI.getPokemonSpeciesByName(pokemonName)
  );

  return (
    <Link to={`pokemon/${pokemonInfo?.id}`}>
      <CardContainer
        bordercolor={findColorByType(
          pokemonInfo?.types[0].type.name || "default"
        )}
      >
        <Text>{convertId(pokemonInfo?.id)}</Text>
        <ImageWrapper>
          <PokemonImage
            loading="lazy"
            alt={pokemonInfo?.name}
            src={pokemonInfo?.sprites.other.dream_world.front_default}
          />
        </ImageWrapper>
        <DataWrapper>
          <Text>{convertNameToKoean(pokemonSpeciesInfo?.names)}</Text>
        </DataWrapper>
      </CardContainer>
    </Link>
  );
}

export default PokemonCard;
