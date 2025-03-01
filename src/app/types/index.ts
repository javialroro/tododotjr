export type Course = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  courseId: string;
  dueDate?: string;
};
