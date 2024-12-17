import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchProps> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>('');

  // Update search value while typing
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Remove spaces from input value
  const handleSearch = () => {
    onSearch(search.trim());
  };

  // Handle ENTER key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="กรุณากรอกชื่อสินค้า.."
        className="w-full sm:w-3/4 p-2 border rounded mb-2 sm:mb-0 sm:mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-black text-white hover:bg-[#667C26] transition-colors duration-500 px-4 py-2 rounded-lg sm:block hidden"
      >
        ค้นหา
      </button>
    </div>
  );
};

export default SearchBox;
