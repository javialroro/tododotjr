"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TaskForm } from "./_components/TaskForm";
import { CourseForm } from "./_components/CourseForm";
import { TaskList } from "./_components/TaskList";
import { api } from "~/trpc/react";
import type { Course, Task } from "./types";
import { cn } from "~/lib/utils";

interface FilterState {
  status: "all" | "completed" | "pending";
  courseId: string | "all";
}

export default function TodoApp() {
  const [filter, setFilter] = useState<FilterState>({
    status: "all",
    courseId: "all",
  });
  const [showAddCourse, setShowAddCourse] = useState(false);

  // Obtener el userId (deberás implementar esto según tu sistema de autenticación)
  const userId = "user123"; // Temporal - reemplazar con tu sistema de auth

  // Queries y Mutations
  const { data: tasks, refetch: refetchTasks } = api.tasks.getMyTasks.useQuery({
    userId,
  });

  const { data: courses, refetch: refetchCourses } =
    api.courses.getMyCourses.useQuery({
      userId,
    });

  const createTask = api.tasks.createTask.useMutation({
    onSuccess: () => {
      refetchTasks();
    },
  });

  const toggleTask = api.tasks.toggleTaskCompletion.useMutation({
    onSuccess: () => {
      refetchTasks();
    },
  });

  const deleteTask = api.tasks.deleteTask.useMutation({
    onSuccess: () => {
      refetchTasks();
    },
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
    createTask.mutate({
      userId,
      title: data.title,
      courseId: Number(data.courseId),
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    });
  };

  const toggleTaskCompletion = (taskId: number, completed: boolean) => {
    toggleTask.mutate({
      userId,
      taskId,
      completed,
    });
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask.mutate({
      userId,
      taskId,
    });
  };

  const addCourse = (data: { name: string; color: string }) => {
    createCourse.mutate({
      userId,
      name: data.name,
      color: data.color,
    });
  };

  // Actualizar la función de filtrado
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

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <GraduationCap className="h-6 w-6" />
            Tareas Universitarias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <TaskForm
              courses={courses ?? []}
              onSubmit={addTask}
              isLoading={createTask.isPending}
            />

            {/* Course management */}
            <div className="mt-2">
              {showAddCourse ? (
                <CourseForm
                  onSubmit={addCourse}
                  onCancel={() => setShowAddCourse(false)}
                />
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddCourse(true)}
                  className="mt-2"
                >
                  Añadir nuevo curso
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="all"
        value={filter.status}
        onValueChange={(value) =>
          setFilter((prev) => ({
            ...prev,
            status: value as "all" | "completed" | "pending",
          }))
        }
        className="w-full"
      >
        <TabsList className="mb-4 grid grid-cols-3">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
        </TabsList>

        <div className="mb-4 flex flex-wrap gap-2">
          <Badge
            variant={filter.courseId === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter((prev) => ({ ...prev, courseId: "all" }))}
          >
            Todos los cursos
          </Badge>
          {(courses ?? []).map((course) => (
            <Badge
              key={course.id}
              variant={
                filter.courseId === course.id.toString() ? "default" : "outline"
              }
              className={cn(
                "cursor-pointer transition-colors",
                filter.courseId === course.id.toString()
                  ? `${course.color.split(" ")[0]} text-white hover:bg-opacity-90`
                  : `hover:${course.color.split(" ")[0]} hover:text-white border-${course.color.split(" ")[1]}`,
              )}
              onClick={() =>
                setFilter((prev) => ({
                  ...prev,
                  courseId: course.id.toString(),
                }))
              }
            >
              {course.name}
            </Badge>
          ))}
        </div>

        <TabsContent value={filter.status} className="mt-0">
          <Card>
            <CardContent className="p-4">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Mostrando:{" "}
                  <span className="font-medium">
                    {filter.status === "all"
                      ? "Todas las tareas"
                      : filter.status === "completed"
                        ? "Tareas completadas"
                        : "Tareas pendientes"}
                  </span>
                  {filter.courseId !== "all" && (
                    <>
                      {" "}
                      de{" "}
                      <span className="font-medium">
                        {
                          courses?.find(
                            (c) => c.id.toString() === filter.courseId,
                          )?.name
                        }
                      </span>
                    </>
                  )}
                </p>
              </div>
              <TaskList
                tasks={filteredTasks}
                courses={courses ?? []}
                onToggleComplete={toggleTaskCompletion}
                onDelete={handleDeleteTask}
                isLoading={tasks === undefined}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
