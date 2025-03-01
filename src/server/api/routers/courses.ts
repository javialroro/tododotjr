import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { courses } from "~/server/db/schema";

export const coursesRouter = createTRPCRouter({
    getMyCourses: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
        const coursesItems = await ctx.db.query.courses.findMany({
            where: eq(courses.userId, input.userId),
        });
        return coursesItems;
    }),
    createCourse: publicProcedure
    .input(z.object({ userId: z.string(), name: z.string(), color: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const course = await ctx.db.insert(courses).values({
            userId: input.userId,
            name: input.name,
            color: input.color,
        });
        return course;
    }),
    deleteCourse: publicProcedure
    .input(z.object({ userId: z.string(), courseId: z.number() }))
    .mutation(async ({ ctx, input }) => {
        const course = await ctx.db.delete(courses).where(and(eq(courses.id, input.courseId), eq(courses.userId, input.userId)));
        return course;
    }),
});
