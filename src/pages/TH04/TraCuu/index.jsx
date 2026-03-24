import React, { useState } from 'react';
import { Table, Form, Input, Button, Card, DatePicker, Modal, message, Descriptions } from 'antd';
import { useModel } from 'umi';

const TraCuu = () => {
  const { vanBangList, quyetDinhList, setQuyetDinhList, cauHinhList } = useModel('vanBangModel');
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVB, setSelectedVB] = useState(null);
  const [form] = Form.useForm();

  const handleSearch = (values) => {
    const activeParams = Object.keys(values).filter(key => values[key]);
    
    if (activeParams.length < 2) {
      return message.warning('Vui lòng nhập ít nhất 2 tham số để tra cứu!');
    }

    const foundDiplomas = vanBangList.filter(vb => {
      let isMatch = true;
      if (values.diplomaNumber && vb.diplomaNumber !== values.diplomaNumber) isMatch = false;
      if (values.serialNumber && vb.serialNumber.toString() !== values.serialNumber) isMatch = false;
      if (values.studentId && vb.studentId !== values.studentId) isMatch = false;
      if (values.fullName && !vb.fullName.toLowerCase().includes(values.fullName.toLowerCase())) isMatch = false;
      if (values.dob && vb.dob !== values.dob.format('YYYY-MM-DD')) isMatch = false; 
      return isMatch;
    });

    setResults(foundDiplomas);

    if (foundDiplomas.length > 0) {
      const updatedQDList = [...quyetDinhList];
      foundDiplomas.forEach(vb => {
        const qdIndex = updatedQDList.findIndex(q => q.id === vb.decisionId);
        if (qdIndex !== -1) {
          updatedQDList[qdIndex].viewCount += 1;
        }
      });
      setQuyetDinhList(updatedQDList);
    } else {
      message.info('Không tìm thấy văn bằng nào khớp với thông tin!');
    }
  };

  const showDetail = (record) => {
    const qd = quyetDinhList.find(q => q.id === record.decisionId);
    setSelectedVB({ ...record, thongTinQuyetDinh: qd });
    setIsModalOpen(true);
  };

  const columns = [
    { title: 'Số hiệu VB', dataIndex: 'diplomaNumber' },
    { title: 'Số vào sổ', dataIndex: 'serialNumber' },
    { title: 'MSV', dataIndex: 'studentId' },
    { title: 'Họ tên', dataIndex: 'fullName' },
    { title: 'Ngày sinh', dataIndex: 'dob' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => showDetail(record)}>Xem chi tiết</Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card title="Tra cứu văn bằng" style={{ marginBottom: 24 }}>
        <Form form={form} layout="inline" onFinish={handleSearch}>
          <Form.Item name="diplomaNumber" label="Số hiệu">
            <Input />
          </Form.Item>
          <Form.Item name="serialNumber" label="Số vào sổ">
            <Input />
          </Form.Item>
          <Form.Item name="studentId" label="MSV">
            <Input />
          </Form.Item>
          <Form.Item name="fullName" label="Họ tên">
            <Input />
          </Form.Item>
          <Form.Item name="dob" label="Ngày sinh">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Tra Cứu</Button>
            <Button onClick={() => form.resetFields()} style={{ marginLeft: 8 }}>Nhập lại</Button>
          </Form.Item>
        </Form>
      </Card>

      {results.length > 0 && (
        <Table dataSource={results} columns={columns} rowKey="id" />
      )}

      <Modal 
        title="Chi tiết Văn Bằng & Quyết Định" 
        visible={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        footer={[<Button key="close" onClick={() => setIsModalOpen(false)}>Đóng</Button>]}
        width={700}
      >
        {selectedVB && (
          <>
            <Descriptions title="Thông tin cơ bản" bordered size="small" column={2}>
              <Descriptions.Item label="Họ tên">{selectedVB.fullName}</Descriptions.Item>
              <Descriptions.Item label="Mã sinh viên">{selectedVB.studentId}</Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">{selectedVB.dob}</Descriptions.Item>
              <Descriptions.Item label="Số hiệu VB">{selectedVB.diplomaNumber}</Descriptions.Item>
              <Descriptions.Item label="Số vào sổ">{selectedVB.serialNumber}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="Thông phụ lục" bordered size="small" column={2} style={{ marginTop: 20 }}>
              {cauHinhList.map(field => (
                <Descriptions.Item key={field.id} label={field.name}>
                  {selectedVB.dynamicData ? selectedVB.dynamicData[field.id] : ''}
                </Descriptions.Item>
              ))}
            </Descriptions>

            <Descriptions title="Thông tin Quyết định" bordered size="small" column={1} style={{ marginTop: 20 }}>
              <Descriptions.Item label="Số Quyết định">{selectedVB.thongTinQuyetDinh?.decisionNumber}</Descriptions.Item>
              <Descriptions.Item label="Ngày ban hành">{selectedVB.thongTinQuyetDinh?.date}</Descriptions.Item>
              <Descriptions.Item label="Trích yếu">{selectedVB.thongTinQuyetDinh?.summary}</Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Modal>
    </div>
  );
};

export default TraCuu;