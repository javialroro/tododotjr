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
import type { Course, Task } from "./types";

// TODO: Mover esto a la base de datos
const initialCourses: Course[] = [
  { id: "math101", name: "Matemáticas", color: "bg-blue-500" },
  { id: "phys101", name: "Física", color: "bg-red-500" },
  { id: "chem101", name: "Química", color: "bg-green-500" },
  { id: "cs101", name: "Programación", color: "bg-purple-500" },
  { id: "eng101", name: "Inglés", color: "bg-yellow-500" },
];

// TODO: Mover esto a la base de datos
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Estudiar para el examen de cálculo",
    completed: false,
    courseId: "math101",
    dueDate: "2025-03-05",
  },
  {
    id: "2",
    title: "Completar laboratorio de física",
    completed: true,
    courseId: "phys101",
    dueDate: "2025-03-02",
  },
  {
    id: "3",
    title: "Leer capítulo 5 de química orgánica",
    completed: false,
    courseId: "chem101",
    dueDate: "2025-03-10",
  },
];

export default function TodoApp() {
  // TODO: Reemplazar con llamadas a la API
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAddCourse, setShowAddCourse] = useState(false);

  // TODO: Implementar con la API
  const addTask = (data: {
    title: string;
    courseId: string;
    dueDate?: string;
  }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      completed: false,
      courseId: data.courseId,
      dueDate: data.dueDate,
    };

    setTasks([...tasks, newTask]);
  };

  // TODO: Implementar con la API
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // TODO: Implementar con la API
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // TODO: Implementar con la API
  const addCourse = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-red-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCourse: Course = {
      id: Date.now().toString(),
      name,
      color: randomColor || "bg-gray-500",
    };

    setCourses([...courses, newCourse]);
    setShowAddCourse(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "completed") return task.completed;
    if (activeFilter === "pending") return !task.completed;
    return task.courseId === activeFilter;
  });

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
            <TaskForm courses={courses} onSubmit={addTask} />

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
        value={activeFilter}
        onValueChange={setActiveFilter}
        className="w-full"
      >
        <TabsList className="mb-4 grid grid-cols-3">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
        </TabsList>

        <div className="mb-4 flex flex-wrap gap-2">
          {courses.map((course) => (
            <Badge
              key={course.id}
              variant={activeFilter === course.id ? "default" : "outline"}
              className={`cursor-pointer ${
                activeFilter === course.id
                  ? course.color.replace("bg-", "bg-opacity-90")
                  : ""
              }`}
              onClick={() => setActiveFilter(course.id)}
            >
              {course.name}
            </Badge>
          ))}
        </div>

        <TabsContent value={activeFilter} className="mt-0">
          <Card>
            <CardContent className="p-4">
              <TaskList
                tasks={filteredTasks}
                courses={courses}
                onToggleComplete={toggleTaskCompletion}
                onDelete={deleteTask}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
