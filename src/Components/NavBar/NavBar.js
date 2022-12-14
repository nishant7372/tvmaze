import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import Searchbar from "./Searchbar";

export default function NavBar() {
  const navColors = ["green"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        return prevIndex == navColors.length - 1 ? 0 : prevIndex + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles["nav-container"]} ${navColors[index]} ${styles.sticky}`}
    >
      <div className={styles.navbar}>
        <div className={styles.leftSection}>
          <img src={require("../../img/logo.png")} />
          <div className={styles.name}>TvMaze</div>
        </div>
        <div className={styles.rightSection}>
          <Searchbar />
        </div>
      </div>
    </div>
  );
}
