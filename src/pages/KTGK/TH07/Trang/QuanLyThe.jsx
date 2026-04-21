import React, { useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const QuanLyThe = () => {
  const actionRef = useRef();

  const columns = [
    {
      title: 'Tên thẻ (Tag)',
      dataIndex: 'name',
    },
    {
      title: 'Số bài viết sử dụng',
      dataIndex: 'usageCount',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: 'Hành động',
      valueType: 'option',
      render: (_, record) => [
        <Button key="edit" type="link" icon={<EditOutlined />}>Sửa</Button>,
        <Popconfirm
          key="delete"
          title="Xóa thẻ này?"
          onConfirm={() => message.success('Đã xóa')}
        >
          <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
        </Popconfirm>,
      ],
    },
  ];

  const fakeData = [
    { id: 1, name: 'React', usageCount: 15 },
    { id: 2, name: 'JavaScript', usageCount: 8 },
    { id: 3, name: 'Ant Design', usageCount: 5 },
  ];

  return (
    <ProTable
      headerTitle="Quản lý Thẻ (Tags)"
      actionRef={actionRef}
      rowKey="id"
      dataSource={fakeData}
      columns={columns}
      search={{ labelWidth: 'auto' }}
      toolBarRender={() => [
        <Button key="add" type="primary" icon={<PlusOutlined />}>
          Thêm thẻ mới
        </Button>,
      ]}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default QuanLyThe;