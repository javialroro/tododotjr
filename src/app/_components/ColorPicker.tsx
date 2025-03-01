import { Check } from "lucide-react";
import { cn } from "~/lib/utils";

const colors = [
  { name: "Rojo", value: "bg-red-500 text-red-500" },
  { name: "Verde", value: "bg-green-500 text-green-500" },
  { name: "Azul", value: "bg-blue-500 text-blue-500" },
  { name: "Amarillo", value: "bg-yellow-500 text-yellow-500" },
  { name: "Morado", value: "bg-purple-500 text-purple-500" },
  { name: "Rosa", value: "bg-pink-500 text-pink-500" },
  { name: "Naranja", value: "bg-orange-500 text-orange-500" },
  { name: "Cyan", value: "bg-cyan-500 text-cyan-500" },
];

interface ColorPickerProps {
  selected: string;
  onSelect: (color: string) => void;
}

export function ColorPicker({ selected, onSelect }: ColorPickerProps) {
  return (
    <div className="rounded-lg border p-3">
      <label className="mb-2 block text-sm font-medium text-muted-foreground">
        Color del curso
      </label>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {colors.map((color) => (
          <button
            key={color.value}
            className={cn(
              "group relative h-8 w-8 overflow-hidden rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              color.value,
              selected === color.value && "ring-2 ring-ring ring-offset-2",
            )}
            onClick={() => onSelect(color.value)}
            title={color.name}
          >
            {selected === color.value && (
              <Check className="absolute inset-0 m-auto h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            )}
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
