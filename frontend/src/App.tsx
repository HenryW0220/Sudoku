import { useCallback, useEffect } from "react";
import MainMenu from './components/MainMenu';
import { AuthForm } from "./components/AuthForm";
import { HeaderBar } from "./components/HeaderBar";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

// In the App component
function App() {
  const { isLoggedIn, onLogin, onLogout, user, userId } = useAuth();
  console.log('userId', userId)

  return (
    <div className={"bg-indigo-900 h-screen w-full flex flex-col items-center overflow-y-auto"}>
      {isLoggedIn && <HeaderBar user={user} onLogout={onLogout} />}

      <p className={"font-bold text-5xl text-neutral-200 pt-12 pb-8"}>Psudoku</p>

      {
        isLoggedIn ? (<MainMenu userId={userId} />) : (<AuthForm onLogin={onLogin} ></AuthForm>)
      }
    </div>
  );
}

export default App;