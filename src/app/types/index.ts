export type Course = {
  id: number;
  name: string;
  color: string;
};

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  courseId: number;
  dueDate: Date | null;
  createdAt: Date;
  userId: string;
};
