import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
    return ( 
        <div className="p-6">
            <Link href="/home/teacher/create">
                <Button>
                    Novo Curso
                </Button>
            </Link>
        </div>
     );
}
 
export default CoursesPage;