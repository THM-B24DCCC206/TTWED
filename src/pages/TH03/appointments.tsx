import { Table, Button, Form, Select, message, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const { Option } = Select;

export default () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [form] = Form.useForm();

  const load = () => {
    setAppointments(JSON.parse(localStorage.getItem('appointments') || '[]'));
    setEmployees(JSON.parse(localStorage.getItem('employees') || '[]'));
    setServices(JSON.parse(localStorage.getItem('services') || '[]'));
  };

  useEffect(() => {
    load();
  }, []);


  const submit = (values: any) => {
    const current = JSON.parse(localStorage.getItem('appointments') || '[]');

    const newData = [
      ...current,
      {
        ...values,
        id: Date.now(),
        time: values.time.format('YYYY-MM-DD HH:mm'),
        status: 'Chờ duyệt',
      },
    ];

    localStorage.setItem('appointments', JSON.stringify(newData));
    message.success('Thêm lịch hẹn thành công');

    form.resetFields();
    load();
  };


  const remove = (id: number) => {
    const current = JSON.parse(localStorage.getItem('appointments') || '[]');

    const newData = current.filter((item: any) => item.id !== id);

    localStorage.setItem('appointments', JSON.stringify(newData));
    load();
  };


  const updateStatus = (id: number, status: string) => {
    const current = JSON.parse(localStorage.getItem('appointments') || '[]');

    const newData = current.map((item: any) =>
      item.id === id ? { ...item, status } : item
    );

    localStorage.setItem('appointments', JSON.stringify(newData));
    message.success('Cập nhật trạng thái');
    load();
  };

  const getEmployeeName = (id: number) =>
    employees.find(e => e.id === id)?.name;

  const getServiceName = (id: number) =>
    services.find(s => s.id === id)?.name;

  return (
    <>

      <Form form={form} onFinish={submit} layout="inline">
        <Form.Item name="employeeId" rules={[{ required: true }]}>
          <Select placeholder="Chọn nhân viên" style={{ width: 180 }}>
            {employees.map(e => (
              <Option key={e.id} value={e.id}>
                {e.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="serviceId" rules={[{ required: true }]}>
          <Select placeholder="Chọn dịch vụ" style={{ width: 180 }}>
            {services.map(s => (
              <Option key={s.id} value={s.id}>
                {s.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="time" rules={[{ required: true }]}>
          <DatePicker showTime placeholder="Chọn thời gian" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm lịch
        </Button>
      </Form>


      <Table
        style={{ marginTop: 20 }}
        rowKey="id"
        dataSource={appointments}
        columns={[
          {
            title: 'Nhân viên',
            render: (_: any, r: any) => getEmployeeName(r.employeeId),
          },
          {
            title: 'Dịch vụ',
            render: (_: any, r: any) => getServiceName(r.serviceId),
          },
          {
            title: 'Thời gian',
            dataIndex: 'time',
          },
          {
            title: 'Trạng thái',
            render: (_: any, record: any) => (
              <Select
                value={record.status}
                style={{ width: 150 }}
                onChange={(value) => updateStatus(record.id, value)}
              >
                <Option value="Chờ duyệt">Chờ duyệt</Option>
                <Option value="Xác nhận">Xác nhận</Option>
                <Option value="Hoàn thành">Hoàn thành</Option>
                <Option value="Hủy">Hủy</Option>
              </Select>
            ),
          },
          {
            title: 'Hành động',
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