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
import type { FilterState } from "~/hooks/useTodoApp";

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
    <div className="container mx-auto max-w-4xl p-4">
      <TopNav />
      <Card className="mb-8">
        <Header />
        <CardContent>
          <div className="flex flex-col gap-4">
            <TaskForm
              courses={courses ?? []}
              onSubmit={addTask}
              isLoading={isCreatingTask}
            />
            <CourseManagement
              showAddCourse={showAddCourse}
              onAddCourse={addCourse}
              onToggleForm={setShowAddCourse}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="pending"
        value={filter.status}
        onValueChange={(value) =>
          setFilter((prev) => ({
            ...prev,
            status: value as "all" | "completed" | "pending",
          }))
        }
        className="w-full"
      >
        <TaskFilters
          filter={filter}
          courses={courses ?? []}
          onFilterChange={setFilter}
        />

        <TabsContent value={filter.status} className="mt-0">
          <Card>
            <CardContent className="p-4">
              <FilterDescription
                status={filter.status}
                courseId={filter.courseId}
                courses={courses ?? []}
              />
              <TaskList
                tasks={filteredTasks}
                courses={courses ?? []}
                onToggleComplete={toggleTaskCompletion}
                onDelete={handleDeleteTask}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
