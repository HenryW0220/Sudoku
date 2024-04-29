import { useCallback, useEffect, useState } from "react";

// In the useAuth hook
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);

  const onLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const onLogin = (userData: any) => {
    setUser(userData.username);
    setIsLoggedIn(true);
    // Call loadMe only when the user logs in
    loadMe();
  };

  const loadMe = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:5002/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const userData = await response.json();
          console.log("user", userData.user_id, userData.username);
          setUser(userData.username);
          setUserId(userData.user_id);
          
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return {
    isLoggedIn,
    setIsLoggedIn,
    onLogin,
    onLogout,
    user,
    userId,
  };
};
