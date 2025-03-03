"use client";

import { ProtectedRoute } from "./_components/ProtectedRoute";
import { TodoAppContent } from "./_components/TodoAppContent";

export default function TodoApp() {
  return (
    <ProtectedRoute>
      <TodoAppContent />
    </ProtectedRoute>
  );
}
