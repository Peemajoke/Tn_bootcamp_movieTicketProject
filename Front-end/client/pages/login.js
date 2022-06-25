import Head from "next/head";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useMutation, useQuery, gql } from "@apollo/client";
import Cookies from "js-cookie";

const doLoginMutation = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
      success
      token
    }
  }
`;

const url = 'http://localhost:3000/api/v1/auth/login'

function login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading: mutationLoading, error: mutationError, data }] =
    useMutation(doLoginMutation);

  const loginWithGQL = async () => {
    const loginInput = {
      email: email,
      password: password,
    };

    await login({ variables: { input: loginInput } });
    console.log(mutationLoading);

    console.log(data)

    if (data.login.success) {
      console.log("data success");
      document.cookie = "token=" + data.login.token;
    }

    console.log(document.cookie);
  };

  const loginDirect = async () => {
    const options = {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: `email=${email}&password=${password}`,
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            alert("Email not found, please retry");
          }
          if (response.status === 401) {
            alert("Email and password do not match, please retry");
          }
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.cookie = "token=" + data.token;
          console.log(document.cookie);
        }
      });
  };

  const onSubmit = async () => {
    console.log(email);
    console.log(password);

    loginWithGQL();
    // loginDirect();
  };

  return (
    <>
      <Head>
        <title>S Major F: Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={() => {
          console.log("submit fail");
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          style={{ width: "40%" }}
        >
          <Input type="email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          style={{ width: "40%" }}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        {/* 
      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <p>{Cookies.get('token')}</p> */}
      <Footer />
    </>
  );
}

export default login;
