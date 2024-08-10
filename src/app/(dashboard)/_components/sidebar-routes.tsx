"use client"

import { BarChart, Compass, Layout, List } from "lucide-react"
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
     {
        icon: Layout,
        label: "Dashboard",
        href: "/home"
     },
     {
        icon: Compass,
        label: "Browse",
        href: "/home/search"
     }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/home/teacher/courses"
     },
     {
        icon: BarChart,
        label: "Analytics",
        href: "/home/teacher/analytics"
     }
]

export const SidebarRoutes = () => {

    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/home/teacher");
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}