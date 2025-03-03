"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { Header } from "./Header";
import { CourseManagement } from "./CourseManagement";
import { TaskFilters } from "./TaskFilters";
import { FilterDescription } from "./FilterDescription";
import { useTodoApp } from "~/hooks/useTodoApp";
import type { FilterState } from "~/hooks/useTodoApp";

export function TodoAppContent() {
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

  return (
    <div className="container mx-auto max-w-4xl p-4">
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
