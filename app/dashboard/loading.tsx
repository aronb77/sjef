import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"

export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
            <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-8">

                {/* HEADER SKELETON */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <Skeleton className="h-8 w-64 mb-2 bg-slate-200" />
                        <Skeleton className="h-4 w-48 bg-slate-200" />
                    </div>
                    <Skeleton className="h-12 w-12 rounded-full bg-slate-200" />
                </header>

                {/* GRID SKELETON */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col h-[200px]">
                        <CardHeader className="pb-3">
                            <Skeleton className="h-4 w-20 bg-slate-100" />
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <Skeleton className="h-12 w-24 bg-slate-100" />
                            <Skeleton className="h-2 w-full bg-slate-100" />
                        </CardContent>
                        <CardFooter className="pt-4">
                            <Skeleton className="h-10 w-full bg-slate-100" />
                        </CardFooter>
                    </Card>

                    {/* Card 2 */}
                    <Card className="bg-white border-slate-200 shadow-sm rounded-xl h-[200px]">
                        <CardHeader className="pb-3">
                            <Skeleton className="h-4 w-24 bg-slate-100" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Skeleton className="h-8 w-32 bg-slate-100 mb-1" />
                                <Skeleton className="h-3 w-16 bg-slate-100" />
                            </div>
                            <div>
                                <Skeleton className="h-8 w-32 bg-slate-100 mb-1" />
                                <Skeleton className="h-3 w-16 bg-slate-100" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 3 (Action) */}
                    <Card className="bg-white border-slate-200 shadow-sm rounded-xl h-[200px] flex flex-col items-center justify-center">
                        <Skeleton className="h-10 w-10 rounded-full bg-slate-100 mb-4" />
                        <Skeleton className="h-6 w-32 bg-slate-100" />
                    </Card>
                </div>

                {/* WORKBENCH SKELETON */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <Skeleton className="h-6 w-32 bg-slate-200" />
                        <Skeleton className="h-4 w-24 bg-slate-200" />
                    </div>

                    <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 flex items-center justify-between">
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-48 bg-slate-100" />
                                        <Skeleton className="h-3 w-24 bg-slate-100" />
                                    </div>
                                    <Skeleton className="h-6 w-20 rounded-full bg-slate-100" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    )
}
