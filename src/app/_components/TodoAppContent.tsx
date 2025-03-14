"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { Header } from "./Header";
import { TaskFilters } from "./TaskFilters";
import { FilterDescription } from "./FilterDescription";
import { useTodoApp } from "~/hooks/useTodoApp";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { useState } from "react";
import type { FilterState } from "~/hooks/useTodoApp";

export function TodoAppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    handleDeleteCourse,
  } = useTodoApp();

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav onOpenSidebar={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <Sidebar
          courses={courses ?? []}
          showAddCourse={showAddCourse}
          onAddCourse={addCourse}
          onDeleteCourse={handleDeleteCourse}
          onToggleForm={setShowAddCourse}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-auto bg-background">
          <div className="container mx-auto max-w-4xl p-4">
            <Card className="mb-8">
              <Header />
              <CardContent>
                <TaskForm
                  courses={courses ?? []}
                  onSubmit={addTask}
                  isLoading={isCreatingTask}
                />
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
        </main>
      </div>
    </div>
  );
}
