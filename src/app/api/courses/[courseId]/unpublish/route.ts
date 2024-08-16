import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: {courseId: string; chapterId: string} }
) {
    try {

        const { userId } = auth()

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Não Autorizado", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });

        if (!course) {
            return new NextResponse("Não encontrado", { status: 404 });
        }

        const unpublishedCourse =  await db.course.update({
            where: {
                id: params.courseId,
                userId: userId,
            },
            data: {
                isPublished: false,
            }
        });

        return NextResponse.json(unpublishedCourse)

    } catch (error) {
        console.log("[COURSE_ID_UNPUBLISH]", error);
        return new NextResponse("Erro Interno", { status: 500 })
    }
}
