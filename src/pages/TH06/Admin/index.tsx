import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Modal, Form, Input, InputNumber, Select, Space, 
  Popconfirm, message, Tabs, Card, Row, Col, Statistic, Tag, Upload, Typography, Divider 
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, 
  DashboardOutlined, DatabaseOutlined, BarChartOutlined, PieChartOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import Chart from 'react-apexcharts';
import { getDestinations, saveDestinations } from '../DuLieuGoc/storage';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Title, Text } = Typography;

const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const Admin = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(''); 
  const [form] = Form.useForm();

  useEffect(() => {
    setDestinations(getDestinations());
  }, []);

  const handleDelete = (id: string) => {
    const newData = destinations.filter(item => item.id !== id);
    setDestinations(newData);
    saveDestinations(newData);
    message.success('Đã xóa điểm đến khỏi hệ thống!');
  };

  const showModal = (record?: any) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue(record);
      setImageUrl(record.image || '');
    } else {
      setEditingId(null);
      form.resetFields();
      setImageUrl('');
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      let newData = [...destinations];
      const submitData = { ...values, image: imageUrl };

      if (editingId) {
        newData = newData.map(item => item.id === editingId ? { ...item, ...submitData } : item);
        message.success('Cập nhật dữ liệu thành công!');
      } else {
        const newDest = { ...submitData, id: `dest_${Date.now()}` };
        newData.push(newDest);
        message.success('Đã thêm điểm đến mới!');
      }
      setDestinations(newData);
      saveDestinations(newData);
      setIsModalVisible(false);
    });
  };

  const handleUpload = async (info: any) => {
    const file = info.file.originFileObj || info.file;
    if (file) {
      const base64 = await getBase64(file);
      setImageUrl(base64);
    }
  };

  const columns = [
    { 
      title: 'Ảnh', 
      dataIndex: 'image', 
      key: 'image',
      width: 80,
      render: (img: string) => <img src={img} alt="thumb" style={{ width: 50, height: 40, objectFit: 'cover', borderRadius: 6 }} /> 
    },
    { 
      title: 'Tên địa điểm', 
      dataIndex: 'name', 
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>
    },
    { 
      title: 'Loại hình', 
      dataIndex: 'type', 
      key: 'type', 
      render: (type: string) => {
        let color = type === 'biển' ? 'blue' : type === 'núi' ? 'green' : 'orange';
        return <Tag color={color} style={{ borderRadius: 4 }}>{type?.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Chi phí dự kiến',
      key: 'totalCost',
      render: (_: any, record: any) => {
        const total = (record.costs?.food || 0) + (record.costs?.accommodation || 0) + (record.costs?.transport || 0);
        return <Text type="danger" strong>{total.toLocaleString()} đ</Text>;
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined style={{ color: '#1890ff' }} />} onClick={() => showModal(record)} />
          <Popconfirm title="Xóa điểm đến này?" onConfirm={() => handleDelete(record.id)}>
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const chartMonthly = {
    series: [{ name: 'Lượt tạo', data: [31, 40, 28, 51, 42, 109, 100] }],
    options: {
      chart: { height: 350, type: 'area' as any, toolbar: { show: false } },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' as any },
      xaxis: { categories: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"] },
      colors: ['#1890ff']
    }
  };

  const chartCategory = {
    series: [44, 55, 13],
    options: {
      labels: ['Biển', 'Núi', 'Thành phố'],
      colors: ['#1890ff', '#52c41a', '#fa8c16'],
      legend: { position: 'bottom' as any }
    }
  };

  return (
    <div style={{ padding: '24px 32px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ margin: 0 }}><DashboardOutlined /> Quản trị Hệ thống</Title>
        <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => showModal()} style={{ borderRadius: 8 }}>
          Thêm địa điểm
        </Button>
      </div>

      <Tabs defaultActiveKey="1" className="admin-tabs" style={{ background: '#fff', padding: 24, borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        
        <TabPane tab={<span><DatabaseOutlined /> Danh sách dữ liệu</span>} key="1">
          <Table dataSource={destinations} columns={columns} rowKey="id" pagination={{ pageSize: 6 }} />
        </TabPane>

        <TabPane tab={<span><BarChartOutlined /> Báo cáo thống kê</span>} key="2">
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Card style={{ background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)', borderRadius: 12 }}>
                <Statistic title={<span style={{ color: '#fff' }}>Tổng số địa điểm</span>} value={destinations.length} valueStyle={{ color: '#fff' }} />
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)', borderRadius: 12 }}>
                <Statistic title={<span style={{ color: '#fff' }}>Lịch trình đã tạo</span>} value={1254} valueStyle={{ color: '#fff' }} />
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ background: 'linear-gradient(135deg, #faad14 0%, #d48806 100%)', borderRadius: 12 }}>
                <Statistic title={<span style={{ color: '#fff' }}>Doanh thu dự kiến</span>} value={850000000} suffix="đ" valueStyle={{ color: '#fff', fontSize: 20 }} />
              </Card>
            </Col>
            
            <Col span={14}>
              <Card title={<span><BarChartOutlined /> Xu hướng tạo lịch trình</span>} style={{ borderRadius: 12 }}>
                <Chart options={chartMonthly.options} series={chartMonthly.series} type="area" height={300} />
              </Card>
            </Col>
            <Col span={10}>
              <Card title={<span><PieChartOutlined /> Tỷ lệ loại hình</span>} style={{ borderRadius: 12 }}>
                <Chart options={chartCategory.options} series={chartCategory.series} type="donut" height={300} />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      <Modal
        title={editingId ? "Cập nhật địa điểm" : "Thêm địa điểm mới"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        okText="Lưu dữ liệu"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="name" label="Tên địa điểm" rules={[{ required: true }]}>
                <Input prefix={<EnvironmentOutlined />} placeholder="VD: Vịnh Hạ Long" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="type" label="Loại hình" rules={[{ required: true }]}>
                <Select placeholder="Chọn...">
                  <Option value="biển">Biển</Option>
                  <Option value="núi">Núi</Option>
                  <Option value="thành phố">Thành phố</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Mô tả ngắn">
            <TextArea rows={2} placeholder="Nhập vài dòng giới thiệu về địa điểm..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="rating" label="Đánh giá (1-5)">
                <InputNumber min={1} max={5} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="timeRequired" label="Thời gian (phút)">
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Ảnh đại diện">
                <Upload accept="image/*" showUploadList={false} beforeUpload={() => false} onChange={handleUpload}>
                  <Button icon={<UploadOutlined />} block>Chọn file</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left" style={{ fontSize: 14 }}>Phân bổ chi phí (VNĐ)</Divider>
          <Row gutter={16}>
            <Col span={8}><Form.Item name={['costs', 'food']} label="Ăn uống"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={8}><Form.Item name={['costs', 'accommodation']} label="Lưu trú"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={8}><Form.Item name={['costs', 'transport']} label="Di chuyển"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;