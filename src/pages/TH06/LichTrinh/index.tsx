import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Row, Col, Statistic, message, Tag, Timeline, Empty, Space } from 'antd';
import { 
  DeleteOutlined, 
  MenuOutlined, 
  ClockCircleOutlined, 
  CarOutlined, 
  CarryOutOutlined,
  EnvironmentOutlined 
} from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getItinerary, saveItinerary } from '../DuLieuGoc/storage';

const { Text, Title } = Typography;

const LichTrinh = () => {
  const [itinerary, setItinerary] = useState<any[]>([]);
  const TRAVEL_TIME_FIXED = 30; 

  useEffect(() => {
    setItinerary(getItinerary());
  }, []);

  const handleRemove = (id: string) => {
    const newData = itinerary.filter(item => item.id !== id);
    setItinerary(newData);
    saveItinerary(newData);
    message.success('Đã xóa khỏi lịch trình');
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(itinerary);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setItinerary(items);
    saveItinerary(items);
  };


  const totalVisitTime = itinerary.reduce((sum, item) => sum + (item.timeRequired || 0), 0);
  const totalTravelTime = itinerary.length > 1 ? (itinerary.length - 1) * TRAVEL_TIME_FIXED : 0;
  const totalBudget = itinerary.reduce((sum, item) => {
    const costs = item.costs || { food: 0, accommodation: 0, transport: 0 };
    return sum + (costs.food + costs.accommodation + costs.transport);
  }, 0);

  return (
    <div style={{ padding: '24px 32px', background: '#f0f2f5', minHeight: '100vh' }}>
  
      <div style={{ marginBottom: 24 }}>
        <Title level={2}><CarryOutOutlined style={{ color: '#1890ff' }} /> Lộ trình du lịch của bạn</Title>
        <Text type="secondary" style={{ fontSize: 16 }}>
          Sắp xếp thứ tự ưu tiên bằng cách kéo thả và theo dõi thời gian di chuyển dự kiến.
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        
        <Col xs={24} lg={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: 'none' }}>
              <Statistic 
                title="Tổng ngân sách dự kiến" 
                value={totalBudget} 
                suffix="VNĐ" 
                valueStyle={{ color: '#cf1322', fontWeight: 'bold', fontSize: 28 }} 
              />
            </Card>

            <Card style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: 'none' }}>
              <Statistic 
                title="Tổng thời gian hành trình" 
                value={totalVisitTime + totalTravelTime} 
                suffix="phút" 
                prefix={<ClockCircleOutlined />}
              />
              <div style={{ marginTop: 12 }}>
                <Space size="small">
                  <Tag color="blue" style={{ borderRadius: 4 }}>Tham quan: {totalVisitTime}p</Tag>
                  <Tag color="orange" style={{ borderRadius: 4 }}>Di chuyển: {totalTravelTime}p</Tag>
                </Space>
              </div>
            </Card>

            <Card title="💡 Mẹo nhỏ" style={{ borderRadius: 12, border: 'none' }}>
              <Text type="secondary" italic>
                Thời gian di chuyển được tính trung bình 30 phút giữa mỗi điểm đến. Bạn nên cân nhắc thời gian tắc đường vào giờ cao điểm nhé!
              </Text>
            </Card>
          </div>
        </Col>

        
        <Col xs={24} lg={16}>
          <Card 
            title={<Title level={4} style={{ margin: 0 }}><MenuOutlined /> Chi tiết lộ trình</Title>} 
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: 'none' }}
          >
            {itinerary.length === 0 ? (
              <Empty 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
                description="Bạn chưa chọn điểm đến nào. Hãy quay lại Trang Chủ nhé!" 
              />
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="itinerary-list">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Timeline mode="left" style={{ padding: '20px 0' }}>
                        {itinerary.map((item, index) => (
                          <Timeline.Item 
                            key={item.id} 
                            dot={<EnvironmentOutlined style={{ fontSize: '18px', color: '#1890ff' }} />}
                          >
                            <Draggable draggableId={item.id} index={index}>
                              {(dragProvided) => (
                                <div
                                  ref={dragProvided.innerRef}
                                  {...dragProvided.draggableProps}
                                  style={{
                                    ...dragProvided.draggableProps.style,
                                    marginBottom: 16,
                                    background: '#fff',
                                    border: '1px solid #f0f0f0',
                                    borderRadius: 12,
                                    padding: '16px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                                    transition: 'all 0.3s'
                                  }}
                                >
                                  <Row align="middle" gutter={16}>
                                    <Col flex="none">
                                      <div {...dragProvided.dragHandleProps}>
                                        <MenuOutlined style={{ color: '#d9d9d9', cursor: 'grab', fontSize: 18 }} />
                                      </div>
                                    </Col>
                                    <Col flex="none">
                                      <img src={item.image} alt="thumb" style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 8 }} />
                                    </Col>
                                    <Col flex="auto">
                                      <Text strong style={{ fontSize: 16, display: 'block' }}>{index + 1}. {item.name}</Text>
                                      <Space direction="vertical" size={0}>
                                        <Text type="secondary" style={{ fontSize: 13 }}>Loại hình: {item.type}</Text>
                                        <Text style={{ fontSize: 13, color: '#1890ff' }}>Thời gian: {item.timeRequired} phút</Text>
                                      </Space>
                                    </Col>
                                    <Col flex="none">
                                      <Button 
                                        type="text" 
                                        danger 
                                        icon={<DeleteOutlined />} 
                                        onClick={() => handleRemove(item.id)} 
                                      />
                                    </Col>
                                  </Row>
                                  
                                  
                                  {index < itinerary.length - 1 && (
                                    <div style={{ marginTop: 12, padding: '8px 16px', background: '#e6f7ff', borderRadius: 8, borderLeft: '4px solid #1890ff' }}>
                                      <Text style={{ fontSize: 12, color: '#0050b3', fontWeight: 500 }}>
                                        <CarOutlined /> Di chuyển chặng tiếp theo: ~{TRAVEL_TIME_FIXED} phút
                                      </Text>
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          </Timeline.Item>
                        ))}
                      </Timeline>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LichTrinh;