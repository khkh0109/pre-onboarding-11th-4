import { useState, useRef } from "react";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import { SearchAPI } from "../api/search";
import { SearchSuggestions } from "../types";

function Search() {
  const [isInputValue, setIsInputValue] = useState<boolean>(false);
  const [dropdownData, setDropdownData] = useState<SearchSuggestions>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeIsInputValue = (value: string | undefined) => {
    if (value) {
      setIsInputValue(true);
    } else {
      setIsInputValue(false);
    }
  };

  const searchRequest = async (value: string) => {
    try {
      const data = await SearchAPI.get(value);
      setDropdownData(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <SearchBar
        inputRef={inputRef}
        isInputValue={isInputValue}
        changeIsInputValue={changeIsInputValue}
        searchRequest={searchRequest}
      />
      <Dropdown
        isInputValue={isInputValue}
        dropdownData={dropdownData}
        inputRef={inputRef}
      />
    </>
  );
}

export default Search;
