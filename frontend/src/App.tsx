import { useState, useEffect } from "react";
import "./App.css";
import FullSudokuGrid from "./components/FullSudokuGrid";
import { AuthForm } from "./components/AuthForm";
function App() {
  // Define the state variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Define the state variable for the user
  const [user, setUser] = useState<any>(null);

  // Define an effect to run when the component mounts
  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");
    // If the token exists, fetch the user
    if (token) {
      // Define an async function inside the effect
      const fetchUser = async () => {
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
              console.log("user", data);
              setUser(data);
              setIsLoggedIn(true);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      };
      // Call the async function
      try {
        fetchUser();
      } catch {}
    }
  }, []);

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
  return (
    <div className={"bg-indigo-900 h-screen w-full flex flex-col items-center"}>
      {isLoggedIn && (
        <div className=" fixed w-screen h-22 flex items-center justify-between bg-white border-b px-5 py-2">
          <div>Psudoku</div>
          <div className="flex items-center gap-4">
            <span>{user?.username}</span>
            <span className=" cursor-pointer" onClick={onLogout}>
              Logout
            </span>
          </div>
        </div>
      )}
      <p className={"font-bold text-5xl text-neutral-200 p-10"}>Psudoku</p>
      {isLoggedIn ? (
        <FullSudokuGrid></FullSudokuGrid>
      ) : (
        <AuthForm onLogin={onLogin}></AuthForm>
      )}
    </div>
  );
}
export default App;
