interface SearchBarProps {
  inputRef: React.RefObject<HTMLInputElement>;
  isInputValue: boolean;
  changeIsInputValue: (value: string | undefined) => void;
  searchRequest: (value: string) => void;
}

function SearchBar(props: SearchBarProps) {
  const { inputRef, isInputValue, changeIsInputValue, searchRequest } = props;

  const handleInputChange = () => {
    const inputValue = inputRef.current?.value;
    changeIsInputValue(inputValue);
    if (inputValue !== undefined && inputValue !== "") {
      searchRequest(inputValue);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="질환명을 입력해 주세요."
        onChange={handleInputChange}
        ref={inputRef}
      />
      <button
        onClick={() => {
          if (!isInputValue) return;
          alert("해당 기능은 구현중입니다.");
        }}
      >
        검색
      </button>
    </>
  );
}

export default SearchBar;
