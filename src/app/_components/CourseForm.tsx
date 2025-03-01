import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ColorPicker } from "./ColorPicker";

interface CourseFormProps {
  onSubmit: (data: { name: string; color: string }) => void;
  onCancel: () => void;
}

export function CourseForm({ onSubmit, onCancel }: CourseFormProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("bg-blue-500");

  const handleSubmit = () => {
    if (name.trim() === "") return;
    onSubmit({ name: name.trim(), color });
    setName("");
    setColor("bg-blue-500");
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Nombre del curso
        </label>
        <Input
          placeholder="Ej: Matemáticas, Física, etc."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <ColorPicker selected={color} onSelect={setColor} />

      <div className="flex justify-end gap-2 pt-2">
        <Button onClick={onCancel} variant="ghost">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="default">
          Guardar curso
        </Button>
      </div>
    </div>
  );
}
