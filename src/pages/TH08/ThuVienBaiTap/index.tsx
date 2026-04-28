import React, { useState } from 'react';
import { Card, Tag, Input, Select, List, Modal, Button } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

// Định nghĩa Type
type Exercise = {
  id: number;
  name: string;
  muscleGroup: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  caloriesPerHour: number;
};

const ThuVienBaiTap: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('All');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEx, setCurrentEx] = useState<Exercise | null>(null);

  // Dữ liệu Mock
  const exercises: Exercise[] = [
    { id: 1, name: 'Chống đẩy (Push Up)', muscleGroup: 'Chest', difficulty: 'Medium', description: 'Bài tập cơ bản phát triển ngực, vai và tay sau. Đặt hai tay rộng bằng vai, hạ thấp người cho đến khi ngực gần chạm sàn rồi đẩy lên.', caloriesPerHour: 300 },
    { id: 2, name: 'Plank', muscleGroup: 'Core', difficulty: 'Easy', description: 'Bài tập tĩnh giúp săn chắc cơ bụng. Tựa người trên hai cẳng tay và mũi chân, giữ cơ thể thành một đường thẳng.', caloriesPerHour: 200 },
    { id: 3, name: 'Squat', muscleGroup: 'Legs', difficulty: 'Medium', description: 'Bài tập vua cho phần thân dưới. Đứng rộng bằng vai, gập gối hạ hông xuống như đang ngồi vào ghế.', caloriesPerHour: 400 },
    { id: 4, name: 'Kéo xà đơn (Pull Up)', muscleGroup: 'Back', difficulty: 'Hard', description: 'Bài tập kéo lưng xô. Nắm xà rộng hơn vai, kéo người lên cho đến khi cằm vượt qua xà.', caloriesPerHour: 500 },
    { id: 5, name: 'Chạy bộ (Treadmill)', muscleGroup: 'Full Body', difficulty: 'Easy', description: 'Bài tập Cardio tăng cường sức bền và hệ tim mạch.', caloriesPerHour: 600 },
  ];

  // Logic lọc
  const filteredExercises = exercises.filter((ex) => {
    const matchName = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchMuscle = muscleFilter === 'All' || ex.muscleGroup === muscleFilter;
    return matchName && matchMuscle;
  });

  const getDifficultyTag = (diff: string) => {
    if (diff === 'Easy') return <Tag color="green">Dễ</Tag>;
    if (diff === 'Medium') return <Tag color="orange">Trung bình</Tag>;
    return <Tag color="red">Khó</Tag>;
  };

  const showDetail = (ex: Exercise) => {
    setCurrentEx(ex);
    setIsModalVisible(true);
  };

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      {/* Thanh tìm kiếm và lọc */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <Search
          placeholder="Tìm kiếm theo tên bài tập..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={(val) => setSearchTerm(val)}
          style={{ maxWidth: 400 }}
        />
        <Select
          size="large"
          defaultValue="All"
          style={{ width: 200 }}
          onChange={(val) => setMuscleFilter(val)}
        >
          <Option value="All">Tất cả nhóm cơ</Option>
          <Option value="Chest">Ngực (Chest)</Option>
          <Option value="Back">Lưng (Back)</Option>
          <Option value="Legs">Chân (Legs)</Option>
          <Option value="Core">Bụng (Core)</Option>
          <Option value="Full Body">Toàn thân</Option>
        </Select>
      </div>

      {/* Danh sách lưới 3 cột */}
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredExercises}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              title={item.name}
              extra={getDifficultyTag(item.difficulty)}
              actions={[
                <Button type="link" icon={<EyeOutlined />} onClick={() => showDetail(item)}>
                  Xem hướng dẫn
                </Button>
              ]}
            >
              <p><strong>Nhóm cơ:</strong> <Tag>{item.muscleGroup}</Tag></p>
              <p><strong>Calo đốt/giờ:</strong> ~{item.caloriesPerHour} kcal</p>
              <p style={{ color: 'gray', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.description}
              </p>
            </Card>
          </List.Item>
        )}
      />

      {/* Modal chi tiết bài tập */}
      <Modal
        title={currentEx?.name}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>
        ]}
      >
        {currentEx && (
          <div>
            <div style={{ marginBottom: 16 }}>
              {getDifficultyTag(currentEx.difficulty)}
              <Tag color="purple">{currentEx.muscleGroup}</Tag>
            </div>
            <p><strong>Hướng dẫn:</strong></p>
            <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{currentEx.description}</p>
            <p style={{ marginTop: 16 }}>
              <strong>Lượng calo đốt cháy trung bình:</strong> {currentEx.caloriesPerHour} kcal/giờ
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ThuVienBaiTap;