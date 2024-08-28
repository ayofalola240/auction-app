import { useState } from "react";
import styles from "../styles/LoginForm.module.css";
import useRequest from "../hooks/use-request";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/auth/login", // Updated to use relative path
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => window.location.href = "/", // Force a full page reload
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h1>Login</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          type="email"
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          type="password"
          required
        />
      </div>
      {errors}
      <button className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
