import React, { Component } from "react";
import { Menu } from "antd";
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import { useMutation, useQuery, gql } from '@apollo/client';

const doLogout = gql`
  mutation{
   logout{
      success
  }
}
`

// const [logoutgql, { loading: mutationLoadingLogout, error: mutationErrorLogout , data}] = useMutation(doLogout);

const  doingLogout = () => {
  // await logoutgql()
    // while (mutationLoadingLogout){
    //     console.log('waiting')
    // }
    // console.log(data)
    document.cookie = 'token=' + null
    console.log(document.cookie)
}

const displayEmail = () => {
  if (Cookies.get('token') != 'null'){
    return jwt.decode(Cookies.get('token')).email
  }else return null
}

class RightMenu extends Component {

  componentDidMount() {
    console.log(document.cookie)
    console.log(jwt.decode(Cookies.get('token')))
  }
  
  render() {
    return (
      <>
        {!this.props.isnowlogin && (
          <Menu mode="horizontal">
            <Menu.Item key="mail">
              <a href="/register">Register</a>
            </Menu.Item>
            <Menu.Item key="app">
              <a href="/login">Login</a>
            </Menu.Item>
          </Menu>
        )}
        {this.props.isnowlogin && (
          <Menu mode="horizontal">
            <p style={{margin:'0'}}>{displayEmail()}</p>
            <Menu.Item key="mail">
              <a href="/" onClick={doingLogout}>Logout</a>
            </Menu.Item>
          </Menu>
        )}
      </>
    );
  }
}
export default RightMenu;
