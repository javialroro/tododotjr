import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  boolean,
  text,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `tododotjr_${name}`);

export const courses = createTable(
  "course",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    color: varchar("color", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (course) => ({
    nameIndex: index("course_name_idx").on(course.name),
  }),
);

export const tasks = createTable(
  "task",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    title: text("title").notNull(),
    completed: boolean("completed").default(false).notNull(),
    courseId: integer("course_id")
      .references(() => courses.id)
      .notNull(),
    dueDate: timestamp("due_date", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (task) => ({
    courseIdIndex: index("task_course_id_idx").on(task.courseId),
    dueDateIndex: index("task_due_date_idx").on(task.dueDate),
  }),
);
