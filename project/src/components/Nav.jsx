import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoSettingsOutline, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CacLogo from "../assets/CacLogo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <header className="bg-white w-full px-4 py-3 shadow-md flex items-center justify-between relative z-20">
      {/* Logo - Always Visible */}
      <a href="https://cac.gov.ng" className="flex items-center cursor-pointer">
        <img src={CacLogo} alt="Logo" className="w-56 h-12 pl-16" />
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8 font-medium text-black">
        <a href="#" className="hover:text-gray-700" onClick={() => navigate("/ticketlist")}>Tickets</a>
        <a href="#" className="hover:text-gray-700" onClick={() => navigate("/unit-queue")}>Unit</a>
        <a href="#" className="hover:text-gray-700" onClick={() => navigate("/ticketsection")}>Agents</a>
      </nav>

      {/* Search Bar - Hidden on small screens */}
      <div className="relative hidden md:flex items-center w-72">
        <input
          type="text"
          placeholder="Search by users, priority..."
          className="w-full py-2 pl-4 pr-10 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <CiSearch className="absolute right-3 text-black" />
      </div>

      {/* Icons and Profile */}
      <div className="flex items-center space-x-4">
        <IoSettingsOutline
          className="text-xl text-black cursor-pointer hover:text-gray-700"
          onClick={() => navigate("/agent-management/")} // Navigate to Agent Management page
        />
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-black font-semibold">
            DA
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
        </div>
        {/* Toggle Menu Icon for Mobile */}
        <IoMenu
          className="text-2xl text-black cursor-pointer lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md lg:hidden z-10">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <a href="#" className="text-black hover:text-gray-700" onClick={() => navigate("/ticketlist")}>
              Tickets
            </a>
            <a href="#" className="text-black hover:text-gray-700" onClick={() => navigate("/unit-queue")}>
              Unit
            </a>
            <a href="#" className="text-black hover:text-gray-700" onClick={() => navigate("/ticketsection")}>
              Agents
            </a>
            <div className="flex items-center w-full px-4">
              <input
                type="text"
                placeholder="Search by users, priority..."
                className="w-full py-2 pl-4 pr-10 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <CiSearch className="absolute right-7 text-black" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
