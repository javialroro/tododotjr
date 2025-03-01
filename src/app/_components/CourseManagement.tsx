import { Button } from "~/components/ui/button";
import { CourseForm } from "./CourseForm";

interface CourseManagementProps {
  showAddCourse: boolean;
  onAddCourse: (data: { name: string; color: string }) => void;
  onToggleForm: (show: boolean) => void;
}

export function CourseManagement({
  showAddCourse,
  onAddCourse,
  onToggleForm,
}: CourseManagementProps) {
  return (
    <div className="mt-2">
      {showAddCourse ? (
        <CourseForm
          onSubmit={onAddCourse}
          onCancel={() => onToggleForm(false)}
        />
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onToggleForm(true)}
          className="mt-2"
        >
          Añadir nuevo curso
        </Button>
      )}
    </div>
  );
}
