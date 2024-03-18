import { useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

import PokemonList from "../pokemonList/PokemonList";
import PokemonCard from "../pokemonList/components/PokemonCard";
import Search from "./components/Search";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import Header from "../../components/common/Header";
import usePokemonStore from "../../store/pokemon";
import pokemonAPI from "../../api/pokemon";
import { GetPokemonDTO, GetPokemonListDTO } from "../../types/pokemon";

const MainContainer = styled.main`
  margin: 0 auto;
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
const SearchContainer = styled.section`
  position: relative;
`;

const ResetButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  padding: 12px;
  width: 5rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px 4px rgb(0 0 0/30%);
`;

function Main() {
  const { ref, inView } = useInView();
  const { searchTerm, setSearchTerm, setUserInput } = usePokemonStore();

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

  const clickAllSearch = () => {
    setSearchTerm("");
    setUserInput("")
  };

  useEffect(() => {
    // 스크롤이 화면에 보일 때 추가 데이터를 로드합니다.
    if (inView && getPokemonListStatus === "success") {
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
            <SearchContainer>
              {pokemonList?.pages.map(
                (page, index) =>
                  "name" in page && (
                    <PokemonCard key={index} pokemonName={page.name} />
                  )
              )}
              <ResetButton onClick={clickAllSearch}>전체검색</ResetButton>
            </SearchContainer>
          )}
        </ListContainer>
      )}
    </MainContainer>
  );
}

export default Main;
