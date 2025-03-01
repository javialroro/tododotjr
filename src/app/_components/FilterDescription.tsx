import type { Course } from "../types";

interface FilterDescriptionProps {
  status: "all" | "completed" | "pending";
  courseId: string | "all";
  courses: Course[];
}

export function FilterDescription({
  status,
  courseId,
  courses,
}: FilterDescriptionProps) {
  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground">
        Mostrando:{" "}
        <span className="font-medium">
          {status === "all"
            ? "Todas las tareas"
            : status === "completed"
              ? "Tareas completadas"
              : "Tareas pendientes"}
        </span>
        {courseId !== "all" && (
          <>
            {" "}
            de{" "}
            <span className="font-medium">
              {courses.find((c) => c.id.toString() === courseId)?.name}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
