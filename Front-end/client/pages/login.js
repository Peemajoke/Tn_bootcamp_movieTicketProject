import Head from "next/head";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Space } from "antd";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useMutation, useQuery, gql } from "@apollo/client";
import Cookies from "js-cookie";
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'
import { useDispatch, useSelector } from "react-redux";

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
  const selectedMovieName = useSelector(
    (state) => state.movieSelect.movieName
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirmPasswordMatched, setisConfirmPasswordMatched] = useState(true)

  let [login, { loading: mutationLoading, error: mutationError, data }] =
    useMutation(doLoginMutation);

  const router = useRouter()

  // const assignToken = (token) => {
  //   if (token) {
  //     setisConfirmPasswordMatched(true)
  //     console.log("data success");
  //     document.cookie = "token=" + data.login.token;
  //     if(selectedMovieName) router.push('/reserveSeat')
  //     else router.push('/')
  //   }else{
  //     setisConfirmPasswordMatched(false)
  //   }
  // }

  const loginWithGQL = async () => {
    const loginInput = {
      email: email,
      password: password,
    };

    await login({ variables: { input: loginInput } })

    if (data!==undefined&&data.login&&data.login.success) {
      setisConfirmPasswordMatched(true)
      console.log("data success");
      document.cookie = "token=" + data.login.token;
      if(selectedMovieName) router.push('/reserveSeat')
      else router.push('/')
    }else if(data!==undefined){
      setisConfirmPasswordMatched(false)
    }

    // console.log(document.cookie);

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

    if(selectedMovieName) router.push('/reserveSeat')
    else router.push('/')
  };

  const onSubmit = async () => {
    console.log(email);
    console.log(password);

    await loginWithGQL();

      // if(data!==undefined && data.login.success){
      //   setisConfirmPasswordMatched(true)
      //   assignToken(data.login.token);
      // }else if(data!==undefined){
      //   setisConfirmPasswordMatched(false)
      // }
    
    // loginDirect();

    // if (document.cookie) {
    //   router.push('/')
    // }
    // if (Cookies.get('token')!=null){
    //   console.log(Cookies.get('token'))
    //   if(selectedMovieName) router.push('/reserveSeat')
    //   else router.push('/')
    // }
  };

  return (
    <>
      <Head>
        <title>S Major F: Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Space direction="vertical" style={{height: '87vh', width:'100%', paddingTop:"8%"}}>
      <h1 style={{textAlign:'center', paddingTop:'30px'}}>Login</h1>
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
          style={{ width: "100%" }}
          validateStatus={isConfirmPasswordMatched ? '':'error'}
        >
          <Input type="email" onChange={(e) => setEmail(e.target.value)} style={{width:'50%'}}/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          style={{ width: "100%" }}
          validateStatus={isConfirmPasswordMatched ? '':'error'}
          help={isConfirmPasswordMatched? null:'Email or Password is wrong.' }
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} style={{width:'50%'}}/>
        </Form.Item>
        {/* 
      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" block style={{width:'50%'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Space>
      <Footer />
    </>
  );
}

export default login;
