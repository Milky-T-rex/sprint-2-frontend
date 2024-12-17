import React from 'react';
import teaCategories from '../database/teaCategories';
import SearchBox from './searchBox';

// Type declaration
interface SidebarProps {
  onCategoryChange: (category: string) => void;
  onSearch: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange, onSearch }) => {
  return (
    <aside className="w-full lg:w-1/4 p-4 bg-gray-200 rounded-xl flex flex-col items-center lg:items-start">
    {/* Search Box */}
    <div className="w-full mb-4 rounded-xl">
      <SearchBox onSearch={onSearch} />
    </div>

    {/* Categories */}
    <ul className="w-full flex flex-col">
      {teaCategories.map((category) => (
        <li key={category} className="w-full border-t">
          <button
            onClick={() => onCategoryChange(category)}
            className="w-full py-3 flex justify-center items-center text-black rounded hover:bg-[#667C26] hover:text-white transition-colors duration-500"
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  </aside>

  );
};

export default Sidebar;
