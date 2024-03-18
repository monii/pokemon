import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { FaLongArrowAltRight } from "react-icons/fa";

import usePokemonStore from "../../../store/pokemon";
import pokemonAPI from "../../../api/pokemon";
import { GetEvolutionChainsDTO } from "../../../types/pokemonEvolution";
import { convertNameToKoean, getEvolutionChainWidthId } from "../../../util/util";

const EvolutionContainer = styled.article`
  display: flex;
  gap: 16px;

  @media (max-width: 390px) {
    flex-direction: column;
  }
`;
const EvolutionChainWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 16px;

  @media (max-width: 390px) {
    flex-direction: column;
  }
`;
const InfoWrapper = styled.div``;
const ImageWrapper = styled.div`
  display: flex;
  width: 113px;
  height: 113px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 5px 15px 4px rgb(0 0 0/30%);
`;
const PokemonImage = styled.img`
  width: 80px;
  height: 80px;
`;
const Text = styled.p`
  padding-top: 8px;
`;
const ArrowWrapper = styled.div<{ isDisplay: boolean }>`
  display: ${(props) => (props.isDisplay ? "block" : "none")};

  @media (max-width: 390px) {
    transform: rotate(90deg);
  }
`;

function Evolution() {
  const { evolutionId , setEvolutionId} = usePokemonStore();
  const [evolutionIds, setEvolutionIds] = useState<number[]>([]);

  const { data: evolutionInfo } = useQuery<GetEvolutionChainsDTO>(
    ["getEvolutionChains", evolutionId],
    () => pokemonAPI.getEvolutionChains(evolutionId),
    {
      enabled: !!evolutionId,
      onSuccess: (evolutionInfo) =>
      setEvolutionIds(getEvolutionChainWidthId(evolutionInfo.chain)),
    }
  );

  const evolutionQueries = useQueries(
    evolutionIds.map((id) => ({
      queryKey: ["getPokemonById", id],
      queryFn: async () => {
        const pokemonData = await pokemonAPI.getPokemonById(id);
        return pokemonData;
      },
      enabled: evolutionIds.length > 0,
    }))
  );

  const speciesQueries = useQueries(
    evolutionIds.map((id) => ({
      queryKey: ["getPokemonSpeciesById", id],
      queryFn: async () => {
        const pokemonSpeciesData = await pokemonAPI.getPokemonSpeciesById(id);
        return pokemonSpeciesData;
      },
      enabled: evolutionIds.length > 0,
    }))
  );

  useEffect(()=>{
    return()=>{
      setEvolutionId("0"); // unmount시에 전역스토어의 값을 초기화 합니다.
    }
  },[])


  // 로딩 중인 경우 null을 반환하여 컴포넌트를 숨깁니다.
  if (evolutionQueries.some((query) => query.isLoading)) {
    return null;
  }

  return (
    <EvolutionContainer>
      {evolutionQueries.map(({ data: pokemon, ...rest }, index) => (
        <EvolutionChainWrapper key={pokemon?.id}>
          <InfoWrapper>
            <ImageWrapper>
              <PokemonImage
                alt={pokemon?.name}
                src={pokemon?.sprites?.other.dream_world.front_default}
              />
            </ImageWrapper>
            <Text>{convertNameToKoean(speciesQueries[index].data?.names)}</Text>
          </InfoWrapper>
          <ArrowWrapper isDisplay={index !== evolutionQueries.length - 1}>
            <FaLongArrowAltRight />
          </ArrowWrapper>
        </EvolutionChainWrapper>
      ))}
    </EvolutionContainer>
  );
}

export default Evolution;
