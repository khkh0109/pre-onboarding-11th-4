import "./App.css";
import Title from "./components/Title";
import Search from "./components/Search";

function App() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-20">
      <Title />
      <Search />
    </div>
  );
}

export default App;
