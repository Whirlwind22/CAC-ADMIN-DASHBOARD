import React, { useState } from "react";
import { FaSearch, FaPlus, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const agentsData = [
  { id: 1, name: "David Akindahunsi", email: "david@example.com", role: "Support Agent", status: "Online" },
  { id: 2, name: "John Doe", email: "john@example.com", role: "Support Agent", status: "Not Approved" },
  { id: 3, name: "Jane Smith", email: "jane@example.com", role: "Support Agent", status: "Approved" },
  { id: 4, name: "Mark Taylor", email: "mark@example.com", role: "Support Agent", status: "Deleted" },
];

export default function AgentManagement() {
  const [selectedTab, setSelectedTab] = useState("Active Agents");
  const [agents, setAgents] = useState(agentsData);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Filter agents based on the selected tab
  const filterAgents = () => {
    switch (selectedTab) {
      case "Active Agents":
        return agents.filter((agent) => agent.status === "Online");
      case "Created Agents":
        return agents.filter((agent) => agent.status === "Not Approved");
      case "All Agents":
        return agents; // Show all agents
      case "Deleted Agents":
        return agents.filter((agent) => agent.status === "Deleted");
      case "Approved Agents":
        return agents.filter((agent) => agent.status === "Approved");
      default:
        return [];
    }
  };

  // Handle status update
  const updateStatus = (id, newStatus) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) =>
        agent.id === id ? { ...agent, status: newStatus } : agent
      )
    );
  };

  const handleAddAgentClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAgentClick = (agent) => {
    navigate(`/agent/${agent.id}/tickets`, { state: { agentName: agent.name } });
  };

  const filteredAgents = filterAgents();

  return (
    <div className="min-h-screen bg-green-100 flex flex-col">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 sticky top-0 z-10 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">Agent Management</h1>
      </header>

      {/* Tabs and Content */}
      <div className="flex-grow flex flex-col">
        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-between border-b border-gray-300 p-4">
          <div className="flex space-x-4">
            {["Active Agents", "Created Agents", "Approved Agents", "All Agents", "Deleted Agents"].map((tab) => (
              <button
                key={tab}
                className={`${
                  selectedTab === tab
                    ? "text-green-800 font-semibold border-b-2 border-green-800 pb-1"
                    : "text-gray-600 hover:text-green-800"
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddAgentClick}
            className="bg-green-800 text-white px-4 py-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" />
            New Agent
          </button>
        </div>

        {/* Agents Grid */}
        <main className="flex-grow p-6">
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/ticketsection/`)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 text-white flex items-center justify-center rounded-full">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{agent.name}</h3>
                      <p className="text-sm text-gray-500">{agent.email}</p>
                      <p className="text-sm text-gray-600">{agent.role}</p>
                      <p className={`text-xs font-semibold mt-1 ${getStatusClass(agent.status)}`}>
                        {agent.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No agents available for this category.</p>
          )}
        </main>
      </div>

      {/* Popup for Add Agent */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Search Agent by Staff ID</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter Staff ID"
                className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500"
              />
              <button className="bg-green-800 text-white px-4 py-2 rounded">Search</button>
            </div>
            <button
              onClick={handleClosePopup}
              className="mt-4 text-gray-500 hover:text-green-800 underline text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get status classes
function getStatusClass(status) {
  switch (status) {
    case "Online":
      return "text-green-600";
    case "Not Approved":
      return "text-yellow-500";
    case "Approved":
      return "text-blue-500";
    case "Deleted":
      return "text-red-500";
    default:
      return "text-gray-600";
  }
}
