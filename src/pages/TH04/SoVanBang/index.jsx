import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, message } from 'antd';
import { useModel } from 'umi';

const SoVanBang = () => {
  const { soVanBangList, setSoVanBangList } = useModel('vanBangModel');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    if (soVanBangList.some(item => item.year === values.year)) {
      return message.error('Sổ của năm này đã tồn tại!');
    }
    const newSo = {
      id: soVanBangList.length + 1,
      year: values.year,
      currentSerialNumber: 1,
    };
    setSoVanBangList([...soVanBangList, newSo]);
    setIsModalVisible(false);
    form.resetFields();
    message.success('Thêm sổ văn bằng thành công');
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Năm', dataIndex: 'year', key: 'year' },
    { title: 'Số vào sổ tiếp theo', dataIndex: 'currentSerialNumber', key: 'currentSerialNumber' },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        Mở sổ văn bằng mới
      </Button>
      <Table dataSource={soVanBangList} columns={columns} rowKey="id" />

      <Modal title="Thêm sổ văn bằng" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => form.submit()}>
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <Form.Item name="year" label="Năm quản lý" rules={[{ required: true, message: 'Vui lòng nhập năm' }]}>
            <InputNumber style={{ width: '100%' }} min={2000} max={2100} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SoVanBang;