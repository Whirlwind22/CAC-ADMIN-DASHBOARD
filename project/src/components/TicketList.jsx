import React, { useState, useCallback } from "react";
import {
  FaStar,
  FaChevronDown,
  FaSync,
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaTicketAlt,
} from "react-icons/fa";

export default function TicketList() {
  const initialTickets = [
    {
      id: 1,
      title: "Here's your first ticket.",
      status: "Open",
      user: "D",
      time: "Tomorrow 04:05 PM",
    },
    {
      id: 2,
      title: "Here's your second ticket.",
      status: "In Progress",
      user: "J",
      time: "Tomorrow 04:05 PM",
    },
  ];

  const agents = [
    { id: 1, name: "David Akindahunsi", initials: "D" },
    { id: 2, name: "Tijani Umaru", initials: "T" },
  ];

  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [showAssignPopup, setShowAssignPopup] = useState(false);

  const handleTicketClick = useCallback(
    (ticket) => {
      setSelectedTickets((prevSelected) =>
        prevSelected.some((selected) => selected.id === ticket.id)
          ? prevSelected.filter((selected) => selected.id !== ticket.id)
          : [...prevSelected, ticket]
      );
    },
    [setSelectedTickets]
  );

  const assignTicket = (agent) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        selectedTickets.some((selected) => selected.id === ticket.id)
          ? { ...ticket, user: agent.initials }
          : ticket
      )
    );
    setShowAssignPopup(false);
    setSelectedTickets([]);
  };

  const closeTickets = () => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        selectedTickets.some((selected) => selected.id === ticket.id)
          ? { ...ticket, status: "Closed" }
          : ticket
      )
    );
    setSelectedTickets([]);
  };

  const deleteTickets = () => {
    setTickets((prevTickets) =>
      prevTickets.filter(
        (ticket) => !selectedTickets.some((selected) => selected.id === ticket.id)
      )
    );
    setSelectedTickets([]);
  };

  const updateTicketStatus = (id, status) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-200 text-green-800";
      case "In Progress":
        return "bg-yellow-200 text-yellow-800";
      case "Closed":
        return "bg-gray-200 text-gray-800";
      case "Waiting on Customer":
        return "bg-blue-200 text-blue-800";
      case "Escalated":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-green-100 min-h-screen">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 sticky top-0 z-10">
        {selectedTickets.length > 0 ? (
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <FaTicketAlt className="text-green-700 text-xl" />
              <h1 className="text-xl font-semibold">{selectedTickets.length}</h1>
            </div>
            <button
              onClick={() => setShowAssignPopup(true)}
              className="flex items-center px-3 py-2 rounded text-sm text-green-700 hover:bg-green-100"
            >
              <FaUserPlus className="mr-2" />
              Assign To
            </button>
            <button
              onClick={closeTickets}
              className="flex items-center px-3 py-2 rounded text-sm text-green-700 hover:bg-green-100"
            >
              <FaTimes className="mr-2" />
              Close
            </button>
            <button
              onClick={deleteTickets}
              className="flex items-center px-3 py-2 rounded text-sm text-green-700 hover:bg-green-100"
            >
              <FaTrash className="mr-2" />
              Delete
            </button>
            <button
              onClick={() => setSelectedTickets([])}
              className="flex items-center px-3 py-2 rounded text-sm text-green-700 hover:bg-green-100"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaStar className="text-yellow-400 text-xl" />
              <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">
                All Tickets ({tickets.length})
              </h1>
            </div>
          </div>
        )}
      </header>

      {/* Ticket List */}
      <div className="mt-4 space-y-4 max-w-5xl mx-auto px-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => handleTicketClick(ticket)}
            className={`bg-white p-4 rounded-lg shadow flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer ${
              selectedTickets.some((selected) => selected.id === ticket.id)
                ? "ring-2 ring-green-500"
                : ""
            }`}
          >
            {/* Ticket Details */}
            <div className="flex-grow">
              <h3 className="font-medium text-gray-800">{ticket.title}</h3>
              <p className="text-sm text-gray-500">{ticket.time}</p>
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <select
                value={ticket.status}
                onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                className={`px-2 py-1 text-xs font-semibold rounded focus:outline-none ${getStatusClass(
                  ticket.status
                )}`}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
                <option value="Waiting on Customer">Waiting on Customer</option>
                <option value="Escalated">Escalated</option>
              </select>
              <div className="rounded-full bg-green-500 w-8 h-8 flex items-center justify-center text-white">
                {ticket.user}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assign To Popup */}
      {showAssignPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Assign Tickets To:</h2>
            <div className="space-y-3">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => assignTicket(agent)}
                  className="flex items-center space-x-3 w-full bg-gray-100 px-4 py-2 rounded-md text-left hover:bg-gray-200"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                    {agent.initials}
                  </div>
                  <span>{agent.name}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAssignPopup(false)}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
