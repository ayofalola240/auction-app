import { useState } from "react";
import Router from "next/router";
import styles from "../styles/SignupForm.module.css";
import useRequest from "../hooks/use-request";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { doRequest: doSignup, errors: signupErrors } = useRequest({
    url: "/auth/register",
    method: "post",
    body: {
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
    },
    onSuccess: () => doLogin(),
  });

  const { doRequest: doLogin, errors: loginErrors } = useRequest({
    url: "/auth/login",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => window.location.href = "/", // Full page refresh after login
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await doSignup();
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h1>Signup</h1>
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
      <div className="form-group">
        <label>Confirm Password</label>
        <input
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="form-control"
          type="password"
          required
        />
      </div>
      <div className="form-group">
        <label>First Name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-control"
          type="text"
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-control"
          type="text"
          required
        />
      </div>
      {signupErrors}
      {loginErrors}
      <button className="btn btn-primary" type="submit">
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
