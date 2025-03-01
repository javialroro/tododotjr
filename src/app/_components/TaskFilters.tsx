import { Badge } from "~/components/ui/badge";
import { TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import type { Course } from "../types";

interface FilterState {
  status: "all" | "completed" | "pending";
  courseId: string | "all";
}

interface TaskFiltersProps {
  filter: FilterState;
  courses: Course[];
  onFilterChange: (filter: FilterState) => void;
}

export function TaskFilters({
  filter,
  courses,
  onFilterChange,
}: TaskFiltersProps) {
  return (
    <>
      <TabsList className="mb-4 grid grid-cols-3">
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="pending">Pendientes</TabsTrigger>
        <TabsTrigger value="completed">Completadas</TabsTrigger>
      </TabsList>

      <div className="mb-4 flex flex-wrap gap-2">
        <Badge
          variant={filter.courseId === "all" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onFilterChange({ ...filter, courseId: "all" })}
        >
          Todos los cursos
        </Badge>
        {courses.map((course) => (
          <Badge
            key={course.id}
            variant={
              filter.courseId === course.id.toString() ? "default" : "outline"
            }
            className={cn(
              "cursor-pointer transition-colors",
              filter.courseId === course.id.toString()
                ? `${course.color.split(" ")[0]} text-white hover:bg-opacity-90`
                : `hover:${course.color.split(" ")[0]} hover:text-white border-${
                    course.color.split(" ")[1]
                  }`,
            )}
            onClick={() =>
              onFilterChange({ ...filter, courseId: course.id.toString() })
            }
          >
            {course.name}
          </Badge>
        ))}
      </div>
    </>
  );
}
