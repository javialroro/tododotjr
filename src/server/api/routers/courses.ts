import { and, eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { courses, tasks } from "~/server/db/schema";

export const coursesRouter = createTRPCRouter({
  getMyCourses: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    if (!userId) throw new Error("Unauthorized");

    const coursesItems = await ctx.db.query.courses.findMany({
      where: eq(courses.userId, userId),
    });
    return coursesItems;
  }),
  createCourse: protectedProcedure
    .input(z.object({ name: z.string(), color: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const course = await ctx.db.insert(courses).values({
        userId: ctx.userId,
        name: input.name,
        color: input.color,
      });
      return course;
    }),
  deleteCourse: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Primero borramos todas las tareas asociadas al curso
      await ctx.db
        .delete(tasks)
        .where(
          and(eq(tasks.courseId, input.courseId), eq(tasks.userId, ctx.userId)),
        );
      // Luego borramos el curso
      const course = await ctx.db
        .delete(courses)
        .where(
          and(eq(courses.id, input.courseId), eq(courses.userId, ctx.userId)),
        );
      return course;
    }),
});
