import { db } from "@/lib/db";
import { use } from "react";


export const GetProgress = async ( userId: string, couserId: string): Promise<number> => {
    try {

        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId: couserId,
                isPublished: true,
            },
            select: {
                id: true,
            }
        });

        const publishedChapterIds = publishedChapters.map((chapter) => chapter.id)

        const validCompletedChapters = await db.userProgress.count({
            where: {
                userId: userId,
                chapterId: {
                    in: publishedChapterIds
                },
                isCompleted: true
            }
        });

        const progressPercentage = (validCompletedChapters/ publishedChapterIds.length) * 100

        return progressPercentage;

    } catch (error) {
        console.log("[GET_PROGRESS]", error);
        return 0;
    }
}