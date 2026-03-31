import { Card, Col, Row, Typography, Divider, Segmented, Space, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { getDon, getCLB } from '../services/th05Service';

const { Title, Paragraph } = Typography;

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCLB: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [chartData, setChartData] = useState<any[]>([]);

  const load = () => {
    const don = getDon() || [];
    const clb = getCLB() || [];

    setStats({
      totalCLB: clb.length,
      pending: don.filter((d: any) => d.trangThai === 'Pending').length,
      approved: don.filter((d: any) => d.trangThai === 'Approved').length,
      rejected: don.filter((d: any) => d.trangThai === 'Rejected').length,
    });

    const grouped = Object.values(
      don.reduce((acc: any, d: any) => {
        if (!acc[d.clb]) {
          acc[d.clb] = {
            clb: d.clb,
            Pending: 0,
            Approved: 0,
            Rejected: 0,
          };
        }
        acc[d.clb][d.trangThai]++;
        return acc;
      }, {})
    );

    setChartData(grouped);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: '32px', background: '#f7f8fa', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Title level={2} style={{ margin: 0, color: '#1f2937' }}>
          Dashboard
        </Title>
        <Paragraph style={{ color: '#6b7280', margin: '8px 0 0 0' }}>
          Tổng quan hệ thống quản lý CLB và đơn đăng ký
        </Paragraph>
      </div>

      {/* Stats Cards - Đã bọc Row và sửa lỗi thẻ */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Paragraph style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Tổng CLB</Paragraph>
              <Title level={2} style={{ color: 'white', margin: '8px 0' }}>{stats.totalCLB}</Title>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Paragraph style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Chờ Duyệt</Paragraph>
              <Title level={2} style={{ color: 'white', margin: '8px 0' }}>{stats.pending}</Title>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Paragraph style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Đã Duyệt</Paragraph>
              <Title level={2} style={{ color: 'white', margin: '8px 0' }}>{stats.approved}</Title>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              color: 'white',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Paragraph style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Từ Chối</Paragraph>
              <Title level={2} style={{ color: 'white', margin: '8px 0' }}>{stats.rejected}</Title>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Table Section */}
      <Card
        bordered={false}
        style={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
      >
        <Title level={4} style={{ marginBottom: '24px' }}>Số Lượng Đơn Theo CLB</Title>
        
        {chartData.length === 0 ? (
          <Paragraph style={{ textAlign: 'center', color: '#9ca3af' }}>Chưa có dữ liệu</Paragraph>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>CLB</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Chờ Duyệt</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Đã Duyệt</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Từ Chối</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, idx) => (
                  <tr key={item.clb} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: idx % 2 === 0 ? '#f9fafb' : '#fff' }}>
                    <td style={{ padding: '12px', fontWeight: 500 }}>{item.clb}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ backgroundColor: '#faad14', color: 'white', padding: '4px 12px', borderRadius: '4px' }}>{item.Pending}</span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ backgroundColor: '#52c41a', color: 'white', padding: '4px 12px', borderRadius: '4px' }}>{item.Approved}</span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ backgroundColor: '#ff4d4f', color: 'white', padding: '4px 12px', borderRadius: '4px' }}>{item.Rejected}</span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                      {item.Pending + item.Approved + item.Rejected}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}