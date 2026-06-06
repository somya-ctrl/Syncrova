import React from "react";

const Home = () => {
  const servers = [
    { id: 1, name: "Developers Hub" },
    { id: 2, name: "Gaming Zone" },
    { id: 3, name: "Study Group" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h1 className="text-3xl font-bold">Welcome to Syncrova 👋</h1>
        <p className="text-gray-600 mt-2">
          Create servers, join communities, and chat with friends.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Create Server
        </button>

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Join Server
        </button>
      </div>

      {/* Server List */}
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-4">Your Servers</h2>

        <div className="space-y-3">
          {servers.map((server) => (
            <div
              key={server.id}
              className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
            >
              {server.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;