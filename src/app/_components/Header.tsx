import { GraduationCap } from "lucide-react";
import { CardHeader, CardTitle } from "~/components/ui/card";

export function Header() {
  return (
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 text-2xl font-bold">
        <GraduationCap className="h-6 w-6" />
        Tareas Universitarias
      </CardTitle>
    </CardHeader>
  );
}
