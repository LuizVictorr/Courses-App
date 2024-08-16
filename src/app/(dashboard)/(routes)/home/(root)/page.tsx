import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { GetDashboardCourses } from "../../../../../../actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {

  const { userId } = auth();

  if (!userId) {
    return redirect("/home")
  }

  const { completedCourses, coursesInProgress } = await GetDashboardCourses(userId)

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="Em progresso"
          numberOfItems={coursesInProgress.length}
          variant="default"
        />
        <InfoCard
          icon={CheckCircle}
          label="Completo"
          numberOfItems={coursesInProgress.length}
          variant="success"
        />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}
