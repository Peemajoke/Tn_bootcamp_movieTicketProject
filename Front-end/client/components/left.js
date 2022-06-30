import React, { Component } from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LeftMenu extends Component {
  render() {
    console.log('left', this.props.isnowlogin)
    return (
      <>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item key="movieList">
            <a href="/movieList">Movie List</a>
          </Menu.Item>
          {/* <SubMenu title={<span>Blogs</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu> */}
          {this.props.isnowlogin && (
            <Menu.Item key="alipay">
              <a href="/checkTicket">Check Ticket Details</a>
            </Menu.Item>
          )}
        </Menu>
      </>
    );
  }
}
export default LeftMenu;
