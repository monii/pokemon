import { Routes, Route } from "react-router-dom";
import Main from "./page/main/Main";
import PokemonDetail from "./page/pokemonDetail/PokemonDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

export default App;
