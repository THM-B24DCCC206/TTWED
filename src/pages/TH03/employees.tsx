import { Table, Button, Input, Form, message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [data, setData] = useState<any[]>([]);
  const [form] = Form.useForm();


  const load = () => {
    const raw = localStorage.getItem('employees');
    const parsed = raw ? JSON.parse(raw) : [];
    setData(parsed);
  };

  useEffect(() => {
    load();
  }, []);


  const submit = (values: any) => {
    const raw = localStorage.getItem('employees');
    const current = raw ? JSON.parse(raw) : [];

    const newData = [
      ...current,
      {
        ...values,
        id: Date.now(),
      },
    ];

    localStorage.setItem('employees', JSON.stringify(newData));
    message.success('Thêm thành công');

    form.resetFields();
    load(); 
  };

 
  const remove = (id: number) => {
    const raw = localStorage.getItem('employees');
    const current = raw ? JSON.parse(raw) : [];

    const newData = current.filter((item: any) => item.id !== id);

    localStorage.setItem('employees', JSON.stringify(newData));
    load();
  };

  return (
    <>
      <Form form={form} onFinish={submit} layout="inline">
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Tên nhân viên" />
        </Form.Item>

        <Form.Item name="max" rules={[{ required: true }]}>
          <Input placeholder="Số khách/ngày" />
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
          { title: "Tên", dataIndex: "name" },
          { title: "Max/ngày", dataIndex: "max" },
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