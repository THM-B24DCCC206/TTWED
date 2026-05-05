import React from 'react';
import moment from 'moment';
import { ModalForm, ProFormText, ProFormSelect, ProFormDatePicker, ProFormTextArea } from '@ant-design/pro-form';
import { getTasks, saveTasks, TaskItem } from '../utils/storage';

interface TaskFormProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  reloadData: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ visible, setVisible, reloadData }) => {
  const handleSubmit = async (values: any) => {
    const currentTasks = getTasks();
    const newTask: TaskItem = {
      ...values,
      id: Date.now().toString(),
      status: 'todo',
      deadline: moment(values.deadline).format('YYYY-MM-DD')
    };
    saveTasks([...currentTasks, newTask]);
    reloadData();
    return true;
  };

  return (
    <ModalForm
      title="Thêm công việc mới"
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={handleSubmit}
      modalProps={{ destroyOnClose: true }}
    >
      <ProFormText name="title" label="Tên task" rules={[{ required: true }]} />
      <ProFormTextArea name="description" label="Mô tả" />
      <ProFormDatePicker name="deadline" label="Deadline" rules={[{ required: true }]} />
      <ProFormSelect
        name="priority"
        label="Mức độ ưu tiên"
        options={['Cao', 'Trung bình', 'Thấp']}
        rules={[{ required: true }]}
      />
      <ProFormSelect
        name="tags"
        label="Tag"
        mode="tags"
      />
    </ModalForm>
  );
};

export default TaskForm;