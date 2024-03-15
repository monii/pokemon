import { useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

import pokemonAPI from "../../api/pokemon";
import PokemonList from "../pokemonList/PokemonList";
import { GetPokemonListDTO } from "../../types/pokemon";

const MainContainer = styled.div`
  padding: 0px 20px;
`;

function Main() {
  const { ref, inView } = useInView();
  const {
    data: pokemonList,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery<GetPokemonListDTO>(
    ["getPokemonList"],
    ({ pageParam = 0 }) => pokemonAPI.getPokemonList(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const { next }: any = lastPage;
        if (!next) return undefined;
        return allPages.length + 1;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <MainContainer>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <>
          {pokemonList?.pages.map((page) => (
            <PokemonList pokemons={page.results} />
          ))}
          <div ref={ref} />
        </>
      )}
    </MainContainer>
  );
}

export default Main;
