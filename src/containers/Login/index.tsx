import React, { SyntheticEvent, useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";

function Login(props: any) {
  const LOGIN_MUTATION = gql`
    mutation login($input: LoginInputDto!) {
      login(loginUserInput: $input) {
        user {
          username
        }
        access_token
      }
    }
  `;
  const SIGN_UP_MUTATION = gql`
    mutation signUp($input: LoginInputDto!) {
      signUp(signUpInput: $input) {
        username
        id
      }
    }
  `;

  console.log(props);
  const [isLogin, setIsLogin] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { username, password, confirmPassword } = form;

  const [loginSignUpMutation, { loading, error, data }] = useMutation(
    isLogin ? LOGIN_MUTATION : SIGN_UP_MUTATION,
    { variables: { input: { username, password } } }
  );

  const onChange = (e: any) => {
    console.log(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const OnClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("password not match");
      return;
    }
    loginSignUpMutation();
  };
  console.log({ loading, error, data });
  console.log(form);

  useEffect(() => {
    if (!loading && data) {
      if (data.login) {
        localStorage.setItem("token", data.login.access_token);
        props.history.push("/dashboard");
      } else {
        alert("sign up success. Please login.");
        setIsLogin(true);
      }
    }
  }, [loading, error, data, props.history]);

  return (
    <div
      style={{
        flex: 1,
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input value={username} name="username" onChange={onChange} />
      <input
        type="password"
        value={password}
        name="password"
        onChange={onChange}
      />
      {!isLogin && (
        <input
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={onChange}
        />
      )}
      <button onClick={OnClick}>{isLogin ? "Login" : "Sign Up"}</button>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "New User Register" : "Already have an account!"}
      </p>
    </div>
  );
}

export default Login;
