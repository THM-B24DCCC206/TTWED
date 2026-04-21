import React from 'react';
import { Layout, Menu } from 'antd';
import { history } from 'umi';

const { Header, Content } = Layout;

const BoCucBlog = (props) => {
  const { children } = props;
  const duongDan = history.location.pathname;

const items = [
  { key: '/th07/trang-chu', label: 'Trang chủ' },
  { key: '/th07/gioi-thieu', label: 'Giới thiệu' },
  { key: '/th07/quan-ly-bai-viet', label: 'Quản lý bài viết' },
  { key: '/th07/quan-ly-the', label: 'Quản lý thẻ' },
];
  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[duongDan]}
          items={items}
          onClick={({ key }) => history.push(key)}
        />
      </Header>

      <Content style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: 24 }}>
        {children}
      </Content>
    </Layout>
  );
};

export default BoCucBlog;