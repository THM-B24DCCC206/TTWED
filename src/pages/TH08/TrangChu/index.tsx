import React from 'react';
import { Row, Col, Card, Statistic, Timeline, Tag, Typography } from 'antd';
import { Column, Line } from '@ant-design/plots';
import { FireOutlined, CalendarOutlined, TrophyOutlined, RiseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const TrangChu: React.FC = () => {
  // Dữ liệu Mock
  const workoutData = [
    { week: 'Tuần 1', sessions: 3 },
    { week: 'Tuần 2', sessions: 4 },
    { week: 'Tuần 3', sessions: 2 },
    { week: 'Tuần 4', sessions: 6 }, // Tăng lên tí nhìn biểu đồ cho cháy
  ];

  const weightData = [
    { date: '01/04', weight: 75 },
    { date: '08/04', weight: 74.5 },
    { date: '15/04', weight: 73.8 },
    { date: '22/04', weight: 73.0 },
    { date: '29/04', weight: 72.2 },
  ];

  // Config biểu đồ cột (Thêm bo góc cột và đổi màu)
  const columnConfig: any = {
    data: workoutData,
    xField: 'week',
    yField: 'sessions',
    color: '#1890ff',
    columnStyle: {
      radius: [4, 4, 0, 0], // Bo góc trên của cột
    },
    label: { position: 'middle', style: { fill: '#FFFFFF', opacity: 0.8 } },
  };

  // Config biểu đồ đường (Thêm smooth và area)
  const lineConfig: any = {
    data: weightData,
    xField: 'date',
    yField: 'weight',
    smooth: true, // Đường uốn lượn mượt mà
    color: '#52c41a',
    point: { size: 5, shape: 'circle', style: { fill: '#fff', stroke: '#52c41a', lineWidth: 2 } },
  };

  // Style dùng chung cho Card để nhìn nổi bật hơn
  const cardStyle = { borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
  const iconWrapperStyle = { 
    padding: '12px', 
    borderRadius: '50%', 
    display: 'inline-flex', 
    marginRight: '12px' 
  };

  return (
    <div style={{ padding: 24, background: '#f4f7fe', minHeight: '100vh' }}>
      
      {/* Banner chào mừng phong cách Cinematic/Sporty */}
      <div style={{ 
        background: 'linear-gradient(135deg, #001529 0%, #1890ff 100%)', 
        padding: '32px 40px', 
        borderRadius: 16, 
        marginBottom: 24,
        color: 'white',
        boxShadow: '0 8px 24px rgba(24, 144, 255, 0.2)'
      }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>Chào buổi sáng, Vận động viên! 🏸</Title>
        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
          Hôm nay là một ngày tuyệt vời để phá vỡ giới hạn của bản thân. Tiếp tục duy trì phong độ nhé!
        </Text>
      </div>

      {/* 4 Thẻ chỉ số nâng cấp */}
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Card bordered={false} style={cardStyle} bodyStyle={{ padding: '20px 24px' }}>
            <Statistic 
              title={<span style={{ fontWeight: 600, color: '#8c8c8c' }}>TỔNG BUỔI TẬP</span>} 
              value={14} 
              prefix={
                <div style={{ ...iconWrapperStyle, background: '#e6f7ff', color: '#1890ff' }}>
                  <CalendarOutlined />
                </div>
              } 
              valueStyle={{ fontWeight: 'bold', fontSize: 28 }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={cardStyle} bodyStyle={{ padding: '20px 24px' }}>
            <Statistic 
              title={<span style={{ fontWeight: 600, color: '#8c8c8c' }}>CALO ĐÃ ĐỐT</span>} 
              value={4500} 
              suffix={<span style={{ fontSize: 14, color: '#bfbfbf' }}>kcal</span>} 
              prefix={
                <div style={{ ...iconWrapperStyle, background: '#fff1f0', color: '#f5222d' }}>
                  <FireOutlined />
                </div>
              } 
              valueStyle={{ fontWeight: 'bold', fontSize: 28 }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={cardStyle} bodyStyle={{ padding: '20px 24px' }}>
            <Statistic 
              title={<span style={{ fontWeight: 600, color: '#8c8c8c' }}>STREAK HIỆN TẠI</span>} 
              value={5} 
              suffix={<span style={{ fontSize: 14, color: '#bfbfbf' }}>ngày</span>} 
              prefix={
                <div style={{ ...iconWrapperStyle, background: '#f6ffed', color: '#52c41a' }}>
                  <RiseOutlined />
                </div>
              } 
              valueStyle={{ fontWeight: 'bold', fontSize: 28 }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={cardStyle} bodyStyle={{ padding: '20px 24px' }}>
            <Statistic 
              title={<span style={{ fontWeight: 600, color: '#8c8c8c' }}>MỤC TIÊU THÁNG</span>} 
              value={80} 
              suffix={<span style={{ fontSize: 14, color: '#bfbfbf' }}>%</span>} 
              prefix={
                <div style={{ ...iconWrapperStyle, background: '#fffbe6', color: '#faad14' }}>
                  <TrophyOutlined />
                </div>
              } 
              valueStyle={{ fontWeight: 'bold', fontSize: 28 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Layout Biểu đồ & Timeline */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={16}>
          <Card title={<span style={{ fontSize: 18, fontWeight: 'bold' }}>Cường độ tập luyện</span>} bordered={false} style={cardStyle}>
            <Column {...columnConfig} height={250} />
          </Card>
          
          <Card title={<span style={{ fontSize: 18, fontWeight: 'bold' }}>Tiến độ cân nặng</span>} bordered={false} style={{ ...cardStyle, marginTop: 24 }}>
            <Line {...lineConfig} height={250} />
          </Card>
        </Col>

        {/* Timeline */}
        <Col span={8}>
          <Card title={<span style={{ fontSize: 18, fontWeight: 'bold' }}>Hoạt động gần đây</span>} bordered={false} style={{ ...cardStyle, height: '100%' }}>
            <Timeline style={{ marginTop: 16 }}>
              <Timeline.Item color="green">
                <p style={{ margin: 0, fontWeight: 500 }}>28/04/2026</p>
                <p style={{ color: '#8c8c8c', marginBottom: 8 }}>Đánh cầu lông (Cardio)</p>
                <Tag color="cyan" style={{ borderRadius: 4 }}>Đốt 450 kcal</Tag>
              </Timeline.Item>
              <Timeline.Item color="blue">
                <p style={{ margin: 0, fontWeight: 500 }}>26/04/2026</p>
                <p style={{ color: '#8c8c8c', marginBottom: 8 }}>Nâng tạ (Strength)</p>
                <Tag color="cyan" style={{ borderRadius: 4 }}>Đốt 200 kcal</Tag>
              </Timeline.Item>
              <Timeline.Item color="red">
                <p style={{ margin: 0, fontWeight: 500 }}>24/04/2026</p>
                <p style={{ color: '#8c8c8c', marginBottom: 8 }}>HIIT</p>
                <Tag color="cyan" style={{ borderRadius: 4 }}>Đốt 500 kcal</Tag>
              </Timeline.Item>
              <Timeline.Item>
                <p style={{ margin: 0, fontWeight: 500 }}>22/04/2026</p>
                <p style={{ color: '#8c8c8c', marginBottom: 8 }}>Yoga giãn cơ</p>
                <Tag color="cyan" style={{ borderRadius: 4 }}>Đốt 150 kcal</Tag>
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p style={{ margin: 0, fontWeight: 500 }}>20/04/2026</p>
                <p style={{ color: '#8c8c8c', marginBottom: 8 }}>Chạy bộ (Cardio)</p>
                <Tag color="error" style={{ borderRadius: 4 }}>Bỏ lỡ</Tag>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TrangChu;