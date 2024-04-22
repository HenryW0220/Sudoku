import './App.css'
import { AuthForm } from './components/AuthForm';
import MainMenu from './components/MainMenu';
import FullSudokuGrid from './components/FullSudokuGrid';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return <div className={"bg-indigo-900 h-screen w-full flex flex-col items-center"}>
      <p className={"font-bold text-5xl text-neutral-200 p-10"}>Psudoku</p>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/mainmenu" element={<MainMenu />} />
          <Route path="/fullsudokugrid" element={<FullSudokuGrid />} />          
        </Routes>
      </BrowserRouter> */}
      <MainMenu />
    </div>
}
export default App;