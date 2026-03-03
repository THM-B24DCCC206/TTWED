import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  InputNumber,
  Table,
  Popconfirm,
  Input,
} from 'antd';
import dayjs from 'dayjs';

const TienDo = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  // Load dữ liệu
  useEffect(() => {
    setSessions(JSON.parse(localStorage.getItem('sessions') || '[]'));
    setSubjects(JSON.parse(localStorage.getItem('subjects') || '[]'));
  }, []);

  // Lưu khi thay đổi
  useEffect(() => {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Thêm / Sửa
  const handleSubmit = (values: any) => {
    const newData = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    };

    if (editing) {
      setSessions(
        sessions.map((s) =>
          s.id === editing.id ? { ...s, ...newData } : s
        )
      );
    } else {
      setSessions([
        ...sessions,
        { id: Date.now(), ...newData },
      ]);
    }

    setVisible(false);
    setEditing(null);
    form.resetFields();
  };

  // Sửa
  const handleEdit = (record: any) => {
    setEditing(record);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    });
    setVisible(true);
  };

  // Xóa
  const handleDelete = (id: number) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const columns = [
    {
      title: 'Môn',
      dataIndex: 'subjectId',
      width: 200,
      align: 'center' as const,
      render: (_: any, record: any) =>
        subjects.find((s) => s.id === record.subjectId)?.name || '',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      width: 180,
      align: 'center' as const,
    },
    {
      title: 'Phút',
      dataIndex: 'duration',
      width: 120,
      align: 'center' as const,
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      width: 300,
      align: 'center' as const,
    },
    {
      title: 'Hành động',
      width: 200,
      align: 'center' as const,
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm
            title="Xóa lịch học?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger style={{ marginLeft: 8 }}>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm lịch học
      </Button>

      <Table
        style={{ marginTop: 16 }}
        dataSource={sessions}
        columns={columns}
        rowKey="id"
        scroll={{ x: 1000 }}
        bordered
        pagination={{ pageSize: 5 }}
      />

      <Modal
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
          setEditing(null);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="subjectId"
            label="Môn"
            rules={[{ required: true, message: 'Chọn môn' }]}
          >
            <Select>
              {subjects.map((s) => (
                <Select.Option key={s.id} value={s.id}>
                  {s.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Ngày"
            rules={[{ required: true, message: 'Chọn ngày' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Số phút"
            rules={[{ required: true, message: 'Nhập số phút' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung đã học"
            rules={[{ required: true, message: 'Nhập nội dung học' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Button htmlType="submit" type="primary" block>
            {editing ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default TienDo;