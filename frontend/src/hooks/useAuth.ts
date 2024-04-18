import { useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Define the state variable for the user
  const [user, setUser] = useState<any>(null);

  // Define a function to log out
  const onLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  // Define a function to log in
  const onLogin = (user: any) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const loadMe = async () => {
    // Get the token from local storage
    const token = localStorage.getItem("token");
    // If the token exists, fetch the user
    if (token) {
      const response = await fetch("http://localhost:5002/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // If the response is ok, set the user state
      if (response.ok) {
        response
          .json()
          .then((data) => {
            setUser(data);
            setIsLoggedIn(true);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  };

  return {
    isLoggedIn,
    setIsLoggedIn,
    onLogin,
    onLogout,
    user,
    loadMe,
  };
};
