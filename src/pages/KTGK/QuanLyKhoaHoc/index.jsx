import React, { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormSelect, ProFormDigit, ProFormTextArea } from '@ant-design/pro-form';
import { Button, Popconfirm, message, ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import viVN from 'antd/lib/locale/vi_VN';

export default () => {
  const actionRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const getLocalData = () => {
    const data = localStorage.getItem('courseData');
    return data ? JSON.parse(data) : [];
  };

  const setLocalData = (data) => {
    localStorage.setItem('courseData', JSON.stringify(data));
  };

  const instructors = {
    'GV01': { text: 'Trần Hải Minh' },
    'GV02': { text: 'Trần Minh Hải' },
    'GV03': { text: 'Trần Viết Minh' },
  };

  const statusEnum = {
    open: { text: 'Đang mở', status: 'Processing' },
    paused: { text: 'Tạm dừng', status: 'Warning' },
    ended: { text: 'Đã kết thúc', status: 'Default' },
  };

  const handleDelete = (record) => {
    if (record.studentCount > 0) {
      message.error('Chỉ được xóa khóa học chưa có học viên!');
      return;
    }
    const data = getLocalData();
    const newData = data.filter((item) => item.id !== record.id);
    setLocalData(newData);
    actionRef.current?.reload();
    message.success('Đã xóa khóa học');
  };

const handleFinish = async (values) => {
    const data = getLocalData();
    if (currentRow) {
      const newData = data.map((item) =>
        item.id === currentRow.id ? { ...item, ...values } : item
      );
      setLocalData(newData);
      message.success('Cập nhật thành công');
    } else {
      let newId = 'KH1';
      if (data.length > 0) {
        const maxNumber = data.reduce((max, item) => {
          const num = parseInt(item.id.replace('KH', ''), 10) || 0;
          return num > max ? num : max;
        }, 0);
        newId = `KH${maxNumber + 1}`;
      }

      setLocalData([{ id: newId, ...values }, ...data]);
      message.success('Thêm mới thành công');
    }
    setModalVisible(false);
    actionRef.current?.reload();
    return true;
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: false,
    },
    {
      title: 'Khóa học',
      dataIndex: 'name',
    },
    {
      title: 'Giảng viên',
      dataIndex: 'instructor',
      valueType: 'select',
      valueEnum: instructors,
    },
    {
      title: 'Số học viên',
      dataIndex: 'studentCount',
      valueType: 'digit',
      search: false,
      sorter: (a, b) => a.studentCount - b.studentCount,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusEnum,
    },
    {
      title: 'Hành động',
      valueType: 'option',
      render: (text, record) => [
        <a
          key="edit"
          onClick={() => {
            setCurrentRow(record);
            setModalVisible(true);
          }}
        >
          Sửa
        </a>,
        <Popconfirm
          key="delete"
          title="Bạn có chắc chắn muốn xóa khóa học này?"
          onConfirm={() => handleDelete(record)}
          okText="Có"
          cancelText="Không"
        >
          <a style={{ color: 'red' }}>Xóa</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ConfigProvider locale={viVN}>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          let data = getLocalData();
          
          if (params.name) {
            data = data.filter(item => item.name.toLowerCase().includes(params.name.toLowerCase()));
          }
          if (params.instructor) {
            data = data.filter(item => item.instructor === params.instructor);
          }
          if (params.status) {
            data = data.filter(item => item.status === params.status);
          }

          return {
            data: data,
            success: true,
            total: data.length,
          };
        }}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        headerTitle="Danh sách khóa học"
        search={{
          searchText: 'Tìm kiếm',
          resetText: 'Làm mới',
          submitText: 'Tìm',
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setCurrentRow(null);
              setModalVisible(true);
            }}
          >
            Thêm mới
          </Button>,
        ]}
      />

      <ModalForm
        title={currentRow ? 'Sửa khóa học' : 'Thêm khóa học'}
        width="600px"
        visible={modalVisible}
        onVisibleChange={setModalVisible}
        initialValues={currentRow || { studentCount: 0, status: 'open' }}
        onFinish={handleFinish}
        modalProps={{
          destroyOnClose: true,
          okText: 'Lưu',
          cancelText: 'Hủy',
        }}
      >
        <ProFormText
          name="name"
          label="Tên khóa học"
          rules={[
            { required: true, message: 'Vui lòng nhập tên khóa học' },
            { max: 100, message: 'Tối đa 100 ký tự' },
            {
              validator: (_, value) => {
                const data = getLocalData();
                const isDuplicate = data.some(
                  (item) => item.name === value && item.id !== currentRow?.id
                );
                if (isDuplicate) {
                  return Promise.reject(new Error('Tên khóa học đã tồn tại'));
                }
                return Promise.resolve();
              },
            },
          ]}
        />
        <ProFormSelect
          name="instructor"
          label="Giảng viên"
          valueEnum={instructors}
          rules={[{ required: true, message: 'Vui lòng chọn giảng viên' }]}
          placeholder="Chọn giảng viên"
        />
        <ProFormDigit
          name="studentCount"
          label="Số lượng học viên"
          min={0}
          rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
          placeholder="Nhập số lượng"
        />
        <ProFormSelect
          name="status"
          label="Trạng thái"
          valueEnum={statusEnum}
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          placeholder="Chọn trạng thái"
        />
        <ProFormTextArea
          name="description"
          label="Mô tả khóa học "
          placeholder="Nhập mô tả"
        />
      </ModalForm>
    </ConfigProvider>
  );
};