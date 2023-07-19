import { useState, useRef } from "react";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import { SearchAPI } from "../api/search";
import { SearchSuggestions } from "../types";

function Search() {
  const [isInputValue, setIsInputValue] = useState<boolean>(false);
  const [dropdownData, setDropdownData] = useState<SearchSuggestions>([]);
  const [liIndex, setLiIndex] = useState<number>(-1);
  const autoRef = useRef<HTMLUListElement>(null);
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

  const updateLiIndex = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (!isInputValue) {
      setLiIndex(-1);
    }

    switch (e.key) {
      case "ArrowUp":
        if (liIndex < 0) return;
        setLiIndex(prev => prev - 1);
        if (liIndex <= 0) setLiIndex(-1);
        break;
      case "ArrowDown":
        setLiIndex(prev => prev + 1);
        if (autoRef.current?.childElementCount === liIndex + 1) setLiIndex(0);
        break;
    }
  };

  return (
    <>
      <SearchBar
        inputRef={inputRef}
        isInputValue={isInputValue}
        changeIsInputValue={changeIsInputValue}
        searchRequest={searchRequest}
        updateLiIndex={updateLiIndex}
      />
      {isInputValue && (
        <Dropdown
          dropdownData={dropdownData}
          inputRef={inputRef}
          autoRef={autoRef}
          liIndex={liIndex}
        />
      )}
    </>
  );
}

export default Search;
