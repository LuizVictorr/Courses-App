"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {

    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/home/teacher");
    const isPlayerPage = pathname?.includes("/home/chapter");
    const isSearchPage = pathname === "/home/search"



    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput/>
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isPlayerPage ? (
                    <Link href="/home">
                        <Button size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2"/>
                            Exit
                        </Button>
                    </Link>
                ) : (
                    <Link href="/home/teacher/courses">
                        <Button size="sm" variant="ghost">
                            Teacher Mode
                        </Button>
                    </Link>
                )}
                <UserButton />
            </div>
        </>
    )
}