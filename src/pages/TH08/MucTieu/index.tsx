import React, { useState } from 'react';
import { Card, Progress, Tag, Button, Segmented, Row, Col, Popconfirm, message, Typography } from 'antd';
import { DrawerForm, ProFormText, ProFormSelect, ProFormDigit, ProFormDatePicker } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

type GoalRecord = {
  id: number;
  name: string;
  type: string;
  targetValue: number;
  currentValue: number;
  deadline: string;
  status: 'In Progress' | 'Achieved' | 'Cancelled';
};

const MucTieu: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const [goals, setGoals] = useState<GoalRecord[]>([
    { id: 1, name: 'Giảm 5kg mỡ', type: 'Giảm cân', targetValue: 5, currentValue: 2, deadline: '2026-06-01', status: 'In Progress' },
    { id: 2, name: 'Chạy 10km không nghỉ', type: 'Sức bền', targetValue: 10, currentValue: 10, deadline: '2026-04-15', status: 'Achieved' },
    { id: 3, name: 'Đẩy ngực 100kg', type: 'Tăng cơ', targetValue: 100, currentValue: 70, deadline: '2026-12-31', status: 'In Progress' },
    { id: 4, name: 'Tập 5 ngày/tuần', type: 'Thói quen', targetValue: 5, currentValue: 1, deadline: '2026-05-01', status: 'Cancelled' },
  ]);

  const filteredGoals = goals.filter((g) => {
    if (filterStatus === 'All') return true;
    return g.status === filterStatus;
  });

  // Dùng tag dạng border (ghost) thay vì màu nền đặc để nhìn thanh thoát hơn
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'In Progress': return <Tag color="blue">Đang thực hiện</Tag>;
      case 'Achieved': return <Tag color="green">Đã đạt</Tag>;
      case 'Cancelled': return <Tag color="default">Đã hủy</Tag>;
      default: return <Tag>{status}</Tag>;
    }
  };

  const handleDelete = (id: number) => {
    setGoals(goals.filter((g) => g.id !== id));
    message.success('Đã xóa mục tiêu');
  };

  return (
    <div style={{ padding: 24, background: '#ffffff', minHeight: '100vh' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <Title level={3} style={{ margin: 0, color: '#262626' }}>Quản lý mục tiêu</Title>
          <Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
            Theo dõi tiến độ và các chỉ tiêu cá nhân
          </Text>
        </div>

        <DrawerForm
          title="Thêm mục tiêu mới"
          trigger={
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm mới
            </Button>
          }
          onFinish={async () => {
            message.success('Đã thêm mục tiêu');
            return true;
          }}
        >
          <ProFormText name="name" label="Tên mục tiêu" rules={[{ required: true }]} />
          <ProFormSelect
            name="type"
            label="Phân loại"
            valueEnum={{ 'Giảm cân': 'Giảm cân', 'Tăng cơ': 'Tăng cơ', 'Sức bền': 'Sức bền', 'Khác': 'Khác' }}
          />
          <Row gutter={16}>
            <Col span={12}><ProFormDigit name="targetValue" label="Mục tiêu" /></Col>
            <Col span={12}><ProFormDigit name="currentValue" label="Hiện tại" initialValue={0} /></Col>
          </Row>
          <ProFormDatePicker name="deadline" label="Hạn chót" width="100%" />
        </DrawerForm>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Segmented
          options={[
            { label: 'Tất cả', value: 'All' },
            { label: 'Đang thực hiện', value: 'In Progress' },
            { label: 'Đã đạt', value: 'Achieved' },
            { label: 'Đã hủy', value: 'Cancelled' },
          ]}
          value={filterStatus}
          onChange={(val) => setFilterStatus(val as string)}
        />
      </div>

      <Row gutter={[16, 16]}>
        {filteredGoals.map((goal) => {
          const percent = Math.round((goal.currentValue / goal.targetValue) * 100);
          
          return (
            <Col span={8} key={goal.id}>
              <Card
                bordered={true}
                style={{ borderColor: '#f0f0f0' }}
                title={goal.name}
                extra={getStatusTag(goal.status)}
                actions={[
                  <a key="edit">Sửa</a>,
                  <Popconfirm key="delete" title="Xóa?" onConfirm={() => handleDelete(goal.id)}>
                    <Text type="danger">Xóa</Text>
                  </Popconfirm>,
                ]}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text type="secondary">Phân loại:</Text>
                  <Text>{goal.type}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <Text type="secondary">Hạn chót:</Text>
                  <Text>{goal.deadline}</Text>
                </div>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">Tiến độ</Text>
                    <Text>{goal.currentValue} / {goal.targetValue}</Text>
                  </div>
                  <Progress 
                    percent={percent > 100 ? 100 : percent} 
                    showInfo={false}
                    status={goal.status === 'Achieved' ? 'success' : goal.status === 'Cancelled' ? 'exception' : 'active'} 
                    strokeColor={goal.status === 'In Progress' ? '#262626' : undefined} 
                    // Dùng màu xám đậm cho thanh tiến độ đang chạy để tạo sự tối giản
                  />
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default MucTieu;