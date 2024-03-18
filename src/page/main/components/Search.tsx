import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Input from "../../../components/common/Input";
import useDebounce from "../../../hook/useDebounce";
import usePokemonStore from "../../../store/pokemon";
import { LIST_LIMIT } from "../../../constant/const";

const SearchContainer = styled.section`
  padding: 20px;
  width: 80%
`;
const SearchWrapper = styled.div``;

function Search() {
  const { userInput, setSearchTerm, setUserInput } = usePokemonStore();
  const debouncedSearchTerm = useDebounce(userInput, 800);

  const filterByKeyword = (searchId: string) => {
    if (!!userInput) {
      setSearchTerm(searchId);
    }
  };

  const changeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchId = e.target.value;
    setUserInput(searchId);
  };

  useEffect(() => {
    filterByKeyword(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <SearchContainer>
      <SearchWrapper>
        <Input
          placeholder="포켓몬 아이디를 입력해주세요!"
          value={userInput}
          onChange={changeSearchTerm}
        />
      </SearchWrapper>
    </SearchContainer>
  );
}

export default Search;
