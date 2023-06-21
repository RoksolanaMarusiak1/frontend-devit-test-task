import { useState } from "react";
import styles from "../pages/Login.module.css";
import $api from "../http";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [message, setMessage] = useState("");

  function registration(event) {
    event.preventDefault();
    if (email && password) {
      $api
        .post("/users/registration", { email, password })
        .then((response) => {
          setLoginError("");
          setMessage("User was successfully registered");
        })
        .catch((error) => {
          setMessage("");
          setLoginError(error.response.data);
        });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (email && password) {
      $api
        .post("/users/login", { email, password })
        .then((response) => {
          localStorage.setItem("token", response.data.accessToken);
          setLoginError("");
          navigate("/posts");
        })
        .catch((error) => {
          setLoginError(error.response.data);
        });
    }
  }

  return (
    <div className={styles.loginForm}>
      <div className={styles.title}>
        <h2>Login</h2>
      </div>
      <form className={styles.formData} onSubmit={handleSubmit}>
        <input
          placeholder="Email*"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <input
            placeholder="Password*"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.loginButtons}>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <button onClick={registration} className={styles.loginButton}>
            Registration
          </button>
        </div>
        <div
          style={{ display: loginError ? "inline" : "none" }}
          className={styles.error}
        >
          <p>{loginError}</p>
        </div>
        <div
          style={{ display: message ? "inline" : "none" }}
          className={styles.successMessage}
        >
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
