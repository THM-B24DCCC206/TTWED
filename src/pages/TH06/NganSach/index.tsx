import React, { useState, useEffect } from 'react';
import { Card, Alert, InputNumber, Typography, Row, Col, Statistic, Space, Divider } from 'antd';
import Chart from 'react-apexcharts';
import { WalletOutlined, PieChartOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { getItinerary } from '../DuLieuGoc/storage';

const { Title, Text } = Typography;

const NganSach = () => {
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [maxBudget, setMaxBudget] = useState<number>(5000000);

  useEffect(() => {
    setItinerary(getItinerary());
  }, []);

  const totalFood = itinerary.reduce((sum, item) => sum + (item.costs?.food || 0), 0);
  const totalAccommodation = itinerary.reduce((sum, item) => sum + (item.costs?.accommodation || 0), 0);
  const totalTransport = itinerary.reduce((sum, item) => sum + (item.costs?.transport || 0), 0);
  const totalCost = totalFood + totalAccommodation + totalTransport;

  const isOverBudget = totalCost > maxBudget;

  const chartSeries = [totalFood, totalAccommodation, totalTransport];
  const chartOptions = {
    labels: ['Ăn uống', 'Lưu trú', 'Di chuyển'],
    colors: ['#1890ff', '#52c41a', '#fa8c16'], // Màu Ant Design chuẩn
    legend: { position: 'bottom' as any, fontSize: '14px' },
    dataLabels: { enabled: true, formatter: (val: any) => val.toFixed(1) + '%' },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Tổng chi',
              formatter: () => `${totalCost.toLocaleString()} đ`
            }
          }
        }
      }
    }
  };

  return (
    <div style={{ padding: '24px 32px', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* HEADER SECTION */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2}><WalletOutlined style={{ color: '#52c41a' }} /> Quản lý Ngân sách Chuyến đi</Title>
        <Text type="secondary">Theo dõi chi tiết chi phí và kiểm soát hạn mức chi tiêu của bạn.</Text>
      </div>

      <Row gutter={[24, 24]}>

        <Col xs={24} lg={9}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Card style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: 'none' }}>
              <div style={{ marginBottom: 16 }}>
                <Text strong style={{ fontSize: 16 }}>Thiết lập ngân sách tối đa</Text>
              </div>
              <InputNumber
                min={0}
                step={500000}
                value={maxBudget}
                onChange={(val) => setMaxBudget(val || 0)}
                style={{ width: '100%', borderRadius: 8, height: 40, display: 'flex', alignItems: 'center' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                addonAfter="VNĐ"
              />
              <Divider style={{ margin: '20px 0' }} />
              
              {totalCost === 0 ? (
                <Alert message="Chưa có dữ liệu chi phí" type="info" showIcon />
              ) : isOverBudget ? (
                <Alert
                  message="Vượt ngân sách!"
                  description={`Bạn đang chi lố ${(totalCost - maxBudget).toLocaleString()} VNĐ.`}
                  type="error"
                  showIcon
                  icon={<WarningOutlined />}
                  style={{ borderRadius: 8 }}
                />
              ) : (
                <Alert
                  message="Ngân sách an toàn"
                  description="Mọi thứ vẫn nằm trong tầm kiểm soát."
                  type="success"
                  showIcon
                  icon={<CheckCircleOutlined />}
                  style={{ borderRadius: 8 }}
                />
              )}
            </Card>

            <Card title="Phân bổ chi tiết" style={{ borderRadius: 12, border: 'none' }}>
              <Statistic 
                title="TỔNG CHI PHÍ HIỆN TẠI" 
                value={totalCost} 
                suffix="VNĐ" 
                valueStyle={{ color: isOverBudget ? '#cf1322' : '#3f8600', fontWeight: 'bold', fontSize: 28 }} 
              />
              <Divider style={{ margin: '12px 0' }} />
              <Row gutter={16}>
                <Col span={12}><Statistic title="Ăn uống" value={totalFood} valueStyle={{ fontSize: 16 }} /></Col>
                <Col span={12}><Statistic title="Lưu trú" value={totalAccommodation} valueStyle={{ fontSize: 16 }} /></Col>
                <Col span={24} style={{ marginTop: 12 }}><Statistic title="Di chuyển" value={totalTransport} valueStyle={{ fontSize: 16 }} /></Col>
              </Row>
            </Card>
          </Space>
        </Col>


        <Col xs={24} lg={15}>
          <Card 
            title={<span><PieChartOutlined /> Biểu đồ phân tích chi phí</span>} 
            style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: 'none', height: '100%' }}
          >
            {totalCost > 0 ? (
              <div style={{ padding: '20px 0' }}>
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                  width="100%"
                  height={400}
                />
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '100px 0', color: '#bfbfbf' }}>
                <PieChartOutlined style={{ fontSize: 64, marginBottom: 16, display: 'block' }} />
                <Text type="secondary">Thêm địa điểm vào lịch trình để xem phân tích chi phí</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NganSach;