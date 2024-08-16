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

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })

        if (!ownCourse) {
            return new NextResponse("Não Autorizado", { status: 401 });
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
        })

        const muxData = await db.muxData.findUnique({
            where: {
                chapterId: params.chapterId,
            }
        });

        if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
            return new NextResponse("Faltando campos obirgatórios", { status: 400 });
        }

        const publidhChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                isPublished: true,
            }
        })

        return NextResponse.json(publidhChapter);

    } catch (error) {
        console.log("[CHAPTER_PUBLISH]", error);
        return new NextResponse("Erro Interno", { status: 500 })
    }
}