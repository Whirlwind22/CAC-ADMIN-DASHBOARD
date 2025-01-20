import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Overview from "./components/Overview";
import TicketList from "./components/TicketList";
import TicketSection from "./components/TicketSection";
import UnitQueue from "./components/UnitQueue";
import TicketDetails from "./components/TicketDetails";
import AgentManagement from "./components/AgentManagement";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Top Navigation */}
        <Nav toggleSidebar={toggleSidebar} />

        <div className="flex flex-grow">
          {/* Sidebar */}
          <div
            className={`bg-gray-800 text-white lg:w-64 w-16 transition-all duration-300 ${
              isSidebarOpen ? "block" : "hidden lg:block"
            }`}
          >
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-grow p-4 bg-gray-100">
            <Routes>
              <Route path="/Overview" element={<Overview />} />
              <Route path="/ticket-list" element={<TicketList />} />
              <Route path="/ticket-section" element={<TicketSection />} />
              <Route path="/unit-queue" element={<UnitQueue />} />
              <Route path="/agent-management" element={<AgentManagement />} />
              <Route path="/ticket-details" element={<TicketDetails />} />
            </Routes>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
