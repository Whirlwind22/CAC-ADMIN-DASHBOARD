import React, { useState } from "react";
import { PiGridFour } from "react-icons/pi";
import {
  IoTicket,
  IoPeople,
  IoPersonCircleOutline,
  IoMenu,
  IoClose,
  IoPersonAddOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-auto bg-green-800 px-4 py-2 text-white w-64 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } xl:static xl:translate-x-0`}
      >
        <ul className="mt-8 font-bold space-y-2">
          <li className="rounded hover:shadow hover:bg-green-500 py-2">
            <Link to="Overview" className="flex items-center px-3">
              <PiGridFour className="w-6 h-6 mr-2" />
              Overview
            </Link>
          </li>
          <li className="rounded hover:shadow hover:bg-green-500 py-2">
            <Link to="ticket-list" className="flex items-center px-3">
              <IoTicket className="w-6 h-6 mr-2" />
              All Tickets
            </Link>
          </li>
          <li className="rounded hover:shadow hover:bg-green-500 py-2">
            <Link to="/unit-queue" className="flex items-center px-3">
              <IoPeople className="w-6 h-6 mr-2" />
              Unit Queue
            </Link>
          </li>
          <li className="rounded hover:shadow hover:bg-green-500 py-2">
            <Link to="/ticket-section" className="flex items-center px-3">
              <IoPersonCircleOutline className="w-6 h-6 mr-2" />
              Agent Queue
            </Link>
          </li>
          <li className="rounded hover:shadow hover:bg-green-500 py-2">
            <Link to="/agent-management" className="flex items-center px-3">
              <IoPersonAddOutline className="w-6 h-6 mr-2" />
              Agent Management
            </Link>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Menu Button */}
        <button
          className="absolute top-4 left-4 text-3xl text-green-800 xl:hidden z-50"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <IoClose /> : <IoMenu />}
        </button>

        {/* Background overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 xl:hidden z-40"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
