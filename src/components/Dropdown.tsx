import { SearchSuggestions } from "../types";

interface DropdownProps {
  isInputValue: boolean;
  dropdownData: SearchSuggestions;
  inputRef: React.RefObject<HTMLInputElement>;
}

function Dropdown({ isInputValue, dropdownData, inputRef }: DropdownProps) {
  const updateInputValue = (e: React.MouseEvent<HTMLLIElement>) => {
    if (inputRef.current === null) return;
    inputRef.current.value = e.currentTarget.innerText;
  };

  return (
    <>
      {dropdownData.length === 0 && isInputValue ? (
        <div>검색어 없음</div>
      ) : (
        <ul className={`${isInputValue ? "" : "hidden"} `}>
          {dropdownData.map(item => (
            <li
              key={item.sickCd}
              className="cursor-pointer"
              onClick={updateInputValue}
            >
              {item.sickNm}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Dropdown;
