import { useEffect } from "react";
import MainMenu from './components/MainMenu';
import { useState } from "react";
import { AuthForm } from "./components/AuthForm";
import { HeaderBar } from "./components/HeaderBar";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

function App() {
  const { isLoggedIn, onLogin, onLogout, user, loadMe } = useAuth();
  const [isBoardSelected, setIsBoardSelected] = useState(false);

  // Define an effect to run when the component mounts
  useEffect(() => {
    // Call the loadMe function
    loadMe();
  }, [loadMe]);

  return (
    <div className={"bg-indigo-900 min-h-screen w-full flex flex-col items-center overflow-y-auto"}>
      {isLoggedIn && <HeaderBar user={user} onLogout={onLogout} />}

      <p className={"font-bold text-5xl text-neutral-200 p-11"}>Psudoku</p>

      {(isLoggedIn && !isBoardSelected) ? (
        <MainMenu setBoardSelected={setIsBoardSelected}/>
      ) : (
        <AuthForm onLogin={onLogin}></AuthForm>
      )}
    </div>
  );
}
export default App;