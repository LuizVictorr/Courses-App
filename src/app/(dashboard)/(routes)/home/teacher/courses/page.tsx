import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CoursesPage = async () => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/home")
    }

    const courses = await db.course.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createAt: "desc"
        }
    })
    
    return ( 
        <div className="p-6">
            <DataTable columns={columns} data={courses} />
        </div>
     );
}
 
export default CoursesPage;