import styles from "./NavBar.module.css";
import Searchbar from "./Searchbar";

export default function NavBar() {
  return (
    <div className={`${styles["nav-container"]} ${styles.sticky}`}>
      <div className={styles["navbar"]}>
        <div className={styles["nav-left"]}>
          <img src={require("../../img/logo.png")} alt="logo" />
          <div className={styles["name"]}>TvMaze</div>
        </div>
        <div className={styles["nav-right"]}>
          <Searchbar />
        </div>
      </div>
    </div>
  );
}
