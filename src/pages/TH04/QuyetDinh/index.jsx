import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';
import { useModel } from 'umi';

const QuyetDinh = () => {
  const { quyetDinhList, setQuyetDinhList, soVanBangList } = useModel('vanBangModel');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    const newQD = {
      ...values,
      id: Date.now(),
      date: values.date.format('YYYY-MM-DD'),
      viewCount: 0,
    };
    setQuyetDinhList([...quyetDinhList, newQD]);
    setIsModalVisible(false);
    form.resetFields();
    message.success('Thêm quyết định thành công');
  };

  const columns = [
    { title: 'Số QĐ', dataIndex: 'decisionNumber', key: 'decisionNumber' },
    { title: 'Ngày ban hành', dataIndex: 'date', key: 'date' },
    { title: 'Trích yếu', dataIndex: 'summary', key: 'summary' },
    { 
      title: 'Thuộc sổ (Năm)', 
      dataIndex: 'bookId', 
      render: (bookId) => soVanBangList.find(s => s.id === bookId)?.year || 'N/A' 
    },
    { title: 'Lượt tra cứu', dataIndex: 'viewCount', key: 'viewCount' },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        Thêm Quyết Định
      </Button>
      <Table dataSource={quyetDinhList} columns={columns} rowKey="id" />

      <Modal title="Thêm Quyết định mới" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => form.submit()}>
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <Form.Item name="decisionNumber" label="Số Quyết Định" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Ngày ban hành" rules={[{ required: true }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="summary" label="Trích yếu" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="bookId" label="Lưu vào sổ năm" rules={[{ required: true }]}>
            <Select>
              {soVanBangList.map(so => (
                <Select.Option key={so.id} value={so.id}>{so.year}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuyetDinh;