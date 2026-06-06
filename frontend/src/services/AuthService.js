export const loginUser = async (email, password) => {
  const response = await fetch(
    "https://syncrova-z7sn.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  return response.json();
};