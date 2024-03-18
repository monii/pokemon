import { useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import PokemonList from "../pokemonList/PokemonList";
import PokemonCard from "../pokemonList/components/PokemonCard";
import Search from "./components/Search";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import Header from "../../components/common/Header";
import usePokemonStore from "../../store/pokemon";
import pokemonAPI from "../../api/pokemon";
import { GetPokemonDTO, GetPokemonListDTO } from "../../types/pokemon";
import { convertToNumber } from "../../util/util";
import { LIST_LIMIT } from "../../constant/const";

const MainContainer = styled.main`
  display: flex;
  max-width: 1200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ListContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

function Main() {
  const { ref, inView } = useInView();
  const { searchTerm } = usePokemonStore();
  const [searchParams, setSearchParams] = useSearchParams();
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
    // 스크롤이 화면에 보일 때 추가 데이터를 로드합니다.
    if (inView && getPokemonListStatus === "success") {
      setSearchParams(
        `?limit=${LIST_LIMIT}&offset=${convertToNumber(offset) + LIST_LIMIT}`
      );
      fetchNextPage();
    }
  }, [inView, getPokemonListStatus]);

  return (
    <MainContainer>
      <Header />
      <Search />
      {getPokemonListStatus === "loading" && <Loading />}
      {getPokemonListStatus === "error" && <Error />}
      {getPokemonListStatus === "success" && (
        <ListContainer>
          {searchTerm === "" ? (
            // 기본 PokemonList 컴포넌트를 표시합니다.
            <>
              {pokemonList?.pages.map(
                (page, index) =>
                  "results" in page && (
                    <PokemonList key={index} pokemons={page.results} />
                  )
              )}
              <div ref={ref} />
            </>
          ) : (
            // 검색어가 있는 경우 PokemonCard 컴포넌트를 표시합니다.
            <>
              {pokemonList?.pages.map(
                (page, index) =>
                  "name" in page && (
                    <PokemonCard key={index} pokemonName={page.name} />
                  )
              )}
            </>
          )}
        </ListContainer>
      )}
    </MainContainer>
  );
}

export default Main;
