import React, { Component } from "react";
import { Breadcrumb, Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

class Navbar extends Component {
  render() {
    return (
      <div>
        <Layout className="layout">
          <Footer style={{ textAlign: "center" }}>
            S Major F ©2022 Created by Peem
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default Navbar;
