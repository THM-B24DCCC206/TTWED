export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  priority: 'Cao' | 'Trung bình' | 'Thấp';
  status: 'todo' | 'inprogress' | 'done';
  tags?: string[];
}

export const getTasks = (): TaskItem[] => {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (tasks: TaskItem[]): void => { 
  localStorage.setItem('tasks', JSON.stringify(tasks));
};