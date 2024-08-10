"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"


const MarketingPage = () => {

    return (
        <div className="h-full flex items-center justify-center">
            <Link href={"/sign-in"}>
                <Button>
                    Get MAC free
                    <ArrowRight className="h-4 w-4 ml-2" /> 
                </Button>
            </Link>
        </div>
    )
}

export default MarketingPage;