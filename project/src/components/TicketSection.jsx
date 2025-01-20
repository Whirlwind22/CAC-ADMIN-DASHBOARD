import React, { useState } from "react";
import {
  FaSpinner,
  FaCheck,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaChevronDown,
  FaRedo,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TicketSection = () => {
  const [currentAgent, setCurrentAgent] = useState("Kenny");
  const [tickets, setTickets] = useState({
    Open: [
      {
        id: 1,
        title: "Ticket 1: Open Status",
        number: "#101",
        user: "David Akindahunsi",
        department: "Support",
        time: "Today 02:00 PM",
        status: "Open",
      },
    ],
    "In Progress": [
      {
        id: 2,
        title: "Ticket 2: In Progress",
        number: "#102",
        user: "David Akindahunsi",
        department: "IT",
        time: "Tomorrow 03:30 PM",
        status: "In Progress",
      },
    ],
    "Waiting on Customer": [],
    Escalated: [],
    Closed: [],
  });

  const navigate = useNavigate();

  const statusColors = {
    Open: "border-blue-500 text-blue-700",
    "In Progress": "border-green-500 text-green-700",
    "Waiting on Customer": "border-yellow-500 text-yellow-700",
    Escalated: "border-red-500 text-red-700",
    Closed: "border-gray-500 text-gray-700",
  };

  const statusIcons = {
    Open: <FaQuestionCircle />,
    "In Progress": <FaSpinner className="animate-spin" />,
    "Waiting on Customer": <FaExclamationTriangle />,
    Escalated: <FaExclamationTriangle />,
    Closed: <FaCheck />,
  };

  const agents = ["Kenny", "Jane Doe", "John Smith"];

  const handleStatusChange = (ticket, newStatus) => {
    setTickets((prevTickets) => {
      const updatedTickets = { ...prevTickets };
      // Remove ticket from its current status
      updatedTickets[ticket.status] = updatedTickets[ticket.status].filter(
        (t) => t.id !== ticket.id
      );
      // Add ticket to the new status
      updatedTickets[newStatus].push({ ...ticket, status: newStatus });
      return updatedTickets;
    });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleTicketClick = (ticketId) => {
    navigate(`/ticketdetails/${ticketId}`); // Navigate to ticket details page with the ticket ID
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg sm:text-xl font-bold tracking-wide">{currentAgent}'s Queue</h1>
          <div className="relative group">
            <button className="text-white flex items-center">
              <FaChevronDown />
            </button>
            {/* Dropdown */}
            <div className="absolute left-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              {agents.map((agent) => (
                <button
                  key={agent}
                  className="block w-full text-left px-4 py-2 hover:bg-green-100"
                  onClick={() => setCurrentAgent(agent)}
                >
                  {agent}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button className="text-white" onClick={handleRefresh}>
          <FaRedo />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-green-50 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 h-full">
          {["Open", "In Progress", "Waiting on Customer", "Escalated", "Closed"].map((status) => (
            <div key={status} className="flex flex-col h-full">
              <div className="text-center bg-green-600 text-white py-2 font-semibold rounded-t-lg text-sm sm:text-base">
                {statusIcons[status]} {status}
              </div>
              <div className="flex-grow bg-green-50 p-4 rounded-b-lg overflow-y-auto border border-gray-300">
                {tickets[status].length > 0 ? (
                  tickets[status].map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`bg-white border ${statusColors[status]} rounded-lg p-4 mb-4 shadow-sm cursor-pointer`}
                      onClick={() => navigate(`/ticketdetails/`)}// Navigate to ticket details when clicked
                    >
                      <h3 className="font-medium text-sm sm:text-base">{ticket.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {ticket.number} • {ticket.user} • {ticket.department}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">{ticket.time}</p>
                      <div className="mt-2">
                        <select
                          className="block w-full p-1 text-sm sm:text-base border rounded-md bg-white text-black"
                          value={ticket.status}
                          onChange={(e) => handleStatusChange(ticket, e.target.value)}
                        >
                          {Object.keys(tickets).map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                              {statusOption}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No tickets in this queue.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TicketSection;
