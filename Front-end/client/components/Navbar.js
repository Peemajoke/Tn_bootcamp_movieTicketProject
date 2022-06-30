import React, { Component } from "react";
import LeftMenu from "./left";
import RightMenu from "./right";
import { Drawer, Button } from "antd";
import "antd/dist/antd.css";
import Cookies from 'js-cookie'

class Navbar extends Component {
  state = {
    current: "mail",
    visible: false,
    isLogin: false
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    // console.log("cookie", Cookies.get('token'))
    if (Cookies.get('token')===undefined || Cookies.get('token')=='null') {
      this.setState({
        isLogin: false,
      });
    } 
    else if(Cookies.get('token')!==undefined) {
      this.setState({
        isLogin: true,
      });
    }
    // console.log("isLogin", this.state.isLogin)
    // console.log(Cookies.get('token'))
  }

  render() {
    return (
      <nav className="menuBar">
        <div className="logo">
          <a href="/">S Major F</a>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            {/* <LeftMenu isnowlogin={this.state.isLogin}/> */}
            <LeftMenu isnowlogin={this.state.isLogin}/>
          </div>
          <div className="rightMenu">
            <RightMenu isnowlogin={this.state.isLogin}/>
          </div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn" />
          </Button>
          {/* <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer> */}
        </div>
      </nav>
    );
  }
}
export default Navbar;
