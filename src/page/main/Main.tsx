import { useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import PokemonList from "../pokemonList/PokemonList";
import PokemonCard from "../pokemonList/components/PokemonCard";
import Search from "./components/Search";
import Loading from "../../components/common/Loading";
import usePokemonStore from "../../store/pokemon";
import pokemonAPI from "../../api/pokemon";
import { GetPokemonDTO, GetPokemonListDTO } from "../../types/pokemon";
import { convertToNumber } from "../../util/utile";
import { LIST_LIMIT } from "../../constant/const";

const MainContainer = styled.main`
  padding: 0px 20px;
`;

function Main() {
  const { ref, inView } = useInView();
  const { searchTerm } = usePokemonStore();
  let [searchParams, setSearchParams] = useSearchParams();
  const offset = searchParams.get("offset");

  const {
    data: pokemonList,
    fetchNextPage,
    status: getPokemonListStatus,
  } = useInfiniteQuery<GetPokemonListDTO | GetPokemonDTO>(
    ["getPokemonList", searchTerm],
    ({ pageParam: page = 0 }) =>
      pokemonAPI.getPokemonList({ page, searchTerm }),
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
      setSearchParams(
        `?limit=${LIST_LIMIT}&offset=${convertToNumber(offset) + LIST_LIMIT}`
      );
      fetchNextPage();
    }
  }, [inView]);

  return (
    <MainContainer>
      <Search />
      {getPokemonListStatus === "loading" && <Loading />}
      {getPokemonListStatus === "success" && (
        <>
          {searchTerm === "" ? (
            <>
              {pokemonList?.pages.map((page, index) => {
                if ("results" in page) {
                  return <PokemonList key={index} pokemons={page.results} />;
                } else {
                  return null;
                }
              })}
              <div ref={ref} />
            </>
          ) : (
            <>
              {pokemonList?.pages.map((page, index) => {
                if ("name" in page) {
                  return <PokemonCard key={index} pokemonName={page.name} />;
                } else {
                  return null;
                }
              })}
            </>
          )}
        </>
      )}
    </MainContainer>
  );
}

export default Main;
