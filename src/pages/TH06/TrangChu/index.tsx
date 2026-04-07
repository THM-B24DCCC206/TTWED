import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Rate, Tag, Button, Select, Space, message, Typography, Empty, Divider } from 'antd';
import { 
  FilterOutlined, 
  SortAscendingOutlined, 
  EnvironmentOutlined, 
  PlusCircleOutlined,
  CompassOutlined
} from '@ant-design/icons';
import { getDestinations, getItinerary, saveItinerary } from '../DuLieuGoc/storage';

const { Meta } = Card;
const { Text, Title } = Typography;
const { Option } = Select;

const TrangChu = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('none');

  useEffect(() => {
    const data = getDestinations();
    setDestinations(data);
    setFilteredData(data);
  }, []);

  const getTotalCost = (dest: any) => 
    (dest.costs?.food || 0) + (dest.costs?.accommodation || 0) + (dest.costs?.transport || 0);

  useEffect(() => {
    let result = [...destinations];

    if (filterType !== 'all') {
      result = result.filter(d => d.type === filterType);
    }

    if (sortOption === 'price_asc') {
      result.sort((a, b) => getTotalCost(a) - getTotalCost(b));
    } else if (sortOption === 'price_desc') {
      result.sort((a, b) => getTotalCost(b) - getTotalCost(a));
    } else if (sortOption === 'rating_desc') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredData(result);
  }, [filterType, sortOption, destinations]);

  const handleAddItinerary = (dest: any) => {
    const currentItinerary = getItinerary();
    const isExist = currentItinerary.find((item: any) => item.id === dest.id);
    
    if (isExist) {
      message.warning('Điểm đến này đã có trong lịch trình!');
      return;
    }
    
    currentItinerary.push(dest);
    saveItinerary(currentItinerary);
    message.success(`Đã thêm ${dest.name} vào lịch trình!`);
  };

  return (
    <div style={{ padding: '24px 32px', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* HEADER SECTION */}
      <div style={{ marginBottom: 32, background: '#fff', padding: '24px 32px', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <Title level={2} style={{ marginTop: 0, color: '#1890ff' }}>
          <CompassOutlined /> Khám phá điểm đến tuyệt vời
        </Title>
        <Text type="secondary" style={{ fontSize: 16 }}>
          Bắt đầu lên kế hoạch cho chuyến đi trong mơ của bạn ngay hôm nay!
        </Text>
        
        <Divider style={{ margin: '20px 0' }} />

        <Space style={{ flexWrap: 'wrap' }} size="large">
          <Space>
            <FilterOutlined style={{ color: '#8c8c8c' }} />
            <Text strong>Loại hình:</Text>
            <Select 
              defaultValue="all" 
              onChange={value => setFilterType(value)}
              bordered={false}
              style={{ width: 180, backgroundColor: '#f5f5f5', borderRadius: 6 }}
            >
              <Option value="all">Tất cả trải nghiệm</Option>
              <Option value="biển">Du lịch Biển</Option>
              <Option value="núi">Khám phá Núi</Option>
              <Option value="thành phố">City Tour</Option>
            </Select>
          </Space>

          <Space>
            <SortAscendingOutlined style={{ color: '#8c8c8c' }} />
            <Text strong>Sắp xếp:</Text>
            <Select 
              defaultValue="none" 
              onChange={value => setSortOption(value)}
              bordered={false}
              style={{ width: 220, backgroundColor: '#f5f5f5', borderRadius: 6 }}
            >
              <Option value="none">Mặc định</Option>
              <Option value="price_asc">Giá: Thấp đến Cao</Option>
              <Option value="price_desc">Giá: Cao xuống Thấp</Option>
              <Option value="rating_desc">Đánh giá: Cao xuống Thấp</Option>
            </Select>
          </Space>
        </Space>
      </div>


      {filteredData.length === 0 ? (
        <div style={{ background: '#fff', padding: 50, borderRadius: 12, textAlign: 'center' }}>
          <Empty description="Không tìm thấy điểm đến nào phù hợp." />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {filteredData.map(dest => {
            const totalCost = getTotalCost(dest);
            let tagColor = 'blue';
            if (dest.type === 'núi') tagColor = 'green';
            if (dest.type === 'thành phố') tagColor = 'orange';
            
            return (
              <Col xs={24} sm={12} md={8} xl={6} key={dest.id}>
                <Card
                  hoverable
                  style={{ borderRadius: 16, overflow: 'hidden', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  bodyStyle={{ padding: 20 }}
                  cover={
                    <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      <img 
                        alt={dest.name} 
                        src={dest.image} 
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }} 
                      />
                      <Tag 
                        color={tagColor} 
                        style={{ position: 'absolute', top: 12, right: 8, borderRadius: 10 }}
                      >
                        {dest.type.toUpperCase()}
                      </Tag>
                    </div>
                  }
                >
                  <Title level={4} style={{ marginBottom: 8, fontSize: 18 }}>
                    <EnvironmentOutlined style={{ color: '#ff4d4f', marginRight: 4 }} />
                    {dest.name}
                  </Title>
                  
                  <div style={{ marginBottom: 12 }}>
                    <Rate disabled defaultValue={dest.rating} style={{ fontSize: 14 }} />
                  </div>

                  <div style={{ background: '#fafafa', padding: '10px', borderRadius: 8, marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="secondary">Thời gian:</Text>
                      <Text strong>{dest.timeRequired} phút</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <Text type="secondary">Dự kiến:</Text>
                      <Text strong style={{ color: '#cf1322' }}>{totalCost.toLocaleString('vi-VN')} đ</Text>
                    </div>
                  </div>

                  <Button 
                    type="primary" 
                    icon={<PlusCircleOutlined />} 
                    block 
                    style={{ borderRadius: 8, height: 40 }}
                    onClick={() => handleAddItinerary(dest)}
                  >
                    Thêm vào Lịch trình
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default TrangChu;