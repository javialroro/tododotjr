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

interface TaskFormProps {
  courses: Course[];
  onSubmit: (data: {
    title: string;
    courseId: string;
    dueDate?: string;
  }) => void;
}

export function TaskForm({ courses, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "" || courseId === "") return;

    onSubmit({
      title: title.trim(),
      courseId,
      dueDate: dueDate || undefined,
    });

    setTitle("");
    setDueDate("");
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
            <SelectItem key={course.id} value={course.id}>
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
      />
      <Button onClick={handleSubmit}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Añadir
      </Button>
    </div>
  );
}
