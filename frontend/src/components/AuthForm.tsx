import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the AuthForm component
export function AuthForm({ onLogin }: any) {
  // Define the state variables
  const [type, setType] = useState("login");
  // Define the state variables for the username, password, and API error
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  // Define a function to toggle the form type
  const toggleType = () => {
    setType(type === "login" ? "register" : "login");
    setApiError("");
  };

  // Clear the error message when the form type changes
  useEffect(() => {
    setApiError("");
  }, [type, password, username]);

  // Define a function to handle login
  const handleLogin = async () => {
    try {
      // Fetch the login endpoint
      const response = await fetch("http://localhost:5002/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      console.log(response);
      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(await response.json().then((data) => data.message));
      }
      // If the response is ok, get the data
      const data = await response.json();
      // If the data contains a token, set the token in local storage
      if (data.token) {
        localStorage.setItem("token", data.token);
        onLogin(data);
      }
      navigate('/mainmenu')
    } catch (error: any) {
      // If there is an error, log the error and set the error message
      console.error("Error:", error);
      setApiError(error?.message ?? "Error");
    }
  };

  // Define a function to handle registration
  const handleRegister = async () => {
    try {
      // Fetch the register endpoint
      const response = await fetch("http://localhost:5002/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(await response.json().then((data) => data.message));
      }
      // If the response is ok, set the form type to login
      alert("Registration successful! Please log in.");
      setType("login");
      navigate('/mainmenu')
    } catch (error: any) {
      // If there is an error, log the error and set the error message
      console.error("Error:", error);
      setApiError(error?.message ?? "Error");
    }
  };

  // Define a function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // If the form type is login, call the handleLogin function
    if (type === "login") {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-center">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            {type === "login" ? "Login" : "Register"}
          </label>
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            required
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          {apiError && <p className="text-red-500">{apiError}</p>}
        </div>
        <div className="flex flex-col items-center justify-between">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {type === "login" ? "Login" : "Register"}
          </button>

          <p className="mt-5">
            You can{" "}
            <span
              className=" text-blue-500 cursor-pointer"
              onClick={toggleType}
            >
              {type === "login" ? "register" : "login"}
            </span>{" "}
            here.
          </p>
        </div>
      </form>
    </div>
  );
}
