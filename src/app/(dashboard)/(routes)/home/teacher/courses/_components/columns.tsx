"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Course } from "@prisma/client"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link"




export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Titulo
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        )
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Preço
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        )
    },
    cell: ({ row }) => {
        const price = parseFloat(row.getValue("price") || "0");
        const formatted = new Intl.NumberFormat("pt-BR" , {
            style: "currency",
            currency: "BRL"
        }).format(price);

        return <div>{formatted}</div>
    }
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Publicado
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        )
    },
    cell: ({ row }) => {
        const isPublished = row.getValue("isPublished") || false

        return (
            <Badge className={cn(
                "bg-slate-500",
                isPublished && "bg-sky-700"
            )}>
                {isPublished ? "Publicado" :  "Rascunho"}
            </Badge>
        )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
        const { id } = row.original;

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-4 w-8 p-0">
                        <span className="sr-only">
                            Open Menu
                        </span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <Link href={`/home/teacher/courses/${id}`}>
                        <DropdownMenuItem className="flex items-center">
                            <Pencil className="h-4 w-4 mx-2"/>
                            Editar
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  }
]
