import { Table, Rate, Input } from 'antd';
import { useEffect, useState } from 'react';

const { TextArea } = Input;

export default () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const load = () => {
    const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
    const emps = JSON.parse(localStorage.getItem('employees') || '[]');
    const servs = JSON.parse(localStorage.getItem('services') || '[]');


    const done = apps.filter((a: any) => a.status === 'Hoàn thành');

    setAppointments(done);
    setEmployees(emps);
    setServices(servs);
  };

  useEffect(() => {
    load();
  }, []);

  const getEmployeeName = (id: number) =>
    employees.find(e => e.id === id)?.name;

  const getServiceName = (id: number) =>
    services.find(s => s.id === id)?.name;


  const updateRating = (id: number, rating: number) => {
    const current = JSON.parse(localStorage.getItem('appointments') || '[]');

    const newData = current.map((item: any) =>
      item.id === id ? { ...item, rating } : item
    );

    localStorage.setItem('appointments', JSON.stringify(newData));
    load();
  };


  const updateComment = (id: number, comment: string) => {
    const current = JSON.parse(localStorage.getItem('appointments') || '[]');

    const newData = current.map((item: any) =>
      item.id === id ? { ...item, comment } : item
    );

    localStorage.setItem('appointments', JSON.stringify(newData));
    load();
  };


  const updateReply = (id: number, reply: string) => {
    const current = JSON.parse(localStorage.getItem('appointments') || '[]');

    const newData = current.map((item: any) =>
      item.id === id ? { ...item, reply } : item
    );

    localStorage.setItem('appointments', JSON.stringify(newData));
    load();
  };

  return (
    <Table
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
          title: 'Đánh giá',
          render: (_: any, record: any) => (
            <Rate
              value={record.rating}
              onChange={(value) => updateRating(record.id, value)}
            />
          ),
        },
        {
          title: 'Nhận xét',
          render: (_: any, record: any) => (
            <TextArea
              value={record.comment}
              onChange={(e) =>
                updateComment(record.id, e.target.value)
              }
            />
          ),
        },
        {
          title: 'Phản hồi NV',
          render: (_: any, record: any) => (
            <TextArea
              value={record.reply}
              onChange={(e) =>
                updateReply(record.id, e.target.value)
              }
            />
          ),
        },
      ]}
    />
  );
};