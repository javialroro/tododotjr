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
                  <span className="text-xs text-muted-foreground">
                    Fecha límite: {task.dueDate?.toLocaleDateString()}
                  </span>
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
