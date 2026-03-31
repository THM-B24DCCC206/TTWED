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
    const don = getDon();
    const clb = getCLB();

    setStats({
      totalCLB: clb.length,
      pending: don.filter((d) => d.trangThai === 'Pending').length,
      approved: don.filter((d) => d.trangThai === 'Approved').length,
      rejected: don.filter((d) => d.trangThai === 'Rejected').length,
    });

    const grouped = Object.values(
      don.reduce((acc: any, d) => {
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
      <div style={{ marginBottom: '32px' }}>
        <Title level={2} style={{ margin: 0, color: '#1f2937' }}>
          Dashboard
        </Title>
        <Paragraph style={{ color: '#6b7280', margin: '8px 0 0 0' }}>
          Tổng quan hệ thống quản lý CLB và đơn đăng ký
        </Paragraph>
      </div>

      {/* Stats Cards */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              overflow: 'hidden',
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Paragraph style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '14px' }}>
                Tổng CLB
              </Paragraph>
              <Title style={{ color: 'white', margin: '12px 0 0 0' }}>
                {stats.totalCLB}
              </Title>
              <div
                style={{
                  marginTop: '8px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '1px',
                }}
              />
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
              overflow: 'hidden',
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Paragraph style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '14px' }}>
                Chờ Duyệt
              </Paragraph>
              <Title style={{ color: 'white', margin: '12px 0 0 0' }}>
                {stats.pending}
              </Title>
              <div
                style={{
                  marginTop: '8px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '1px',
                }}
              />
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
              overflow: 'hidden',
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Paragraph style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '14px' }}>
                Đã Duyệt
              </Paragraph>
              <Title style={{ color: 'white', margin: '12px 0 0 0' }}>
                {stats.approved}
              </Title>
              <div
                style={{
                  marginTop: '8px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '1px',
                }}
              />
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
              overflow: 'hidden',
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Paragraph style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '14px' }}>
                Từ Chối
              </Paragraph>
              <Title style={{ color: 'white', margin: '12px 0 0 0' }}>
                {stats.rejected}
              </Title>
              <div
                style={{
                  marginTop: '8px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '1px',
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Số Lượng Đơn Theo CLB - Table */}
        bordered={false}
        style={{ borderRadius: '12px', marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
        bodyStyle={{ padding: '24px' }}
      >
        <Title level={4} style={{ margin: '0 0 24px 0', color: '#1f2937' }}>
          Số Lượng Đơn Theo CLB
        </Title>
        {chartData.length === 0 ? (
          <Paragraph style={{ textAlign: 'center', color: '#9ca3af' }}>
            Chưa có dữ liệu
          </Paragraph>
        ) : (
          <div>
            {/* Legend */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, backgroundColor: '#faad14', borderRadius: 2 }} />
                <span style={{ fontSize: 13, color: '#6b7280' }}>Chờ Duyệt</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, backgroundColor: '#52c41a', borderRadius: 2 }} />
                <span style={{ fontSize: 13, color: '#6b7280' }}>Đã Duyệt</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, backgroundColor: '#ff4d4f', borderRadius: 2 }} />
                <span style={{ fontSize: 13, color: '#6b7280' }}>Từ Chối</span>
              </div>
            </div>

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 600, color: '#1f2937', fontSize: 13 }}>
                    CLB
                  </th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 600, color: '#1f2937', fontSize: 13 }}>
                    Chờ Duyệt
                  </th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 600, color: '#1f2937', fontSize: 13 }}>
                    Đã Duyệt
                  </th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 600, color: '#1f2937', fontSize: 13 }}>
                    Từ Chối
                  </th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 600, color: '#1f2937', fontSize: 13 }}>
                    Tổng
                  </th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, idx) => {
                  const total = item.Pending + item.Approved + item.Rejected;
                  const maxVal = Math.max(item.Pending, item.Approved, item.Rejected, 1);
                  return (
                    <tr
                      key={item.clb}
                      style={{
                        borderBottom: '1px solid #e5e7eb',
                        backgroundColor: idx % 2 === 0 ? '#f9fafb' : '#fff',
                      }}
                    >
                      <td style={{ padding: '12px 8px', color: '#1f2937', fontWeight: 500, fontSize: 13 }}>
                        {item.clb}
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                        <div
                          style={{
                            display: 'inline-block',
                            backgroundColor: '#faad14',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: 13,
                            fontWeight: 600,
                            minWidth: 40,
                          }}
                        >
                          {item.Pending}
                        </div>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                        <div
                          style={{
                            display: 'inline-block',
                            backgroundColor: '#52c41a',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: 13,
                            fontWeight: 600,
                            minWidth: 40,
                          }}
                        >
                          {item.Approved}
                        </div>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                        <div
                          style={{
                            display: 'inline-block',
                            backgroundColor: '#ff4d4f',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: 13,
                            fontWeight: 600,
                            minWidth: 40,
                          }}
                        >
                          {item.Rejected}
                        </div>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 600, color: '#1f2937' }}>
                        {total}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}