import { useState } from "react";
import { api } from "~/trpc/react";

export interface FilterState {
  status: "all" | "completed" | "pending";
  courseId: string | "all";
}

export function useTodoApp() {
  const [filter, setFilter] = useState<FilterState>({
    status: "pending",
    courseId: "all",
  });
  const [showAddCourse, setShowAddCourse] = useState(false);

  const userId = "user123"; // TODO: Replace with auth

  // Queries
  const { data: tasks, refetch: refetchTasks } = api.tasks.getMyTasks.useQuery({
    userId,
  });

  const { data: courses, refetch: refetchCourses } =
    api.courses.getMyCourses.useQuery({
      userId,
    });

  // Mutations
  const createTask = api.tasks.createTask.useMutation({
    onSuccess: () => refetchTasks(),
  });

  const toggleTask = api.tasks.toggleTaskCompletion.useMutation({
    onSuccess: () => refetchTasks(),
  });

  const deleteTask = api.tasks.deleteTask.useMutation({
    onSuccess: () => refetchTasks(),
  });

  const createCourse = api.courses.createCourse.useMutation({
    onSuccess: () => {
      setShowAddCourse(false);
      refetchCourses();
    },
  });

  // Handlers
  const addTask = (data: {
    title: string;
    courseId: string;
    dueDate?: string;
  }) => {
    void createTask.mutate({
      userId,
      title: data.title,
      courseId: Number(data.courseId),
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    });
  };

  const toggleTaskCompletion = (taskId: number, completed: boolean) => {
    void toggleTask.mutate({
      userId,
      taskId,
      completed,
    });
  };

  const handleDeleteTask = (taskId: number) => {
    void deleteTask.mutate({
      userId,
      taskId,
    });
  };

  const addCourse = (data: { name: string; color: string }) => {
    void createCourse.mutate({
      userId,
      name: data.name,
      color: data.color,
    });
  };

  const filteredTasks =
    tasks?.filter((task) => {
      const statusMatch =
        filter.status === "all"
          ? true
          : filter.status === "completed"
            ? task.completed
            : !task.completed;

      const courseMatch =
        filter.courseId === "all"
          ? true
          : task.courseId.toString() === filter.courseId;

      return statusMatch && courseMatch;
    }) ?? [];

  return {
    // State
    filter,
    setFilter,
    showAddCourse,
    setShowAddCourse,

    // Data
    tasks,
    courses,
    filteredTasks,

    // Loading states
    isLoading: tasks === undefined,
    isCreatingTask: createTask.isPending,

    // Actions
    addTask,
    toggleTaskCompletion,
    handleDeleteTask,
    addCourse,
  };
}
