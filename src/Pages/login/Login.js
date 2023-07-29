import Input from "../../Components/Input/Input";
import styles from "./Login.module.css";

import { useEffect, useState } from "react";

export default function LogIn({ setUser }) {
  const eyePassword = null;
  const eyeText = null;
  const [error, setError] = useState(null);
  const [passwordType, setPasswordType] = useState("password");
  const [authData, setAuthData] = useState({ email: "", password: "" });

  const { email, password } = authData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showPassword = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      users = [];
    }
    let flag = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        localStorage.setItem("currentUser", JSON.stringify(users[i]));
        setUser(users[i]);
        flag = true;
      }
    }
    if (!flag) {
      setError("⚠️ Invalid Email or Password!");
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form
        className={styles["login-form"]}
        onSubmit={handleSubmit}
        spellCheck="false"
      >
        <div style={{ fontSize: "3rem", fontWeight: "600" }}>LogIn</div>
        <label>
          <span>Email ID</span>
          <Input
            type="email"
            placeholder="Email"
            setState={handleInputChange}
            name="email"
            value={email}
            required={true}
            autoFocus={true}
          />
        </label>
        <label>
          <span>Password</span>
          <div className={styles["password-field"]}>
            <Input
              type={passwordType}
              placeholder="Password"
              setState={handleInputChange}
              name="password"
              value={password}
              required={true}
              autoFocus={true}
            />
            <div>
              <img
                src={passwordType === "password" ? eyePassword : eyeText}
                onClick={showPassword}
                alt="eye-toggle"
              />
            </div>
          </div>
        </label>
        {error ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className={styles["error"]}>{error}</div>
            <span className={styles["cross"]} onClick={() => setError(null)}>
              x
            </span>
          </div>
        ) : null}
        <button className={styles["login-btn"]}>LogIn</button>
      </form>
    </div>
  );
}
