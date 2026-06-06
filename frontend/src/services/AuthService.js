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
export const signupUser = async (userData) => {
  const response = await fetch(
    "https://syncrova-z7sn.onrender.com/api/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};