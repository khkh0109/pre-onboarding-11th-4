import { useState } from "react";

interface SearchBarProps {
  inputRef: React.RefObject<HTMLInputElement>;
  isInputValue: boolean;
  changeIsInputValue: (value: string | undefined) => void;
  searchRequest: (value: string) => void;
  updateLiIndex: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function SearchBar(props: SearchBarProps) {
  const {
    inputRef,
    isInputValue,
    changeIsInputValue,
    searchRequest,
    updateLiIndex,
  } = props;
  const [timerId, setTimerId] = useState<number | undefined>(undefined);

  const handleInputChange = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      const inputValue = inputRef.current?.value;
      changeIsInputValue(inputValue);
      if (inputValue !== undefined && inputValue !== "") {
        searchRequest(inputValue);
      }
    }, 500);
    setTimerId(newTimerId);
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="질환명을 입력해 주세요."
        onChange={handleInputChange}
        ref={inputRef}
        onKeyDown={updateLiIndex}
        className="h-16 w-56 rounded-l-full p-6 focus:outline-sky-500"
      />
      <button
        onClick={() => {
          if (!isInputValue) return;
          alert("해당 기능은 구현중입니다.");
        }}
        className="h-16 w-20 rounded-r-full bg-sky-500 p-4 font-bold"
      >
        검색
      </button>
    </div>
  );
}

export default SearchBar;
