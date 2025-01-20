import React from "react";
import { useNavigate } from "react-router-dom";

const UnitQueue = () => {
  const navigate = useNavigate();

  // Sample data for agents and ticket statuses
  const agents = [
    {
      name: "David Akindahunsi",
      tickets: {
        Open: 20,
        "In Progress": 15,
        "Waiting on Customer": 5,
        Escalated: 5,
        Closed: 5,
      },
    },
    {
      name: "Umaru Tijani",
      tickets: {
        Open: 10,
        "In Progress": 8,
        "Waiting on Customer": 3,
        Escalated: 2,
        Closed: 1,
      },
    },
    {
      name: "Tariq Ihenacho",
      tickets: {
        Open: 18,
        "In Progress": 10,
        "Waiting on Customer": 3,
        Escalated: 2,
        Closed: 1,
      },
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 sticky top-0 z-10 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">
          Unit Queue
        </h1>
      </header>

      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 bg-green-50 p-6 flex flex-col">
          {/* Table */}
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-green-800">
                <tr>
                  <th className="text-left text-white font-semibold p-2">
                    Agents
                  </th>
                  <th className="text-left text-white font-semibold p-2">
                    Tickets Assigned
                  </th>
                  <th className="text-left text-white font-semibold p-2">
                    Ticket Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, index) => (
                  <React.Fragment key={index}>
                    {/* Table Row */}
                    <tr
                      className="bg-white cursor-pointer hover:bg-green-100 transition"
                      onClick={() => navigate(`/TicketSection/`)}
                    >
                      <td className="p-2 text-green-800 font-medium">
                        {agent.name}
                      </td>
                      <td className="p-2 text-gray-700 font-medium">
                        {Object.values(agent.tickets).reduce(
                          (total, count) => total + count,
                          0
                        )}
                      </td>
                      <td className="p-2">
                        <div className="text-sm space-y-1">
                          {Object.entries(agent.tickets).map(
                            ([status, count]) => (
                              <p
                                key={status}
                                className="flex justify-between items-center text-gray-700"
                              >
                                <span>{status}:</span>
                                <span className="font-semibold text-green-600">
                                  {count}
                                </span>
                              </p>
                            )
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Black Horizontal Line */}
                    {index < agents.length - 1 && (
                      <tr>
                        <td colSpan="3">
                          <hr className="border-black my-2" />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UnitQueue;
