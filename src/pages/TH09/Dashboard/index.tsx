import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, List, Tag, Space, Badge } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getTasks } from '../utils/storage';
import type { TaskItem } from '../utils/storage';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [stats, setStats] = useState({ total: 0, inprogress: 0, done: 0, overdue: 0 });

  useEffect(() => {
    const data = getTasks();
    setTasks(data);
    
    setStats({
      total: data.length,
      inprogress: data.filter((t: TaskItem) => t.status === 'inprogress').length,
      done: data.filter((t: TaskItem) => t.status === 'done').length,
      overdue: data.filter((t: TaskItem) => t.status !== 'done' && moment(t.deadline).isBefore(moment(), 'day')).length
    });
  }, []);

  const upcomingTasks = tasks
    .filter(t => t.status !== 'done')
    .sort((a, b) => moment(a.deadline).unix() - moment(b.deadline).unix())
    .slice(0, 5);

  const cardStyle = {
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    border: 'none',
  };

  return (
    <div style={{ padding: '24px', background: '#f5f7fa', minHeight: 'calc(100vh - 100px)' }}>
      <Title level={3} style={{ marginBottom: 24, color: '#262626' }}>
         Quản lý công việc
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={cardStyle} bodyStyle={{ padding: '20px' }}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Space align="center">
                <Badge color="#1890ff" />
                <Text type="secondary" style={{ fontSize: '14px' }}>Tổng số công việc</Text>
              </Space>
              <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#262626' }}>{stats.total}</Text>
            </Space>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={cardStyle} bodyStyle={{ padding: '20px' }}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Space align="center">
                <Badge color="#fa8c16" />
                <Text type="secondary" style={{ fontSize: '14px' }}>Đang thực hiện</Text>
              </Space>
              <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#262626' }}>{stats.inprogress}</Text>
            </Space>
          </Card>
        </Col>


        <Col xs={24} sm={12} lg={6}>
          <Card style={cardStyle} bodyStyle={{ padding: '20px' }}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Space align="center">
                <Badge color="#52c41a" />
                <Text type="secondary" style={{ fontSize: '14px' }}>Đã hoàn thành</Text>
              </Space>
              <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#262626' }}>{stats.done}</Text>
            </Space>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={cardStyle} bodyStyle={{ padding: '20px' }}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Space align="center">
                <Badge color="#f5222d" />
                <Text type="secondary" style={{ fontSize: '14px' }}>Đang quá hạn</Text>
              </Space>
              <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#262626' }}>{stats.overdue}</Text>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '32px' }}>
        <Col span={24}>
          <Card 
            title={
              <Space>
                <CalendarOutlined style={{ color: '#8c8c8c' }} /> 
                <span style={{ fontSize: '16px' }}>Công việc sắp tới & Quá hạn</span>
              </Space>
            } 
            style={cardStyle}
          >
            <List
              itemLayout="horizontal"
              dataSource={upcomingTasks}
              locale={{ emptyText: 'Tuyệt vời! Bạn không có task nào đang chờ.' }}
              renderItem={item => {
                const isOverdue = moment(item.deadline).isBefore(moment(), 'day');
                return (
                  <List.Item
                    actions={[
                      <Tag color={item.priority === 'Cao' ? 'red' : item.priority === 'Trung bình' ? 'orange' : 'green'}>
                        {item.priority}
                      </Tag>
                    ]}
                  >
                    <List.Item.Meta
                      title={<Text style={{ fontSize: '16px', color: isOverdue ? '#f5222d' : '#262626' }}>{item.title}</Text>}
                      description={
                        <Space size="small" style={{ marginTop: '4px' }}>
                          <Tag color={isOverdue ? 'error' : 'default'}>
                            Deadline: {moment(item.deadline).format('DD/MM/YYYY')}
                          </Tag>
                          <Text type="secondary" style={{ fontSize: '13px' }}>
                            {item.status === 'todo' ? 'Cần làm' : 'Đang làm'}
                          </Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;