import styles from "./NavBar.module.css";
import Searchbar from "./Searchbar";

export default function NavBar() {
  return (
    <div className={`${styles["nav-container"]} ${styles.sticky}`}>
      <div className={styles.navbar}>
        <div className={styles.leftSection}>
          <img src={require("../../img/logo.png")} alt="logo" />
          <div className={styles.name}>TvMaze</div>
        </div>
        <div className={styles.rightSection}>
          <Searchbar />
        </div>
      </div>
    </div>
  );
}
