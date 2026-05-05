import React, { useRef } from 'react';
import { Tag, Button, Popconfirm, message } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { ModalForm, ProFormDatePicker, ProFormDigit } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';


export type HealthMetricRecord = {
  id: number;
  date: string;
  weight: number;
  height: number;
  heartRate: number;
  sleepHours: number;
};

const getBMIData = (weight?: number, heightCm?: number) => {
  if (!weight || !heightCm) return { value: '-', color: 'default', text: 'Chưa đủ dữ liệu' };
  
  const heightM = heightCm / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);
  const bmiNum = parseFloat(bmi);

  if (bmiNum < 18.5) return { value: bmi, color: 'blue', text: 'Thiếu cân' };
  if (bmiNum >= 18.5 && bmiNum <= 24.9) return { value: bmi, color: 'green', text: 'Bình thường' };
  if (bmiNum >= 25 && bmiNum <= 29.9) return { value: bmi, color: 'gold', text: 'Thừa cân' };
  return { value: bmi, color: 'red', text: 'Béo phì' }; 
};

const ChiSoSucKhoe: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<HealthMetricRecord>[] = [
    {
      title: 'Ngày ghi nhận',
      dataIndex: 'date',
      valueType: 'date',
      sorter: true,
    },
    {
      title: 'Cân nặng (kg)',
      dataIndex: 'weight',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: 'Chiều cao (cm)',
      dataIndex: 'height',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: 'Chỉ số BMI',
      key: 'bmi',
      hideInSearch: true,
      hideInForm: true, 
      render: (_, record) => {
        const bmiData = getBMIData(record.weight, record.height);
        return (
          <Tag color={bmiData.color}>
            {bmiData.value} ({bmiData.text})
          </Tag>
        );
      },
    },
    {
      title: 'Nhịp tim (bpm)',
      dataIndex: 'heartRate',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: 'Giờ ngủ (tiếng)',
      dataIndex: 'sleepHours',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a key="edit" onClick={() => message.info(`Mở form sửa cho ngày ${record.date}`)}>Sửa</a>,
        <Popconfirm
          key="delete"
          title="Xóa bản ghi này?"
          onConfirm={() => message.success('Đã xóa thành công!')}
        >
          <a style={{ color: 'red' }}>Xóa</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable<HealthMetricRecord>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async () => {
        return {
          data: [
            { id: 1, date: '2026-04-28', weight: 65, height: 170, heartRate: 72, sleepHours: 7.5 },
            { id: 2, date: '2026-04-27', weight: 85, height: 165, heartRate: 80, sleepHours: 6 },
            { id: 3, date: '2026-04-26', weight: 45, height: 160, heartRate: 65, sleepHours: 8 },
          ],
          success: true,
          total: 3,
        };
      }}
      rowKey="id"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 10 }}
      headerTitle="Nhật ký chỉ số sức khỏe"
      toolBarRender={() => [
        <ModalForm
          key="add-modal"
          title="Thêm chỉ số sức khỏe"
          trigger={
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm chỉ số
            </Button>
          }
          onFinish={async (values) => {
            console.log('Dữ liệu nhập vào:', values);
            message.success('Thêm chỉ số thành công!');
            return true;
          }}
        >
          <ProFormDatePicker 
            name="date" 
            label="Ngày ghi nhận" 
            rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]} 
            width="md" 
          />
          <ProFormDigit 
            name="weight" 
            label="Cân nặng (kg)" 
            rules={[{ required: true, message: 'Vui lòng nhập cân nặng!' }]} 
            width="md" 
          />
          <ProFormDigit 
            name="height" 
            label="Chiều cao (cm)" 
            rules={[{ required: true, message: 'Vui lòng nhập chiều cao!' }]} 
            width="md" 
          />
          <ProFormDigit 
            name="heartRate" 
            label="Nhịp tim lúc nghỉ (bpm)" 
            width="md" 
          />
          <ProFormDigit 
            name="sleepHours" 
            label="Giờ ngủ (tiếng)" 
            width="md" 
          />
        </ModalForm>,
      ]}
    />
  );
};

export default ChiSoSucKhoe;