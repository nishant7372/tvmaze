import styles from "./NavBar.module.css";
import Searchbar from "./Searchbar";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

export default function NavBar({ user, setUser }) {
  const location = useLocation();
  const parts = location.pathname.split("/");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={`${styles["nav-container"]} ${styles.sticky}`}>
        <div className={styles["navbar"]}>
          <div className={styles["nav-left"]}>
            <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="logo" />
            <div className={styles["name"]}>TvMaze</div>
          </div>
          <div className={styles["nav-middle"]}>
            <NavLink to="/">
              <i class="fa-solid fa-house"></i> &nbsp;
              <span className={styles["fav-name"]}>Home</span>
            </NavLink>
            <NavLink to="/favourites">
              <i className="fa-solid fa-heart"></i> &nbsp;
              <span className={styles["fav-name"]}>Favourites</span>
            </NavLink>
          </div>

          <div className={styles["nav-right"]}>
            {(parts[1] === "" || parts[1] === "shows") && <Searchbar />}
            {!user ? (
              <>
                <NavLink className={styles["navLink"]} to="/login">
                  LogIn
                </NavLink>
                <NavLink className={styles["navLink"]} to="/signup">
                  Signup
                </NavLink>
              </>
            ) : (
              <button
                className={styles["navLink"]}
                onClick={() => {
                  localStorage.setItem("currentUser", null);
                  setUser(null);
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={`${styles["navbar2"]}`}>
        <div className={styles["backButton"]}>
          <i className="fa-solid fa-arrow-left" onClick={goBack}></i>
        </div>
        <div className={styles["github"]}>
          <a
            className="fa-brands fa-github"
            href="https://github.com/nishant7372/tvmaze"
          >
            {""}
          </a>
        </div>
      </div>
    </>
  );
}
