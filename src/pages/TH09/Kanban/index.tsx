import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, Tag, Typography, Badge, Space } from 'antd';
import { ClockCircleOutlined, AlignLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getTasks, saveTasks } from '../utils/storage';
import type { TaskItem } from '../utils/storage';

const { Title, Text } = Typography;

// Cấu hình cột với màu sắc riêng biệt
const COLUMNS: Record<string, { title: string; color: string }> = {
  todo: { title: 'Cần làm', color: '#108ee9' },
  inprogress: { title: 'Đang làm', color: '#fa8c16' },
  done: { title: 'Hoàn thành', color: '#52c41a' }
};

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const newTasks = [...tasks];
      const taskIndex = newTasks.findIndex(t => t.id === result.draggableId);
      newTasks[taskIndex].status = destination.droppableId as TaskItem['status'];
      setTasks(newTasks);
      saveTasks(newTasks);
    }
  };

  const getTasksByStatus = (status: string) => tasks.filter(t => t.status === status);

  return (
    <div style={{ padding: 24, minHeight: 'calc(100vh - 100px)' }}>
      <Title level={3} style={{ marginBottom: 24, color: '#262626' }}>
        Kanban Board
      </Title>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          {Object.entries(COLUMNS).map(([statusId, config]) => {
            const columnTasks = getTasksByStatus(statusId);
            return (
              <div
                key={statusId}
                style={{
                  flex: 1,
                  background: '#f4f5f7', 
                  padding: '12px',
                  borderRadius: '4px',
                  minWidth: '300px'
                }}
              >
                {/* Tiêu đề cột */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: `2px solid ${config.color}`
                }}>
                  <Title level={5} style={{ margin: 0, color: '#172b4d' }}>
                    {config.title}
                  </Title>
                  <Badge
                    count={columnTasks.length}
                    style={{ backgroundColor: '#dfe1e6', color: '#172b4d', fontWeight: 'bold' }}
                  />
                </div>

                {/* Khu vực chứa thẻ Task */}
                <Droppable droppableId={statusId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        minHeight: '200px',
                        background: snapshot.isDraggingOver ? '#e9ecef' : 'transparent',
                        transition: 'background 0.2s ease',
                        borderRadius: '4px'
                      }}
                    >
                      {columnTasks.map((task, index) => {
                        const isOverdue = moment(task.deadline).isBefore(moment(), 'day') && task.status !== 'done';
                        
                        return (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                size="small"
                                style={{
                                  marginBottom: '12px',
                                  borderRadius: '2px', // Ép góc vuông cứng cáp
                                  boxShadow: snapshot.isDragging 
                                    ? '0 8px 16px rgba(0,0,0,0.15)' 
                                    : '0 1px 2px rgba(0,0,0,0.1)',
                                  border: 'none',
                                  cursor: 'grab',
                                  ...provided.draggableProps.style
                                }}
                                bodyStyle={{ padding: '12px' }}
                              >
                                {/* Ưu tiên */}
                                <div style={{ marginBottom: 8 }}>
                                  <Tag color={task.priority === 'Cao' ? 'error' : task.priority === 'Trung bình' ? 'warning' : 'success'}>
                                    {task.priority}
                                  </Tag>
                                </div>

                                {/* Tên Task */}
                                <div style={{ fontWeight: 500, color: '#172b4d', marginBottom: 12, fontSize: '15px' }}>
                                  {task.title}
                                </div>

                                {/* Footer của thẻ: Icon mô tả & Deadline */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Space size="small" style={{ color: '#6b778c' }}>
                                    {task.description && <AlignLeftOutlined title="Có mô tả" />}
                                  </Space>
                                  <Space size="small" style={{ color: isOverdue ? '#cf1322' : '#6b778c' }}>
                                    <ClockCircleOutlined />
                                    <Text type={isOverdue ? 'danger' : 'secondary'} style={{ fontSize: '12px' }}>
                                      {moment(task.deadline).format('DD/MM/YYYY')}
                                    </Text>
                                  </Space>
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;