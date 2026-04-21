import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'umi';

const { Header, Content, Footer } = Layout;

const BoCucNguoiDoc = ({ children }) => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 50px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '40px' }}>
          <Link to="/">My Blog</Link>
        </div>
        <Menu 
          mode="horizontal" 
          selectedKeys={[location.pathname]} 
          style={{ flex: 1, borderBottom: 'none' }}
        >
          <Menu.Item key="/">
            <Link to="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="/gioi-thieu">
            <Link to="/gioi-thieu">Giới thiệu</Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: '24px 50px', marginTop: 24, flex: 1 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 380, borderRadius: '8px' }}>
          {children}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        My Personal Blog ©2026 Created with React & Ant Design
      </Footer>
    </Layout>
  );
};

export default BoCucNguoiDoc;