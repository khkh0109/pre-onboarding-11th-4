import { SearchSuggestions } from "../types";

interface DropdownProps {
  isInputValue: boolean;
  dropdownData: SearchSuggestions;
}

function Dropdown({ isInputValue, dropdownData }: DropdownProps) {
  return (
    <>
      {dropdownData.length === 0 && isInputValue ? (
        <div>검색어 없음</div>
      ) : (
        <ul className={isInputValue ? "" : "hidden"}>
          {dropdownData.map(item => (
            <li key={item.sickCd}>{item.sickNm}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Dropdown;
