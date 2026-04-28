import React, { useRef } from 'react';
import { Tag, Button, Popconfirm, message } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { ModalForm, ProFormDatePicker, ProFormSelect, ProFormText, ProFormDigit, ProFormTextArea } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

// Định nghĩa Type dữ liệu
type WorkoutRecord = {
  id: number;
  date: string;
  name: string;
  type: string;
  duration: number;
  calories: number;
  notes: string;
  status: 'completed' | 'missed';
};

const NhatKyTapLuyen: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<WorkoutRecord>[] = [
    {
      title: 'Ngày tập',
      dataIndex: 'date',
      valueType: 'date',
      sorter: true,
    },
    {
      title: 'Tên bài tập',
      dataIndex: 'name',
    },
    {
      title: 'Loại bài tập',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        Cardio: { text: 'Cardio', status: 'Processing' },
        Strength: { text: 'Strength (Tạ)', status: 'Error' },
        Yoga: { text: 'Yoga', status: 'Success' },
        HIIT: { text: 'HIIT', status: 'Warning' },
        Other: { text: 'Khác', status: 'Default' },
      },
    },
    {
      title: 'Thời lượng (phút)',
      dataIndex: 'duration',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: 'Calo đốt',
      dataIndex: 'calories',
      valueType: 'digit',
      hideInSearch: true,
      render: (val) => `${val} kcal`,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notes',
      hideInSearch: true,
      ellipsis: true, // Cắt chữ nếu quá dài
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueType: 'select',
      hideInSearch: true,
      valueEnum: {
        completed: { text: 'Hoàn thành', status: 'Success' },
        missed: { text: 'Bỏ lỡ', status: 'Error' },
      },
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a key="edit" onClick={() => message.info('Mở form sửa với dữ liệu này...')}>Sửa</a>,
        <Popconfirm
          key="delete"
          title="Xóa buổi tập này?"
          onConfirm={() => message.success('Đã xóa thành công!')}
        >
          <a style={{ color: 'red' }}>Xóa</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable<WorkoutRecord>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          return {
            data: [
              { id: 1, date: '2026-04-28', name: 'Chạy máy', type: 'Cardio', duration: 45, calories: 350, notes: 'Chạy tốc độ 10', status: 'completed' },
              { id: 2, date: '2026-04-26', name: 'Đẩy ngực', type: 'Strength', duration: 60, calories: 200, notes: 'Đẩy 50kg', status: 'completed' },
              { id: 3, date: '2026-04-20', name: 'Đạp xe', type: 'Cardio', duration: 30, calories: 150, notes: 'Mệt quá nghỉ sớm', status: 'missed' },
            ],
            success: true,
            total: 3,
          };
        }}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 5 }}
        headerTitle="Danh sách buổi tập"
        toolBarRender={() => [
          <ModalForm
            key="add-modal"
            title="Thêm buổi tập mới"
            trigger={
              <Button type="primary">
                <PlusOutlined /> Thêm buổi tập
              </Button>
            }
            onFinish={async (values) => {
              console.log(values);
              message.success('Thêm thành công');
              return true;
            }}
          >
            <ProFormDatePicker name="date" label="Ngày tập" rules={[{ required: true }]} width="md" />
            <ProFormText name="name" label="Tên bài tập" rules={[{ required: true }]} />
            <ProFormSelect
              name="type"
              label="Loại bài tập"
              valueEnum={{
                Cardio: 'Cardio', Strength: 'Strength', Yoga: 'Yoga', HIIT: 'HIIT', Other: 'Khác',
              }}
              rules={[{ required: true }]}
            />
            <ProFormDigit name="duration" label="Thời lượng (phút)" width="sm" />
            <ProFormDigit name="calories" label="Calo đốt" width="sm" />
            <ProFormSelect
              name="status"
              label="Trạng thái"
              initialValue="completed"
              valueEnum={{ completed: 'Hoàn thành', missed: 'Bỏ lỡ' }}
            />
            <ProFormTextArea name="notes" label="Ghi chú" />
          </ModalForm>,
        ]}
      />
    </>
  );
};

export default NhatKyTapLuyen;