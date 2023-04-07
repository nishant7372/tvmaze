import styles from "./NavBar.module.css";
import Searchbar from "./Searchbar";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
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
          {(parts[1] === "" || parts[1] === "shows") && (
            <div className={styles["nav-right"]}>
              <Searchbar />
            </div>
          )}
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
