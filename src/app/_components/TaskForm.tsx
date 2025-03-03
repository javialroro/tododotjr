import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Course } from "../types";
import { useState } from "react";

interface TaskFormProps {
  courses: Course[];
  onSubmit: (data: {
    title: string;
    courseId: string;
    dueDate?: string;
  }) => void;
  isLoading?: boolean;
}

export function TaskForm({ courses, onSubmit, isLoading }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [dueDate, setDueDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const handleSubmit = () => {
    if (title.trim() === "" || courseId === "") return;

    onSubmit({
      title: title.trim(),
      courseId,
      dueDate: dueDate || undefined,
    });

    setTitle("");
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setDueDate(`${year}-${month}-${day}`);
    setCourseId("");
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Input
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow"
      />
      <Select value={courseId} onValueChange={setCourseId}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Seleccionar curso" />
        </SelectTrigger>
        <SelectContent>
          {courses.map((course) => (
            <SelectItem key={course.id} value={course.id.toString()}>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${course.color}`}></div>
                {course.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full sm:w-[180px]"
        lang="es"
        data-date-format="dd/mm/yyyy"
      />
      <Button onClick={handleSubmit} disabled={isLoading}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Añadir
      </Button>
    </div>
  );
}
