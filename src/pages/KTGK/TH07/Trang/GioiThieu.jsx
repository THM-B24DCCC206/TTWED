import React from 'react';
import { Card, Avatar, Typography, Divider, Space } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const GioiThieu = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
      <Card style={{ width: 600, textAlign: 'center' }}>
        <Avatar size={120} src="https://joeschmoe.io/api/v1/random" />
        <Title level={3} style={{ marginTop: 16 }}>Nguyễn Văn A</Title>
        <Paragraph type="secondary">Sinh viên IT đam mê code dạo & cầu lông</Paragraph>
        
        <Divider />
        
        <Title level={5} style={{ textAlign: 'left' }}>Tiểu sử</Title>
        <Paragraph style={{ textAlign: 'left' }}>
          Đang theo học chuyên ngành Software Engineering. Thích xây dựng các ứng dụng web tối ưu và đẹp mắt bằng hệ sinh thái ReactJS.
        </Paragraph>

        <Title level={5} style={{ textAlign: 'left' }}>Kỹ năng</Title>
        <Paragraph style={{ textAlign: 'left' }}>
          ReactJS, Ant Design Pro, JavaScript, NodeJS...
        </Paragraph>

        <Divider />
        
        <Space size="large">
          <a href="#"><GithubOutlined style={{ fontSize: 24, color: '#000' }} /></a>
          <a href="#"><LinkedinOutlined style={{ fontSize: 24, color: '#0077b5' }} /></a>
          <a href="#"><MailOutlined style={{ fontSize: 24, color: '#d44638' }} /></a>
        </Space>
      </Card>
    </div>
  );
};

export default GioiThieu;