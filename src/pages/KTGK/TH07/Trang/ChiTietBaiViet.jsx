import React, { useEffect, useState } from 'react';
import { Typography, Tag, Divider, Button } from 'antd';
import { ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { useParams, history } from 'umi';

const { Title, Paragraph } = Typography;

const ChiTietBaiViet = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [views, setViews] = useState(120);

  // Tự động tăng lượt xem khi component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setViews(prev => prev + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()} style={{ marginBottom: 16 }}>
        Quay lại
      </Button>

      <Title>Chi tiết bài viết {id}</Title>
      
      <div style={{ color: 'gray', marginBottom: 24 }}>
        <span>Tác giả: Admin</span> | <span>Ngày đăng: 2026-04-21</span> | <span style={{ marginLeft: 8 }}><EyeOutlined /> {views} lượt xem</span>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Tag color="blue">React</Tag>
        <Tag color="blue">JavaScript</Tag>
      </div>

      <img 
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" 
        alt="cover" 
        style={{ width: '100%', borderRadius: 8, marginBottom: 24 }} 
      />

      <Typography>
        <Paragraph>
          Đây là nội dung bài viết. Do chưa cài thư viện Markdown nên tao render tạm bằng Text thường.
          Thực tế mày có thể dùng thư viện `react-markdown` để bọc phần nội dung này lại.
        </Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Paragraph>
      </Typography>

      <Divider />
      <Title level={4}>Bài viết liên quan</Title>
      <p>(Chỗ này mày có thể gọi lại component TheBaiViet nhét vào một cái List nhỏ)</p>
    </div>
  );
};

export default ChiTietBaiViet;