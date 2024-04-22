import './App.css'
import FullSudokuGrid from './components/FullSudokuGrid';
import MainMenu from './components/MainMenu';
import { AuthForm } from './components/AuthForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return <div className={"bg-indigo-900 h-screen w-full flex flex-col items-center"}>
      <p className={"font-bold text-5xl text-neutral-200 p-10"}>Psudoku</p>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthForm />}></Route>
          <Route path="/boards/retrieve_all_boards" element={<MainMenu />}></Route>
          <Route path="/boards/retrieve_board/1002" element={<FullSudokuGrid />}></Route>
        </Routes>
      </BrowserRouter> */}
      <MainMenu/>
    </div>
}
export default App;