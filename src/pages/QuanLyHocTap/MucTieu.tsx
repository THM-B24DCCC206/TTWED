import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  InputNumber,
  Table,
  Tag,
  Popconfirm,
} from 'antd';
import dayjs from 'dayjs';

const MucTieu = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setGoals(JSON.parse(localStorage.getItem('goals') || '[]'));
    setSessions(JSON.parse(localStorage.getItem('sessions') || '[]'));
    setSubjects(JSON.parse(localStorage.getItem('subjects') || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  // ================= TÍNH TOÁN HOÀN THÀNH =================
  const checkGoal = (goal: any) => {
    const total = sessions
      .filter(
        (s) =>
          dayjs(s.date).format('YYYY-MM') === goal.month &&
          (!goal.subjectId || s.subjectId === goal.subjectId)
      )
      .reduce((sum, s) => sum + s.duration, 0);

    return total >= goal.targetMinutes;
  };

  // ================= SUBMIT =================
  const handleSubmit = (values: any) => {
    const newData = {
      ...values,
      month: values.month.format('YYYY-MM'),
    };

    if (editing) {
      setGoals(
        goals.map((g) =>
          g.id === editing.id ? { ...g, ...newData } : g
        )
      );
    } else {
      setGoals([...goals, { id: Date.now(), ...newData }]);
    }

    setVisible(false);
    setEditing(null);
    form.resetFields();
  };

  // ================= EDIT =================
  const handleEdit = (record: any) => {
    setEditing(record);
    form.setFieldsValue({
      ...record,
      month: dayjs(record.month),
    });
    setVisible(true);
  };

  // ================= DELETE =================
  const handleDelete = (id: number) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Đặt mục tiêu
      </Button>

      <Table
        dataSource={goals}
        rowKey="id"
        columns={[
          {
            title: 'Môn',
            render: (_, record) =>
              record.subjectId
                ? subjects.find((s) => s.id === record.subjectId)?.name
                : 'Tổng',
          },
          { title: 'Tháng', dataIndex: 'month' },
          { title: 'Mục tiêu (phút)', dataIndex: 'targetMinutes' },
          {
            title: 'Trạng thái',
            render: (_, record) =>
              checkGoal(record) ? (
                <Tag color="green">Đạt</Tag>
              ) : (
                <Tag color="red">Chưa đạt</Tag>
              ),
          },
          {
            title: 'Hành động',
            render: (_, record) => (
              <>
                <Button onClick={() => handleEdit(record)}>Sửa</Button>
                <Popconfirm
                  title="Xóa mục tiêu?"
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
          <Form.Item name="subjectId" label="Môn (bỏ trống = tổng)">
            <Select allowClear>
              {subjects.map((s) => (
                <Select.Option key={s.id} value={s.id}>
                  {s.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="month"
            label="Tháng"
            rules={[{ required: true, message: 'Chọn tháng' }]}
          >
            <DatePicker picker="month" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="targetMinutes"
            label="Mục tiêu (phút)"
            rules={[{ required: true, message: 'Nhập mục tiêu' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Button htmlType="submit" type="primary" block>
            {editing ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default MucTieu;