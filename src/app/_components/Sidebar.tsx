import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Trash2, Plus, X } from "lucide-react";
import { cn } from "~/lib/utils";
import type { Course } from "../types";
import { CourseForm } from "./CourseForm";

interface SidebarProps {
  courses: Course[];
  showAddCourse: boolean;
  onAddCourse: (data: { name: string; color: string }) => void;
  onDeleteCourse: (courseId: number) => void;
  onToggleForm: (show: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  courses,
  showAddCourse,
  onAddCourse,
  onDeleteCourse,
  onToggleForm,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="sticky top-0 flex items-center justify-between bg-background p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Cursos</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleForm(true)}
              className="hover:bg-secondary"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          {showAddCourse ? (
            <CourseForm
              onSubmit={onAddCourse}
              onCancel={() => onToggleForm(false)}
            />
          ) : (
            <div className="space-y-2">
              {courses.map((course) => (
                <Card key={course.id} className="p-3 hover:bg-accent/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 flex-shrink-0 rounded-full ${course.color} shadow-sm ring-1 ring-border`}
                      />
                      <span className="truncate text-sm">{course.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => onDeleteCourse(course.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
