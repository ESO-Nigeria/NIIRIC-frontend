"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PenLine, Heart, BookUp } from "lucide-react"
import { PencilWithLine } from "@/assets/icons/icons"
import { ResearchArea } from "../types/profile"

type ResearchAreaCardProps = {
  data: ResearchArea
  onEdit?: () => void
  loading?: boolean
}
export function ResearchAreaCard({ data, onEdit, loading = false }: ResearchAreaCardProps) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#FEE4E2] text-[#D92D20]  ">
          <BookUp className="h-4 w-4" />
        </div>
        <h2 className="text-lg font-medium">Research Area</h2>
      </div>

      {/* Card */}
      <Card className="p-4 border rounded-md shadow-none">
        <div className="flex flex-wrap ">
          {loading ? (
            <p className="text-sm text-gray-400">Loading Reasearch Area...</p>
          ) : (
          <p className="text-sm text-[#475467]">{data?.description}</p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t my-2" />

        {/* Edit button */}
        <div className="flex justify-end">
          <Button
            variant="link"
            size="sm"
            onClick={onEdit}
            className="text-primary-green underline  flex items-center gap-1 font-normal"
          >
            <PencilWithLine className="h-4 w-4" />
            Edit Research Area
          </Button>
        </div>
      </Card>
    </div>
  )
}
