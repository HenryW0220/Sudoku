import './App.css'
import FullSudokuGrid from './components/FullSudokuGrid';
import MainMenu from './components/MainMenu';

function App() {
  return <div className={"bg-indigo-900 h-screen w-full flex flex-col items-center"}>
      <p className={"font-bold text-5xl text-neutral-200 p-10"}>Psudoku</p>
      <MainMenu/>
    </div>
}
export default App;