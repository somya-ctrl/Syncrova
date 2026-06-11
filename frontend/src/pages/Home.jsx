import React from "react";

const Home = () => {
  const servers = [
    { id: 1, name: "Developers Hub" },
    { id: 2, name: "Gaming Zone" },
    { id: 3, name: "Study Group" },
  ];

  return (
    <>
    <nav className="w-20 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col items-center py-5 gap-4 z-50">
  
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-md flex items-center justify-center text-white text-lg font-bold">
            ↔
         </div></div>
    <div className="w-8 h-px bg-outline-variant/30 my-1"></div>
<div className="server-icon bg-surface-container hover:bg-primary/20 group">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">developer_board</span>
</div>
<div className="server-icon bg-surface-container hover:bg-primary/20 group">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">palette</span>
<div className="notification-dot"></div>
</div>
<div className="server-icon bg-surface-container hover:bg-primary/20 group">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">rocket_launch</span>
</div>
<div className="mt-auto flex flex-col gap-4">
<button className="server-icon bg-transparent border-2 border-dashed border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary">
<span className="material-symbols-outlined">add</span>
</button>
<button className="server-icon bg-transparent border-2 border-dashed border-outline-variant/50 text-on-surface-variant hover:border-secondary hover:text-secondary">
<span className="material-symbols-outlined">explore</span>
</button>
</div>

  {/* content */}
</nav>
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
    </>
  );
};

export default Home;