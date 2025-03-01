import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { tasks } from "~/server/db/schema";

export const tasksRouter = createTRPCRouter({
  getMyTasks: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const tasksItems = await ctx.db.query.tasks.findMany({
        where: eq(tasks.userId, input.userId),
      });
      return tasksItems;
    }),
  createTask: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        title: z.string(),
        courseId: z.number(),
        dueDate: z.date().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.insert(tasks).values({
        userId: input.userId,
        title: input.title,
        courseId: input.courseId,
      });
      return task;
    }),
  toggleTaskCompletion: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        taskId: z.number(),
        completed: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db
        .update(tasks)
        .set({
          completed: !input.completed,
        })
        .where(eq(tasks.id, input.taskId));
    }),

  deleteTask: publicProcedure
    .input(z.object({ userId: z.string(), taskId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db
        .delete(tasks)
        .where(and(eq(tasks.id, input.taskId), eq(tasks.userId, input.userId)));
      return task;
    }),
});
