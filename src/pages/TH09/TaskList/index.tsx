import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { getTasks, saveTasks, TaskItem } from '../utils/storage';
import TaskForm from './TaskForm';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadTasks = () => setTasks(getTasks());

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = (id: string) => {
    const newTasks = tasks.filter(t => t.id !== id);
    saveTasks(newTasks);
    loadTasks();
  };

  const columns: ColumnsType<TaskItem> = [
    {
      title: 'Tên task',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Cần làm', value: 'todo' },
        { text: 'Đang làm', value: 'inprogress' },
        { text: 'Hoàn thành', value: 'done' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) => {
        const config: Record<string, { color: string; text: string }> = {
          todo: { color: 'default', text: 'Cần làm' },
          inprogress: { color: 'processing', text: 'Đang làm' },
          done: { color: 'success', text: 'Hoàn thành' }
        };
        return <Tag color={config[status]?.color}>{config[status]?.text}</Tag>;
      }
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      sorter: (a, b) => moment(a.deadline).unix() - moment(b.deadline).unix(),
    },
    {
      title: 'Mức độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        let color = priority === 'Cao' ? 'red' : priority === 'Trung bình' ? 'orange' : 'green';
        return <Tag color={color}>{priority}</Tag>;
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.id)} style={{ color: 'red' }}>Xóa</a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        Thêm Task
      </Button>
      <Table columns={columns} dataSource={tasks} rowKey="id" />
      <TaskForm visible={isModalVisible} setVisible={setIsModalVisible} reloadData={loadTasks} />
    </div>
  );
};

export default TaskList;