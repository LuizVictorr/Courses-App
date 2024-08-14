import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";


interface GetChapterProps {
    userId: string;
    couserId: string;
    chapterId: string;
}

export const GetChapter = async ({ userId, couserId, chapterId }: GetChapterProps) => {
    try {

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: couserId,
                }
            }
        });

        const course = await db.course.findUnique({
            where: {
                isPublished: true,
                id: couserId,
            },
            select: {
                price: true
            }
        })

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            }
        })

        if (!chapter || !course) {
            throw new Error("Aula do curso não encontrada")
        }

        let muxData = null;
        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;

        if (purchase) {
            attachments = await db.attachment.findMany({
                where: {
                    courseId: couserId
                }
            });
        }

        if (chapter.isFree || purchase) {
            muxData = await db.muxData.findUnique({
                where: {
                    chapterId: chapterId,
                }
            });

            nextChapter = await db.chapter.findFirst({
                where: {
                    courseId: couserId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position
                    }
                },
                orderBy: {
                    position: "asc",
                }
            });
        }

        const userProgress = await db.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId: userId,
                    chapterId: chapterId,
                }
            }
        });

        return {
            chapter,
            course,
            muxData,
            attachments,
            nextChapter,
            userProgress,
            purchase,
        };

    } catch (error) {
        console.log("[GET_CHAPTER]", error);
        return {
            chapter: null,
            course: null,
            muxData: null,
            attachments: [],
            nextChapter: null,
            UserProgress: null,
            purchase: null,
        }
    }
}