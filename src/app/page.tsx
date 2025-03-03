"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { TaskForm } from "./_components/TaskForm";
import { TaskList } from "./_components/TaskList";
import { Header } from "./_components/Header";
import { CourseManagement } from "./_components/CourseManagement";
import { TaskFilters } from "./_components/TaskFilters";
import { FilterDescription } from "./_components/FilterDescription";
import { useTodoApp } from "~/hooks/useTodoApp";
import { TopNav } from "./_components/TopNav";
import { ProtectedRoute } from "./_components/ProtectedRoute";
import type { FilterState } from "~/hooks/useTodoApp";
import { TodoAppContent } from "./_components/TodoAppContent";

export default function TodoApp() {
  const {
    filter,
    setFilter,
    showAddCourse,
    setShowAddCourse,
    courses,
    filteredTasks,
    isLoading,
    isCreatingTask,
    addTask,
    toggleTaskCompletion,
    handleDeleteTask,
    addCourse,
  } = useTodoApp();

  //if (isLoading) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <TopNav />
      <TodoAppContent />
    </ProtectedRoute>
  );
}
