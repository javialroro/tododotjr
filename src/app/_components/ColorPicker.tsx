import { cn } from "~/lib/utils";

interface ColorPickerProps {
  selected: string;
  onSelect: (color: string) => void;
}

const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500"
];

export function ColorPicker({ selected, onSelect }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">
        Color del curso
      </label>
      <div className="grid grid-cols-6 gap-x-4 gap-y-2 rounded-lg border p-3">
        {colors.map((color) => (
          <button
            key={color}
            className={cn(
              "h-6 w-6 rounded-full shadow-sm ring-1 ring-border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring",
              color,
              selected === color && "scale-110 ring-2 ring-ring",
            )}
            onClick={() => onSelect(color)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
