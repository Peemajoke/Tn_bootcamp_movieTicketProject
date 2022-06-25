import React, { Component } from "react";
import { Menu } from "antd";

const isLogin = true;
class RightMenu extends Component {
  render() {
    return (
      <>
        {isLogin && (
          <Menu mode="horizontal">
            <Menu.Item key="mail">
              <a href="/register">Register</a>
            </Menu.Item>
            <Menu.Item key="app">
              <a href="/login">Login</a>
            </Menu.Item>
          </Menu>
        )}
        {!isLogin && (
          <Menu mode="horizontal">
            <Menu.Item key="mail">
              <a href="/">Logout</a>
            </Menu.Item>
          </Menu>
        )}
      </>
    );
  }
}
export default RightMenu;
