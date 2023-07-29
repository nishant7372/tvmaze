import Input from "../../Components/Input/Input";
import images from "../../constants/images";
import styles from "./Signup.module.css";

import { useState } from "react";

export default function Signup({ setUser }) {
  const [error, setError] = useState(null);
  const eyePassword = images.eyePassword;
  const eyeText = images.eyeText;
  const [passwordType, setPasswordType] = useState("password");
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = authData;

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
      if (users[i].email === email) {
        flag = true;
        break;
      }
    }
    if (flag) {
      setError("⚠️ User already registered");
    } else {
      setUser({ name, email, password });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name, email, password })
      );
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form
        className={styles["Signup-form"]}
        onSubmit={handleSubmit}
        spellCheck="false"
      >
        <div style={{ fontSize: "3rem", fontWeight: "600" }}>Signup</div>
        <label>
          <span>Name</span>
          <Input
            type="text"
            placeholder="Name"
            setState={handleInputChange}
            name="name"
            value={name}
            required={true}
            autoFocus={true}
          />
        </label>
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
        <button className={styles["Signup-btn"]}>Signup</button>
      </form>
    </div>
  );
}
