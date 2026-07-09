const getApiUrl = () =>
  import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://syncrova-z7sn.onrender.com/api";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const createChannel = async ({ name, serverId, type = "text" }) => {
  const response = await fetch(`${getApiUrl()}/channels`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name, serverId, type }),
  });
  const data = await response.json();

  if (!response.ok) {
    if (data.errors && Array.isArray(data.errors)) {
      throw new Error(data.errors.map((err) => err.message).join(" | "));
    }
    throw new Error(data.message || data.error || "Failed to create channel");
  }
  return data;
};
