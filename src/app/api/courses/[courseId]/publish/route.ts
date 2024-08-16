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
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    }
                }
            }
        });

        if (!course) {
            return new NextResponse("Não encontrado", { status: 404 });
        }

        const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

        if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter ) {
            return new NextResponse("Faltando campos obrigaatórios", { status: 401 });
        }

        const publishedCourse =  await db.course.update({
            where: {
                id: params.courseId,
                userId: userId,
            },
            data: {
                isPublished: true,
            }
        });

        return NextResponse.json(publishedCourse)

    } catch (error) {
        console.log("[COURSE_ID_PUBLISH]", error);
        return new NextResponse("Erro Interno", { status: 500 })
    }
}
