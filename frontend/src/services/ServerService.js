const getApiUrl = () =>
  import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://syncrova-z7sn.onrender.com/api";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getMyServers = async () => {
  const response = await fetch(`${getApiUrl()}/servers`, {
    headers: authHeaders(),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to load servers");
  }
  return data;
};

export const createServer = async ({ name, icon = "" }) => {
  const response = await fetch(`${getApiUrl()}/servers`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name, icon }),
  });
  const data = await response.json();

  if (!response.ok) {
    if (data.errors && Array.isArray(data.errors)) {
      throw new Error(data.errors.map((err) => err.message).join(" | "));
    }
    throw new Error(data.message || data.error || "Failed to create server");
  }
  return data;
};
