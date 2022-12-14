import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/home";
import Cards from "./Components/Cards/cards";
import Show from "./Pages/Show/show";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Cards />}></Route>
          <Route path="/show/:id" element={<Show />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
