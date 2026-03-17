import { Card, Row, Col, Statistic, Table } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  const load = () => {
    setEmployees(JSON.parse(localStorage.getItem('employees') || '[]'));
    setServices(JSON.parse(localStorage.getItem('services') || '[]'));
    setAppointments(JSON.parse(localStorage.getItem('appointments') || '[]'));
  };

  useEffect(() => {
    load();
  }, []);

  const getRevenue = () => {
    return appointments.reduce((sum, a) => {
      const service = services.find(s => s.id === a.serviceId);
      return sum + (service?.price || 0);
    }, 0);
  };

  const getEmployeeName = (id: number) =>
    employees.find(e => e.id === id)?.name;

  const getServiceName = (id: number) =>
    services.find(s => s.id === id)?.name;

  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Nhân viên" value={employees.length} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Dịch vụ" value={services.length} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Lịch hẹn" value={appointments.length} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Doanh thu" value={getRevenue()} />
          </Card>
        </Col>
      </Row>


      <Card title="Lịch hẹn gần đây" style={{ marginTop: 20 }}>
        <Table
          rowKey="id"
          dataSource={appointments.slice(-5).reverse()}
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
              dataIndex: 'status',
            },
          ]}
        />
      </Card>
    </>
  );
};