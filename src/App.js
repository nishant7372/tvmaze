import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/home";
import Cards from "./Components/Cards/cards";
import Show from "./Pages/Show/show";
import NavBar from "./Components/NavBar/NavBar";
import Cast from "./Pages/Cast/cast";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shows/:query" element={<Cards />}></Route>
          <Route path="/show/:id" element={<Show />}></Route>
          <Route path="/cast/:id" element={<Cast />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
