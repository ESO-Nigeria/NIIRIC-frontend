import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PublicationCardSkeleton() {
  return (
    <Card className="shadow-none mb-4 gap-3 rounded-xl p-6 animate-in fade-in-0 duration-300">
      {/* Header: Avatar + Author Info + Options */}
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-5 rounded-md" />
      </div>

      {/* Image Placeholder */}
      <div className="mt-4">
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>

      {/* Title */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Tags */}
      <div className="flex gap-2 mt-3">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-5">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </Card>
  )
}
