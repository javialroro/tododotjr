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

  // Queries
  const { data: tasks, refetch: refetchTasks } =
    api.tasks.getMyTasks.useQuery();

  const { data: courses, refetch: refetchCourses } =
    api.courses.getMyCourses.useQuery();

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

  const deleteCourse = api.courses.deleteCourse.useMutation({
    onSuccess: () => {
      refetchCourses();
      refetchTasks();
    },
  });

  // Handlers
  const addTask = (data: {
    title: string;
    courseId: string;
    dueDate?: string;
  }) => {
    let dueDate = null;
    if (data.dueDate) {
      // Creamos la fecha usando los componentes locales
      const [year, month, day] = data.dueDate.split("-");
      if (year && month && day) {
        // Creamos la fecha usando la zona horaria local
        dueDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          23,
          59,
          59,
          999,
        );
      }
    }
    console.log("Due Date being sent:", dueDate);

    void createTask.mutate({
      title: data.title,
      courseId: Number(data.courseId),
      dueDate,
    });
  };

  const toggleTaskCompletion = (taskId: number, completed: boolean) => {
    void toggleTask.mutate({
      taskId,
      completed,
    });
  };

  const handleDeleteTask = (taskId: number) => {
    void deleteTask.mutate({
      taskId,
    });
  };

  const addCourse = (data: { name: string; color: string }) => {
    void createCourse.mutate({
      name: data.name,
      color: data.color,
    });
  };

  const handleDeleteCourse = (courseId: number) => {
    void deleteCourse.mutate({
      courseId,
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
    handleDeleteCourse,
  };
}
