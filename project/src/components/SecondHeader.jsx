import React, { useState } from 'react';

const Header = () => {
  // State to control dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 text-white p-4 md:p-6 rounded-lg">
      {/* Left Section: Title */}
      <h1 className="text-lg md:text-xl font-semibold">Overview</h1>
      
      {/* Right Section: Dropdown Button */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {/* Agent Icon */}
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.5 8.5L12 13l6.5-4.5m-13 7l6.5 4.5 6.5-4.5"
            />
          </svg>
          <span>All Agents</span>
          {/* Dropdown Arrow Icon */}
          <svg
            className="w-4 h-4 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Agent 1</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Agent 2</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Agent 3</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
