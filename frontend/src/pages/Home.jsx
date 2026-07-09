import React, { useEffect, useState } from "react";
import {
  Grid3x3,
  Palette,
  Rocket,
  Plus,
  Compass,
  Home as HomeIcon,
  Inbox,
  Calendar,
  Hash,
  Search,
  Server,
  Bell,
  Users,
  Video,
  Smile,
  Image,
  Send,
  Mic,
  ArrowUpRight,
  X,
  Loader2,
} from "lucide-react";
import { createChannel } from "../services/ChannelService";
import { getMyServers, createServer } from "../services/ServerService";

const initialChannels = [
  { name: "general" },
  { name: "pull-requests" },
  { name: "bug-reports", alert: true },
  { name: "ai-tools" },
];

const team = [
  { name: "Marcus", role: "Design" },
  { name: "Sarah", role: "Dev" },
];

const stats = [
  { icon: Server, value: 14, label: "Servers online", badge: "+2 live" },
  { icon: Bell, value: 12, label: "Unread alerts", badge: "Action required", danger: true },
  { icon: Users, value: 128, label: "Total members", badge: "42 active" },
  { icon: Calendar, value: 3, label: "Today's sessions", badge: "Coming up" },
];

const messages = [
  {
    author: "Marcus",
    time: "10:42 AM",
    text: "Just pushed the new dark theme tokens to the #design-system channel. Can you review the contrast ratios?",
    reactions: [{ emoji: "🚀", count: 4 }, { emoji: "👍", count: 2 }],
  },
];

const schedule = [
  { time: "13:00", period: "PM", title: "Syncrova Redesign V2", meta: "8 attendees", tag: "Soon", action: "Join" },
  { time: "15:30", period: "PM", title: "Weekly Sync: Growth", meta: "14 attendees", action: "Remind" },
];

const clusters = [
  { name: "DevTeam Alpha", desc: "Primary development hub for frontend services.", online: 12, total: 128 },
  { name: "MarketReady HQ", desc: "Marketing and analytics production environment.", online: 4, total: 42 },
];

const NavItem = ({ icon: Icon, label, badge, active }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface"
    }`}
  >
    <Icon size={18} />
    {label}
    {badge && (
      <span className="ml-auto bg-primary text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </a>
);

const StatCard = ({ icon: Icon, value, label, badge, danger }) => (
  <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-4">
    <div className="flex items-center justify-between mb-4">
      <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
        <Icon size={17} />
      </div>
      <span
        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          danger ? "bg-error/15 text-error" : "bg-primary/15 text-primary"
        }`}
      >
        {badge}
      </span>
    </div>
    <p className="text-2xl font-bold text-on-surface">{value}</p>
    <p className="text-xs text-on-surface-variant uppercase tracking-wide mt-1">{label}</p>
  </div>
);

const Home = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.username || "there";
  const initial = username.charAt(0).toUpperCase();

  const [channels, setChannels] = useState(initialChannels);

  const [servers, setServers] = useState([]);
  const [selectedServerId, setSelectedServerId] = useState("");
  const [serversLoading, setServersLoading] = useState(true);
  const [serversError, setServersError] = useState("");

  useEffect(() => {
    getMyServers()
      .then((data) => {
        setServers(data);
        if (data.length > 0) setSelectedServerId(data[0]._id);
      })
      .catch((err) => setServersError(err.message))
      .finally(() => setServersLoading(false));
  }, []);

  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState("text");
  const [creatingChannel, setCreatingChannel] = useState(false);
  const [createChannelError, setCreateChannelError] = useState("");

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    setCreateChannelError("");

    if (!newChannelName.trim()) {
      setCreateChannelError("Channel name is required");
      return;
    }
    if (!selectedServerId) {
      setCreateChannelError("No server selected");
      return;
    }

    setCreatingChannel(true);
    try {
      const channel = await createChannel({
        name: newChannelName.trim(),
        serverId: selectedServerId,
        type: newChannelType,
      });
      setChannels((prev) => [...prev, { name: channel.name, alert: false }]);
      setNewChannelName("");
      setNewChannelType("text");
      setShowCreateChannel(false);
    } catch (err) {
      setCreateChannelError(err.message);
    } finally {
      setCreatingChannel(false);
    }
  };

  const [showCreateServer, setShowCreateServer] = useState(false);
  const [newServerName, setNewServerName] = useState("");
  const [creatingServer, setCreatingServer] = useState(false);
  const [createServerError, setCreateServerError] = useState("");

  const handleCreateServer = async (e) => {
    e.preventDefault();
    setCreateServerError("");

    if (newServerName.trim().length < 3) {
      setCreateServerError("Server name must be at least 3 characters");
      return;
    }

    setCreatingServer(true);
    try {
      const { server, defaultChannel } = await createServer({ name: newServerName.trim() });
      setServers((prev) => [...prev, server]);
      setSelectedServerId(server._id);
      if (defaultChannel) {
        setChannels((prev) => [...prev, { name: defaultChannel.name, alert: false }]);
      }
      setNewServerName("");
      setShowCreateServer(false);
    } catch (err) {
      setCreateServerError(err.message);
    } finally {
      setCreatingServer(false);
    }
  };

  return (
    <div className="flex h-screen bg-surface-container-lowest text-on-surface font-geist overflow-hidden">
      {/* Icon rail */}
      <nav className="w-20 shrink-0 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col items-center py-5 gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-on-primary font-bold">
          ↔
        </div>
        <div className="w-8 h-px bg-outline-variant/30 my-1" />
        <button className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
          <Grid3x3 size={19} />
        </button>
        <button className="w-11 h-11 rounded-xl text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface flex items-center justify-center transition-colors">
          <Palette size={19} />
        </button>
        <button className="w-11 h-11 rounded-xl text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface flex items-center justify-center transition-colors">
          <Rocket size={19} />
        </button>
        <div className="mt-auto flex flex-col gap-3">
          <button className="w-11 h-11 rounded-xl border-2 border-dashed border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary flex items-center justify-center transition-colors">
            <Plus size={18} />
          </button>
          <button className="w-11 h-11 rounded-xl border-2 border-dashed border-outline-variant/50 text-on-surface-variant hover:border-secondary hover:text-secondary flex items-center justify-center transition-colors">
            <Compass size={18} />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-surface-container-low border-r border-outline-variant/10 flex flex-col">
        <div className="p-6 border-b border-outline-variant/10">
          <h2 className="font-bold text-lg text-on-surface">Syncrova</h2>
          <p className="text-xs text-on-surface-variant">Enterprise Suite</p>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <nav className="space-y-0.5">
            <NavItem icon={HomeIcon} label="Overview" active />
            <NavItem icon={Inbox} label="Inbox" badge={12} />
            <NavItem icon={Calendar} label="Calendar" />
          </nav>

          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Channels</span>
              <button
                onClick={() => setShowCreateChannel(true)}
                disabled={!selectedServerId}
                className="text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title={selectedServerId ? "Create channel" : "No server available"}
              >
                <Plus size={14} />
              </button>
            </div>
            <nav className="space-y-0.5">
              {channels.map((c) => (
                <a
                  key={c.name}
                  href="#"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-on-surface-variant hover:bg-surface-variant/20 hover:text-on-surface transition-colors"
                >
                  <Hash size={14} className="text-outline" />
                  {c.name}
                  {c.alert && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-error" />}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Team</span>
            <div className="mt-2 space-y-0.5">
              {team.map((member) => (
                <a
                  key={member.name}
                  href="#"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm text-on-surface-variant hover:bg-surface-variant/20 hover:text-on-surface transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface">
                    {member.name.charAt(0)}
                  </span>
                  {member.name}
                  <span className="ml-auto text-[10px] text-on-surface-variant/70">{member.role}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-center gap-2.5 bg-surface-container rounded-xl p-2.5">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-on-primary">
              {initial}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> System live
              </p>
              <p className="text-[10px] text-on-surface-variant truncate">AWS-US-East-1 stable</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-outline-variant/10">
          <div className="flex items-center gap-6">
            {["Overview", "Network", "Deployments"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${
                  activeTab === tab
                    ? "text-on-surface border-primary"
                    : "text-on-surface-variant border-transparent hover:text-on-surface"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-9 pr-3 py-2 bg-surface-container rounded-lg text-sm text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Welcome card */}
          <div className="rounded-2xl p-8 bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low border border-outline-variant/20">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> All systems operational
            </span>
            <h1 className="text-3xl font-bold text-on-surface mb-3">Welcome back, {username}.</h1>
            <p className="text-on-surface-variant max-w-xl mb-6">
              You have 2 meetings starting soon and 12 unread alerts in the DesignOps workspace.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <button className="inline-flex items-center gap-2 bg-primary text-on-primary text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                <Send size={15} /> Quick Message
              </button>
              <button className="inline-flex items-center gap-2 bg-surface-container-highest text-on-surface text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-surface-variant transition-colors">
                <Plus size={15} /> New Meeting
              </button>
              <button
                onClick={() => setShowCreateServer(true)}
                className="text-sm font-semibold text-on-surface-variant hover:text-on-surface px-2 transition-colors"
              >
                Create Server
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Channel preview */}
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10">
              <div className="flex items-center gap-2">
                <Hash size={17} className="text-on-surface-variant" />
                <h3 className="font-bold text-on-surface">general</h3>
                <span className="text-xs text-on-surface-variant">Channel for team-wide announcements</span>
              </div>
              <div className="flex -space-x-2">
                {[...team, { name: "+" }].map((m, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-full bg-surface-container-high border-2 border-surface-container-low flex items-center justify-center text-[10px] font-bold text-on-surface"
                  >
                    {m.name === "+" ? "+38" : m.name.charAt(0)}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 space-y-4 min-h-[140px]">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface">
                    {m.author.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold text-on-surface">{m.author}</span>{" "}
                      <span className="text-xs text-on-surface-variant">{m.time}</span>
                    </p>
                    <p className="text-sm text-on-surface-variant mt-1 max-w-lg">{m.text}</p>
                    <div className="flex gap-2 mt-2">
                      {m.reactions.map((r, j) => (
                        <span
                          key={j}
                          className="text-xs bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant"
                        >
                          {r.emoji} {r.count}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 justify-end">
                <div className="text-right">
                  <p className="text-sm">
                    <span className="text-xs text-on-surface-variant mr-1">11:05 AM</span>
                    <span className="font-semibold text-on-surface">You</span>
                  </p>
                  <p className="text-sm bg-primary/15 text-on-surface rounded-xl rounded-tr-sm px-3 py-2 mt-1 inline-block max-w-lg text-left">
                    On it. Contrast looks good on the primary buttons — will verify the deep surfaces next.
                  </p>
                </div>
                <span className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-on-primary">
                  {initial}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-5 py-3 border-t border-outline-variant/10">
              <button className="text-on-surface-variant hover:text-on-surface transition-colors">
                <Plus size={17} />
              </button>
              <input
                type="text"
                placeholder="Message #general..."
                className="flex-1 bg-transparent text-sm text-on-surface placeholder-on-surface-variant focus:outline-none"
              />
              <button className="text-on-surface-variant hover:text-on-surface transition-colors">
                <Smile size={17} />
              </button>
              <button className="text-on-surface-variant hover:text-on-surface transition-colors">
                <Image size={17} />
              </button>
              <button className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center hover:opacity-90 transition-opacity">
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* Schedule + clusters */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
                <Calendar size={17} className="text-on-surface-variant" /> Today's schedule
              </h3>
              <div className="space-y-3">
                {schedule.map((ev) => (
                  <div
                    key={ev.title}
                    className="flex items-center gap-4 bg-surface-container-low border border-outline-variant/20 rounded-xl p-4"
                  >
                    <div className="text-center shrink-0 w-14">
                      <p className="text-sm font-bold text-on-surface">{ev.time}</p>
                      <p className="text-[10px] text-on-surface-variant">{ev.period}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-on-surface truncate">{ev.title}</p>
                        {ev.tag && (
                          <span className="text-[10px] font-bold text-primary bg-primary/15 px-1.5 py-0.5 rounded-full shrink-0">
                            {ev.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant">{ev.meta}</p>
                    </div>
                    <button className="text-xs font-semibold bg-surface-container-highest text-on-surface px-3 py-1.5 rounded-lg hover:bg-surface-variant transition-colors shrink-0">
                      {ev.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-on-surface flex items-center gap-2">
                  <Server size={17} className="text-on-surface-variant" /> Core clusters
                </h3>
                <a href="#" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                  View all <ArrowUpRight size={12} />
                </a>
              </div>
              <div className="space-y-3">
                {clusters.map((c) => (
                  <div key={c.name} className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface">
                          {c.name.charAt(0)}
                        </span>
                        <p className="font-semibold text-on-surface">{c.name}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mb-3">{c.desc}</p>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {c.online} online · {c.total} total
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right panel */}
      <aside className="w-72 shrink-0 border-l border-outline-variant/10 p-5 space-y-8 hidden xl:block overflow-y-auto">
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">
            Direct messages
          </h4>
          <div className="space-y-1">
            {[
              { name: "Marcus", preview: "That layout looks perfect...", time: "2m ago", unread: 2 },
              { name: "Sarah Jenkins", preview: "The PR is ready for final...", time: "Yesterday" },
            ].map((dm) => (
              <a
                key={dm.name}
                href="#"
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-surface-variant/20 transition-colors"
              >
                <span className="w-8 h-8 shrink-0 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface">
                  {dm.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-on-surface truncate">{dm.name}</p>
                    <span className="text-[10px] text-on-surface-variant shrink-0">{dm.time}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">{dm.preview}</p>
                </div>
                {dm.unread && (
                  <span className="w-4 h-4 shrink-0 rounded-full bg-primary text-on-primary text-[9px] font-bold flex items-center justify-center">
                    {dm.unread}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">
            Active voice
          </h4>
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-on-surface flex items-center gap-1.5">
                <Mic size={13} className="text-emerald-400" /> General voice
              </p>
              <button className="text-[10px] font-bold text-on-primary bg-primary px-2.5 py-1 rounded-full hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
            <div className="flex -space-x-2">
              {team.map((m) => (
                <span
                  key={m.name}
                  className="w-7 h-7 rounded-full bg-surface-container-high border-2 border-emerald-400 flex items-center justify-center text-[10px] font-bold text-on-surface"
                >
                  {m.name.charAt(0)}
                </span>
              ))}
              <span className="w-7 h-7 rounded-full bg-surface-container-high border-2 border-surface-container-low flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                +12
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Discover</h4>
          <a
            href="#"
            className="flex items-center gap-3 bg-surface-container-low border border-outline-variant/20 rounded-xl p-3 hover:bg-surface-variant/10 transition-colors"
          >
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-on-primary">
              <Video size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-on-surface truncate">Vercel Design Lab</p>
              <p className="text-[10px] text-on-surface-variant">12.4k active</p>
            </div>
          </a>
        </div>
      </aside>

      {showCreateChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-on-surface">Create channel</h3>
              <button
                onClick={() => setShowCreateChannel(false)}
                className="text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateChannel} className="space-y-4">
              {servers.length > 1 && (
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1.5">Server</label>
                  <select
                    value={selectedServerId}
                    onChange={(e) => setSelectedServerId(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {servers.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5">Channel name</label>
                <div className="relative">
                  <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input
                    autoFocus
                    type="text"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="e.g. design-review"
                    className="w-full pl-8 pr-3 py-2 bg-surface-container rounded-lg text-sm text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5">Type</label>
                <div className="flex gap-2">
                  {["text", "voice"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewChannelType(t)}
                      className={`flex-1 text-sm font-semibold py-2 rounded-lg capitalize transition-colors ${
                        newChannelType === t
                          ? "bg-primary/15 text-primary"
                          : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {createChannelError && <p className="text-xs text-error">{createChannelError}</p>}
              {serversError && <p className="text-xs text-error">{serversError}</p>}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCreateChannel(false)}
                  className="flex-1 text-sm font-semibold py-2.5 rounded-lg bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingChannel || serversLoading}
                  className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-lg bg-primary text-on-primary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creatingChannel && <Loader2 size={14} className="animate-spin" />}
                  {creatingChannel ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCreateServer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-on-surface">Create server</h3>
              <button
                onClick={() => setShowCreateServer(false)}
                className="text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateServer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5">Server name</label>
                <input
                  autoFocus
                  type="text"
                  value={newServerName}
                  onChange={(e) => setNewServerName(e.target.value)}
                  placeholder="e.g. Product Team"
                  className="w-full px-3 py-2 bg-surface-container rounded-lg text-sm text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {createServerError && <p className="text-xs text-error">{createServerError}</p>}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCreateServer(false)}
                  className="flex-1 text-sm font-semibold py-2.5 rounded-lg bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingServer}
                  className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-lg bg-primary text-on-primary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creatingServer && <Loader2 size={14} className="animate-spin" />}
                  {creatingServer ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
