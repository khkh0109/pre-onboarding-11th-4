import { SearchSuggestions } from "../types";

interface DropdownProps {
  dropdownData: SearchSuggestions;
  inputRef: React.RefObject<HTMLInputElement>;
  autoRef: React.RefObject<HTMLUListElement>;
  liIndex: number;
}

function Dropdown(props: DropdownProps) {
  const { dropdownData, inputRef, autoRef, liIndex } = props;

  const updateInputValue = (e: React.MouseEvent<HTMLLIElement>) => {
    if (inputRef.current === null) return;
    inputRef.current.value = e.currentTarget.innerText;
  };

  return (
    <>
      {dropdownData.length === 0 ? (
        <div className="mt-6">검색어 없음</div>
      ) : (
        <ul ref={autoRef} className="w-66 mt-6 rounded-2xl bg-white p-4">
          {dropdownData.map((item, idx) => (
            <li
              key={item.sickCd}
              className={`${
                liIndex === idx ? "bg-slate-100" : ""
              } cursor-pointer rounded-md p-2`}
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
