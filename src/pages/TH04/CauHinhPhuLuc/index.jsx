import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { useModel } from 'umi';

const CauHinhPhuLuc = () => {
  const { cauHinhList, setCauHinhList } = useModel('vanBangModel');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    setCauHinhList([...cauHinhList, { ...values, id: Date.now().toString() }]);
    setIsModalVisible(false);
    form.resetFields();
    message.success('Thêm cấu hình thành công!');
  };

  const handleDelete = (id) => {
    setCauHinhList(cauHinhList.filter(item => item.id !== id));
    message.success('Đã xóa cấu hình');
  };

  const columns = [
    { title: 'Tên trường thông tin (VD: Dân tộc, Nơi sinh)', dataIndex: 'name', key: 'name' },
    { 
      title: 'Kiểu dữ liệu', 
      dataIndex: 'type', 
      key: 'type',
      render: (type) => {
        if (type === 'String') return 'Văn bản (String)';
        if (type === 'Number') return 'Số (Number)';
        if (type === 'Date') return 'Ngày tháng (Date)';
        return type;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        + Thêm trường thông tin vào phôi bằng
      </Button>
      
      <Table dataSource={cauHinhList} columns={columns} rowKey="id" />

      <Modal 
        title="Thêm trường thông tin" 
        visible={isModalVisible} 
        onCancel={() => setIsModalVisible(false)} 
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <Form.Item name="name" label="Tên trường (VD: Dân tộc, Điểm TB...)" rules={[{ required: true }]}>
            <Input placeholder="Nhập tên..." />
          </Form.Item>
          
          <Form.Item name="type" label="Kiểu dữ liệu" rules={[{ required: true }]}>
            <Select placeholder="-- Chọn kiểu --">
              <Select.Option value="String">Văn bản (Dùng cho Dân tộc, Nơi sinh...)</Select.Option>
              <Select.Option value="Number">Số (Dùng cho Điểm, Xếp hạng...)</Select.Option>
              <Select.Option value="Date">Ngày tháng (Dùng cho Ngày nhập học...)</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CauHinhPhuLuc;