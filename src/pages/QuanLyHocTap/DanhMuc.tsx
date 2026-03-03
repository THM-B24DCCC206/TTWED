import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Table, Popconfirm } from 'antd';

const DanhMuc = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setSubjects(JSON.parse(localStorage.getItem('subjects') || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const handleSubmit = (values: any) => {
    if (editing) {
      setSubjects(
        subjects.map((s) =>
          s.id === editing.id ? { ...s, ...values } : s
        )
      );
    } else {
      setSubjects([...subjects, { id: Date.now(), ...values }]);
    }

    setVisible(false);
    setEditing(null);
    form.resetFields();
  };

  const handleEdit = (record: any) => {
    setEditing(record);
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleDelete = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm môn
      </Button>

      <Table
        dataSource={subjects}
        rowKey="id"
        columns={[
          { title: 'Tên môn', dataIndex: 'name' },
          {
            title: 'Hành động',
            render: (_, record) => (
              <>
                <Button onClick={() => handleEdit(record)}>Sửa</Button>
                <Popconfirm
                  title="Xóa môn?"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button danger style={{ marginLeft: 8 }}>
                    Xóa
                  </Button>
                </Popconfirm>
              </>
            ),
          },
        ]}
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
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Tên môn" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Button htmlType="submit" type="primary" block>
            {editing ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default DanhMuc;