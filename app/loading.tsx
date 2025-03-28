import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 border-b border-[#262626]">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24 hidden sm:inline-block" />
          <Skeleton className="h-8 w-16" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4 lg:space-y-6">
            {/* Video Player Skeleton */}
            <Skeleton className="aspect-video w-full" />

            {/* Mobile Tabs Skeleton */}
            <div className="lg:hidden">
              <Skeleton className="h-10 w-full mb-4" />
            </div>

            {/* Video Info Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>

              <Skeleton className="h-32 w-full" />
            </div>
          </div>

          {/* Chat Skeleton */}
          <div className="hidden lg:block">
            <div className="bg-muted/50 rounded-lg h-[600px] p-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-4 text-center">
        <Skeleton className="h-4 w-48 mx-auto" />
      </footer>
    </div>
  )
}

