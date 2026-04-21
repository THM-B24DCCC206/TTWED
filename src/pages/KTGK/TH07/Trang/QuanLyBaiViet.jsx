import React, { useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const QuanLyBaiViet = () => {
  const actionRef = useRef();

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueEnum: {
        all: { text: 'Tất cả', status: 'Default' },
        published: { text: 'Đã đăng', status: 'Success' },
        draft: { text: 'Nháp', status: 'Error' },
      },
    },
    {
      title: 'Thẻ',
      dataIndex: 'tags',
      hideInSearch: true,
      render: (_, record) => record.tags.map(tag => <Tag key={tag} color="cyan">{tag}</Tag>),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: 'Hành động',
      valueType: 'option',
      render: (_, record) => [
        <Button key="edit" type="link" icon={<EditOutlined />}>Sửa</Button>,
        <Popconfirm
          key="delete"
          title="Xóa bài viết này?"
          onConfirm={() => message.success('Đã xóa')}
        >
          <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
        </Popconfirm>,
      ],
    },
  ];

  const fakeData = [
    { id: 1, title: 'Hướng dẫn ReactJS', status: 'published', tags: ['React'], views: 100, createdAt: '2026-04-21' },
    { id: 2, title: 'Ant Design Pro căn bản', status: 'draft', tags: ['Antd'], views: 0, createdAt: '2026-04-20' },
  ];

  return (
    <ProTable
      headerTitle="Quản lý bài viết"
      actionRef={actionRef}
      rowKey="id"
      dataSource={fakeData}
      columns={columns}
      search={{ labelWidth: 'auto' }}
      toolBarRender={() => [
        <Button key="add" type="primary" icon={<PlusOutlined />}>
          Thêm mới
        </Button>,
      ]}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default QuanLyBaiViet;