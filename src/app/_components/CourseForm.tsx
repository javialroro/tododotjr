import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface CourseFormProps {
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export function CourseForm({ onSubmit, onCancel }: CourseFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim() === "") return;
    onSubmit(name.trim());
    setName("");
  };

  return (
    <div className="mt-2 flex gap-2">
      <Input
        placeholder="Nombre del curso"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-grow"
      />
      <Button onClick={handleSubmit} variant="outline">
        Añadir
      </Button>
      <Button onClick={onCancel} variant="ghost">
        Cancelar
      </Button>
    </div>
  );
}
