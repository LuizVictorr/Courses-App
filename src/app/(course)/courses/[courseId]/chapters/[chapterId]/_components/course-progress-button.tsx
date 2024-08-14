"use client"

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "../../../../../../../../hooks/use-confetti-store";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseProgressButtonProps {
    chapterId: string;
    courseId: string;
    isCompleted?: boolean;
    nextChapterId?: string;
}

export const CourseProgressButton = ({chapterId, nextChapterId, courseId, isCompleted}: CourseProgressButtonProps) => {
    
    const Icon = isCompleted ? XCircle : CheckCircle
    const router = useRouter()
    const confetti = useConfettiStore()
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        try {

            setIsLoading(true);

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted
            })

            if (!isCompleted && !nextChapterId) {
                confetti.onOpen();
            }

            if (!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }

            toast.success("Progressp Atualizado")
            router.refresh();

        } catch {
            toast.error("Algo deu errado")
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <Button
        onClick={onClick}
            type="button"
            variant={isCompleted ? "outline" : "success"}
            className="w-full md:w-auto"
        >
            {isCompleted ? "Não Completo" : "Marque concluido"}
            <Icon className="h-4 w-4 ml-2"/>
        </Button>
    )
}