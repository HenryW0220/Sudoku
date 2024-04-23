import { useEffect } from "react";
import MainMenu from './components/MainMenu';
import FullSudokuGrid from "./components/FullSudokuGrid";
import { AuthForm } from "./components/AuthForm";
import { HeaderBar } from "./components/HeaderBar";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const { isLoggedIn, onLogin, onLogout, user, loadMe } = useAuth();

  // Define an effect to run when the component mounts
  useEffect(() => {
    // Call the loadMe function
    loadMe();
  }, [loadMe]);

  return (
    <div className={"bg-indigo-900 h-screen w-full flex flex-col items-center"}>
      {isLoggedIn && <HeaderBar user={user} onLogout={onLogout} />}

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