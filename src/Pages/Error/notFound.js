import styles from "./notFound.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };
  return (
    <div id={styles["notfound"]}>
      <div className={styles["notfound"]}>
        <div className={styles["notfound-404"]}>
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
        <div className={styles["back"]} onClick={goBack}>
          Home Page
        </div>
      </div>
    </div>
  );
}
