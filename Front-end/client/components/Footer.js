import React, { Component } from "react";
import { Breadcrumb, Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

class Navbar extends Component {
  render() {
    return (
      <div>
        <Layout className="layout">
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default Navbar;
