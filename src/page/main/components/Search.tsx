import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Input from "../../../components/common/Input";
import usePokemonStore from "../../../store/pokemon";
import { LIST_LIMIT } from "../../../constant/const";
import useDebounce from "../../../hook/useDebounce";

const SearchContainer = styled.section`
  padding: 20px 0px;
`;
const SearchWrapper = styled.div``;

function Search() {
  const {  setSearchTerm } = usePokemonStore();
  let [searchParams, setSearchParams] = useSearchParams();
  // 실시간으로 유저가 입력한 input 값
  const [userInput, setUserInput] = useState("");
  const debouncedSearchTerm = useDebounce(userInput, 800); 

  const filterByKeyword = (searchId: string) => {
    if (!!userInput) {
      setSearchParams(`?searchTerm=${searchId}&limit=${LIST_LIMIT}&offset=0`);
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
        <Input value={userInput} onChange={changeSearchTerm} />
      </SearchWrapper>
    </SearchContainer>
  );
}

export default Search;
