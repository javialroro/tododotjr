import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import type { Course, Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  courses: Course[];
  onToggleComplete: (taskId: number, completed: boolean) => void;
  onDelete: (taskId: number) => void;
  isLoading?: boolean;
}

export function TaskList({
  tasks,
  courses,
  onToggleComplete,
  onDelete,
}: TaskListProps) {
  const getCourseById = (courseId: number) => {
    return courses.find((course) => course.id === courseId);
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: "Vencida", emoji: "⚠️", isOverdue: true };
    } else if (diffDays === 0) {
      return { text: "Vence hoy", emoji: "⏰", isOverdue: false };
    } else if (diffDays === 1) {
      return { text: "Vence mañana", emoji: "📅", isOverdue: false };
    } else {
      return {
        text: `${diffDays} días restantes`,
        emoji: "📆",
        isOverdue: false,
      };
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No hay tareas para mostrar
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => {
        const course = getCourseById(task.courseId);
        return (
          <li
            key={task.id}
            className={`flex items-center rounded-lg border p-3 ${task.completed ? "bg-muted/50" : ""}`}
          >
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 h-6 w-6 rounded-full p-0"
              onClick={() => onToggleComplete(task.id, task.completed)}
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </Button>
            <div className="flex-1">
              <p
                className={
                  task.completed ? "text-muted-foreground line-through" : ""
                }
              >
                {task.title}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`${course?.color} bg-opacity-20 text-xs`}
                >
                  {course?.name}
                </Badge>
                {task.dueDate && (
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getDaysRemaining(task.dueDate).isOverdue ? "text-red-500" : ""}`}
                  >
                    {formatDate(task.dueDate)} -{" "}
                    {getDaysRemaining(task.dueDate).emoji}{" "}
                    {getDaysRemaining(task.dueDate).text}
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
