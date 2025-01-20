import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ ticketsData, agentsData, activityReportData }) => {
  const [showAllAgents, setShowAllAgents] = useState(false);
  const [showAgents, setShowAgents] = useState(false);
  const [showOfflineAgents, setShowOfflineAgents] = useState(false);
  const navigate = useNavigate();

  // Separate online and offline agents
  const onlineAgents = agentsData.filter((agent) => agent.status === "online");
  const offlineAgents = agentsData.filter((agent) => agent.status === "offline");

  return (
    <div className="flex flex-col bg-green-50 min-h-screen overflow-y-auto">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold">Overview</h1>
          <div className="relative">
            <button
              onClick={() => setShowAllAgents(!showAllAgents)}
              className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-md text-sm sm:text-base focus:outline-none"
            >
              <span>All Agents</span>
              <span className="text-lg">▼</span>
            </button>
            {showAllAgents && (
              <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg w-72 max-h-64 overflow-y-auto z-50">
                <div className="px-4 py-2 text-gray-700 font-semibold border-b">All Agents</div>
                <div className="p-4 space-y-3">
                  {agentsData.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between text-sm text-gray-800"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                            agent.status === "online" ? "bg-green-500" : "bg-gray-500"
                          }`}
                        >
                          {agent.initials}
                        </div>
                        <span>{agent.name}</span>
                      </div>
                      <span className="text-xs text-gray-600">{agent.department}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="p-4 md:p-5 space-y-6">
        {/* Unassigned Tickets Section */}
        <div
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => navigate("/ticketlist")}
        >
          <h3 className="text-lg font-bold text-gray-800">Unassigned Tickets</h3>
          <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
            {ticketsData.map((item, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className={`text-xl ${item.color}`}>{item.count}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ICT Unit Section */}
        <div
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => navigate("/unit-queue")}
        >
          <h3 className="text-lg font-bold text-gray-800">ICT Unit 1</h3>
          <div className="mt-4">
            <div className="flex justify-between text-gray-600">
              <span>Agents</span>
              <span>Tickets Assigned</span>
            </div>
            {agentsData.map((agent) => (
              <div
                key={agent.id}
                className="flex justify-between items-center mt-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      agent.status === "online" ? "bg-green-500" : "bg-gray-500"
                    } text-white flex items-center justify-center`}
                  >
                    {agent.initials}
                  </div>
                  <span>{agent.name}</span>
                </div>
                <span className="font-semibold">{agent.ticketsAssigned}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Report Section */}
        <div
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => navigate("/ticketsection")}
        >
          <h3 className="text-lg font-bold text-gray-800">Agent Activity Report</h3>
          <div className="mt-4">
            <div className="flex justify-between text-gray-600 font-semibold">
              <span>Agents</span>
              <span>Resolved</span>
              <span>Pending</span>
              <span>Escalated</span>
            </div>
            {activityReportData.map((agent) => (
              <div key={agent.id} className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                    {agent.initials}
                  </div>
                  <span>{agent.name}</span>
                </div>
                <span>{agent.resolved}</span>
                <span>{agent.pending}</span>
                <span>{agent.escalated}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Online Agents Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">
              Online Agents ({onlineAgents.length})
            </h3>
            <button
              onClick={() => setShowAgents(!showAgents)}
              className="text-gray-500 focus:outline-none"
            >
              ▼
            </button>
          </div>
          {showAgents && (
            <div className="mt-4">
              {onlineAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex justify-between items-center mt-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => navigate("/ticketsection")}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                      {agent.initials}
                    </div>
                    <span>{agent.name}</span>
                  </div>
                  <span>{agent.department}</span>
                  <span>{agent.ticketsAssigned}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Offline Agents Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">
              Offline Agents ({offlineAgents.length})
            </h3>
            <button
              onClick={() => setShowOfflineAgents(!showOfflineAgents)}
              className="text-gray-500 focus:outline-none"
            >
              ▼
            </button>
          </div>
          {showOfflineAgents && (
            <div className="mt-4">
              {offlineAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex justify-between items-center mt-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => navigate("/ticketsection")}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center">
                      {agent.initials}
                    </div>
                    <span>{agent.name}</span>
                  </div>
                  <span>{agent.department}</span>
                  <span>{agent.ticketsAssigned}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
