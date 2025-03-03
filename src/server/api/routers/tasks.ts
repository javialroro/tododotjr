import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { tasks } from "~/server/db/schema";

export const tasksRouter = createTRPCRouter({
  getMyTasks: protectedProcedure
    .query(async ({ ctx }) => {
      const tasksItems = await ctx.db.query.tasks.findMany({
        where: eq(tasks.userId, ctx.userId),
      });
      return tasksItems;
    }),
  createTask: publicProcedure
    .input(
      z.object({
        title: z.string(),
        courseId: z.number(),
        dueDate: z.date().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Due Date received:", input.dueDate);
      if (!ctx.userId) throw new Error("User ID is required");
      const task = await ctx.db.insert(tasks).values({
        userId: ctx.userId,
        title: input.title,
        courseId: input.courseId,
        dueDate: input.dueDate,
      });
      return task;
    }),
  toggleTaskCompletion: publicProcedure
    .input(
      z.object({
        taskId: z.number(),
        completed: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tasks)
        .set({
          completed: !input.completed,
        })
        .where(eq(tasks.id, input.taskId));
    }),

  deleteTask: publicProcedure
    .input(z.object({ taskId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId) throw new Error("User ID is required");
      const task = await ctx.db
        .delete(tasks)
        .where(and(eq(tasks.id, input.taskId), eq(tasks.userId, ctx.userId)));
      return task;
    }),
});
