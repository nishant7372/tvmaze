import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Pages/Home/home";
import Cards from "./Components/Cards/cards";
import Show from "./Pages/Show/show";
import NavBar from "./Components/NavBar/NavBar";
import Cast from "./Pages/Cast/cast";
import NotFound from "./Pages/Error/notFound";
import FavouriteShows from "./Pages/Favourite/favourite";

import LogIn from "./Pages/login/Login";
import Signup from "./Pages/signup/Signup";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  useEffect(() => {}, [user]);

  return (
    <div className="App">
      <Router>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LogIn setUser={setUser} />}
          ></Route>
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup setUser={setUser} />}
          ></Route>
          <Route path="/shows/:query" element={<Cards />}></Route>
          <Route path="/show/:query/:id" element={<Show />}></Route>
          <Route path="/:query/:id/cast" element={<Cast />}></Route>
          <Route path="/favourites" element={<FavouriteShows />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
