import React, { useState } from "react";
import { FaChevronDown, FaReplyAll } from "react-icons/fa";
import { BiConversation } from "react-icons/bi";

const TicketDetails = () => {
  const [status, setStatus] = useState("Open"); // Current ticket status
  const [statusDropdownVisible, setStatusDropdownVisible] = useState(false); // Dropdown visibility
  const [activeTab, setActiveTab] = useState("Conversation"); // Active tab
  const [attachments, setAttachments] = useState([]); // List of attachments

  const statusOptions = [
    "Open",
    "Closed",
    "Escalated",
    "Waiting on Customer",
    "In Progress",
  ];

  // Handles status change
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setStatusDropdownVisible(false); // Close dropdown
  };

  // Close ticket action
  const handleCloseTicket = () => {
    setStatus("Closed");
  };

  // Placeholder for conversations and activity data
  const conversations = [
    {
      id: 1,
      user: "David",
      time: "02 Sep 04:05 PM",
      content: "Hello, this is the first message.",
    },
    {
      id: 2,
      user: "Support Agent",
      time: "02 Sep 04:30 PM",
      content: "Thank you for reaching out. Let me check.",
    },
  ];

  const activities = [
    { id: 1, date: "02 Sep 04:05 PM", status: "Open" },
    { id: 2, date: "02 Sep 04:30 PM", status: "Waiting on Customer" },
  ];

  // Handles file upload for attachments
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setAttachments((prev) => [...prev, ...uploadedFiles]);
  };

  return (
    <div className="flex h-screen bg-green-50">
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* Ticket List */}
          <section className="w-1/4 bg-green-50 border-r p-4 overflow-y-auto">
            <div className="flex flex-col bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="text-green-900 font-semibold">Here's your first ticket.</h3>
              <p className="text-sm text-gray-500">
                #100 • Kenny • CAC • Tomorrow 04:05 PM
              </p>
              <div className="flex items-center justify-between mt-2">
                <button className="bg-green-100 text-green-600 font-semibold px-3 py-1 rounded-full text-sm">
                  {status}
                </button>
                <BiConversation className="text-gray-600 text-lg cursor-pointer hover:text-gray-400" />
              </div>
            </div>
          </section>

          {/* Ticket Properties */}
          <section className="w-1/4 bg-green-50 border-r p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-bold text-lg text-green-900 border-b pb-2">
                Ticket Properties
              </h4>
              <div className="mt-4">
                <h5 className="text-green-700 font-bold">Key Information</h5>
                <div className="flex items-center">
                  <p className="text-gray-700 text-sm mt-1 font-semibold mr-2">
                    Status:
                  </p>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setStatusDropdownVisible(!statusDropdownVisible)
                      }
                      className="bg-green-100 text-green-600 font-semibold px-2 py-1 rounded text-sm flex items-center"
                    >
                      {status}
                      <FaChevronDown className="ml-2 text-gray-600" />
                    </button>
                    {statusDropdownVisible && (
                      <ul className="absolute bg-white shadow-md rounded mt-2 w-48">
                        {statusOptions.map((option) => (
                          <li
                            key={option}
                            onClick={() => handleStatusChange(option)}
                            className="cursor-pointer px-4 py-2 hover:bg-green-100"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conversation Panel */}
          <section className="w-2/4 bg-green-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow p-4">
              {/* Tabs */}
              <div className="flex border-b mb-4">
                {["Conversation", "Attachment", "Activity"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-semibold ${
                        activeTab === tab
                          ? "border-b-2 border-green-600 text-green-600"
                          : "text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === "Conversation" && (
                  <div>
                    {conversations.map((conversation) => (
                      <div key={conversation.id} className="mt-4">
                        <p className="text-sm font-bold">{conversation.user}</p>
                        <p className="text-sm text-gray-600">{conversation.time}</p>
                        <p className="text-sm text-gray-800 mt-2">
                          {conversation.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "Activity" && (
                  <div>
                    {activities.map((activity) => (
                      <div key={activity.id} className="mt-4">
                        <p className="text-sm font-bold">Date: {activity.date}</p>
                        <p className="text-sm text-gray-600">
                          Status: {activity.status}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "Attachment" && (
                  <div>
                    {attachments.length === 0 ? (
                      <div className="text-center">
                        <p className="font-bold text-green-800">
                          No Attachment Available
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Upload attachment or add more context to this ticket
                        </p>
                        <label className="bg-green-600 text-white px-4 py-2 rounded mt-4 cursor-pointer inline-block">
                          Browse Files
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {attachments.map((attachment, index) => (
                          <img
                            key={index}
                            src={attachment}
                            alt={`Attachment ${index + 1}`}
                            className="w-full h-32 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <button
                  onClick={handleCloseTicket}
                  className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Close Ticket
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
