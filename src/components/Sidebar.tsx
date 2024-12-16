// // src/components/Sidebar.tsx
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const teaCategories = [
//   { path: '/products', name: 'ทั้งหมด' },
//   { path: '/green-tea', name: 'ชาเขียว' },
//   { path: '/black-tea', name: 'ชาดำ' },
//   { path: '/white-tea', name: 'ชาขาว' },
//   { path: '/oolong-tea', name: 'ชาอู่หลง' }
// ];

// const Sidebar: React.FC = () => {
//   const location = useLocation();

//   return (
//     <aside className="w-1/4 p-4 bg-gray-100">
//       <h2 className="text-lg font-bold mb-4">ค้นหา</h2>
//       <ul>
//         {teaCategories.map((category) => (
//           <li key={category.path} className="mb-2">
//             <Link 
//               to={category.path} 
//               className={`
//                 text-blue-500 
//                 hover:underline 
//                 ${location.pathname === category.path ? 'font-bold text-blue-700' : ''}
//               `}
//             >
//               {category.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;

// src/components/Sidebar.tsx
import React from 'react';
import teaCategories from '../database/teaCategories';
import SearchBox from './searchBox';
// categories


// type declaration
interface SidebarProps  {
  onCategoryChange: (category: string) => void;
  onSearch: (query: string) => void;
};



const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange, onSearch }) => {
  return (
    <aside className="w-1/5 p-4 bg-white border-r-2 flex flex-col">

      <div>
        <SearchBox onSearch={onSearch} />
      </div>
      

      <ul className='w-full flex flex-col items-center'>
        {teaCategories.map((category) => (
          <li key={category} className="w-full border-t">
            <button
              onClick={() => onCategoryChange(category)}
              className="w-full py-3 flex items-center text-black rounded hover:bg-[#667C26] hover:text-white transition-color duration-500"
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

