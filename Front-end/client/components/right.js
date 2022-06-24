import React, { Component } from "react";
import { Menu } from "antd";
class RightMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <a href="/register">Register</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/login">Login</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default RightMenu;
