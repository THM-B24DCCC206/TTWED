import { Table, Button, Input, Form, message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [data, setData] = useState<any[]>([]);
  const [form] = Form.useForm();


  const load = () => {
    const raw = localStorage.getItem('services');
    const parsed = raw ? JSON.parse(raw) : [];
    setData(parsed);
  };

  useEffect(() => {
    load();
  }, []);


  const submit = (values: any) => {
    const raw = localStorage.getItem('services');
    const current = raw ? JSON.parse(raw) : [];

    const newData = [
      ...current,
      {
        ...values,
        id: Date.now(),
      },
    ];

    localStorage.setItem('services', JSON.stringify(newData));
    message.success('Thêm dịch vụ thành công');

    form.resetFields();
    load();
  };


  const remove = (id: number) => {
    const raw = localStorage.getItem('services');
    const current = raw ? JSON.parse(raw) : [];

    const newData = current.filter((item: any) => item.id !== id);

    localStorage.setItem('services', JSON.stringify(newData));
    load();
  };

  return (
    <>
      <Form form={form} onFinish={submit} layout="inline">
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Tên dịch vụ" />
        </Form.Item>

        <Form.Item name="price" rules={[{ required: true }]}>
          <Input placeholder="Giá" />
        </Form.Item>

        <Form.Item name="duration" rules={[{ required: true }]}>
          <Input placeholder="Thời gian (phút)" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form>

      <Table
        style={{ marginTop: 20 }}
        rowKey="id"
        dataSource={data}
        columns={[
          { title: "Tên dịch vụ", dataIndex: "name" },
          { title: "Giá", dataIndex: "price" },
          { title: "Thời gian (phút)", dataIndex: "duration" },
          {
            title: "Hành động",
            render: (_: any, record: any) => (
              <Button danger onClick={() => remove(record.id)}>
                Xóa
              </Button>
            ),
          },
        ]}
      />
    </>
  );
};