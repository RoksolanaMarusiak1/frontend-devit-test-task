import styles from "./Login.module.css";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
}

export default Login;
