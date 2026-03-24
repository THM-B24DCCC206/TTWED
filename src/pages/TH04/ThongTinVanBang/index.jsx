import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, InputNumber, message } from 'antd';
import { useModel } from 'umi';

const ThongTinVanBang = () => {
  const { vanBangList, setVanBangList, quyetDinhList, cauHinhList, soVanBangList, setSoVanBangList } = useModel('vanBangModel');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    const quyetDinh = quyetDinhList.find(q => q.id === values.decisionId);
    const soVanBang = soVanBangList.find(s => s.id === quyetDinh.bookId);

    const newVB = {
      ...values,
      id: Date.now(),
      serialNumber: soVanBang.currentSerialNumber,
      dob: values.dob.format('YYYY-MM-DD'),
    };
    
    cauHinhList.forEach(field => {
      if (field.type === 'Date' && newVB.dynamicData && newVB.dynamicData[field.id]) {
        newVB.dynamicData[field.id] = newVB.dynamicData[field.id].format('YYYY-MM-DD');
      }
    });

    setVanBangList([...vanBangList, newVB]);

    const newSoList = soVanBangList.map(s => 
      s.id === soVanBang.id ? { ...s, currentSerialNumber: s.currentSerialNumber + 1 } : s
    );
    setSoVanBangList(newSoList);

    setIsModalVisible(false);
    form.resetFields();
    message.success('Thêm văn bằng thành công!');
  };

  const columns = [
    { title: 'Số hiệu VB', dataIndex: 'diplomaNumber' },
    { title: 'Số vào sổ', dataIndex: 'serialNumber' },
    { title: 'Họ tên', dataIndex: 'fullName' },
    { title: 'MSV', dataIndex: 'studentId' },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        Thêm Văn Bằng
      </Button>
      <Table dataSource={vanBangList} columns={columns} rowKey="id" />

      <Modal title="Thêm Thông Tin Văn Bằng" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => form.submit()} width={600}>
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <Form.Item name="decisionId" label="Thuộc Quyết định tốt nghiệp" rules={[{ required: true }]}>
            <Select>
              {quyetDinhList.map(qd => (
                <Select.Option key={qd.id} value={qd.id}>{qd.decisionNumber} - {qd.date}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item name="diplomaNumber" label="Số hiệu văn bằng" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="studentId" label="Mã sinh viên" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fullName" label="Họ tên" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
          </div>

          <div style={{ marginTop: 16, borderTop: '1px solid #eee', paddingTop: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {cauHinhList.map(field => (
                <Form.Item key={field.id} label={field.name} name={['dynamicData', field.id]}>
                  {field.type === 'String' && <Input />}
                  {field.type === 'Number' && <InputNumber style={{ width: '100%' }} />}
                  {field.type === 'Date' && <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />}
                </Form.Item>
              ))}
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ThongTinVanBang;