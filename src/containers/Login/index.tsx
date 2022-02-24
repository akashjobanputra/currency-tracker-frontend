import React, { SyntheticEvent, useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Button, Container, Divider, Form, Header } from "semantic-ui-react";

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
    console.log({ e });
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
    <Container style={{ width: "500px" }}>
      <Header as="h1">{isLogin ? "Login" : "Sign Up"}</Header>
      <Form loading={loading} onSubmit={OnClick}>
        <Form.Input
          label="Username"
          name="username"
          value={username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
        {!isLogin && (
          <Form.Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={onChange}
          />
        )}
        <Form.Button positive fluid>
          {isLogin ? "Login" : "Sign Up"}
        </Form.Button>
      </Form>
      <Divider />
      <Button onClick={() => setIsLogin(!isLogin)} fluid basic>
        {isLogin ? "New User Register" : "Already have an account!"}
      </Button>
    </Container>
  );
}

export default Login;
