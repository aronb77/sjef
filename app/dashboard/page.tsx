import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale/nl'
import { Mic, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { QuickBuyButton } from './QuickBuyButton'
import { CreditsProgress } from './CreditsProgress'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch profile with full_name, company_name, credits_balance
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, company_name, credits_balance')
        .eq('id', user.id)
        .single()

    // Fetch recent quotes (limit 5, ordered by date)
    const { data: quotes } = await supabase
        .from('quotes')
        .select('id, name, created_at, status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

    const credits = profile?.credits_balance ?? 0
    const fullName = profile?.full_name || user.email?.split('@')[0] || 'Gebruiker'
    const today = format(new Date(), 'EEEE d MMMM yyyy', { locale: nl })

    // Get initials for avatar
    const getInitials = (name: string) => {
        const parts = name.trim().split(' ')
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        }
        return name.slice(0, 2).toUpperCase()
    }

    const initials = profile?.full_name ? getInitials(profile.full_name) : fullName.slice(0, 2).toUpperCase()

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
            <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-8">
                
                {/* HEADER */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Hoi, {fullName}
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">{today}</p>
                    </div>

                    <Avatar className="h-12 w-12 border-2 border-slate-200 shadow-sm">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </header>

                {/* MISSION CONTROL GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Card 1: The Wallet (Credits) */}
                    <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                                Saldo
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="mb-4">
                                <span className="text-5xl font-bold text-slate-900">{credits}</span>
                            </div>
                            <CreditsProgress value={credits} />
                        </CardContent>
                        <CardFooter className="pt-4">
                            <QuickBuyButton />
                        </CardFooter>
                    </Card>

                    {/* Card 2: Production */}
                    <Card className="bg-white border-slate-200 shadow-sm rounded-xl">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                                Productie
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-slate-900">3</span>
                                    <span className="text-lg text-slate-600">Offertes</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-1">deze maand</p>
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-slate-900">12</span>
                                    <span className="text-lg text-slate-600">minuten</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-1">tijd bespaard</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 3: THE ACTION (Hero) */}
                    <Card className="bg-orange-500 border-orange-600 shadow-md shadow-orange-500/20 rounded-xl overflow-hidden cursor-pointer hover:bg-orange-600 transition-all hover:scale-[1.02] active:scale-[0.98] group">
                        <CardContent className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-white min-h-[200px]">
                            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                                <Mic className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight">Nieuwe Opname</h3>
                        </CardContent>
                    </Card>

                </div>

                {/* WORKBENCH (Recent Jobs) */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 px-1">Recente Klussen</h3>

                    <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            {quotes && quotes.length > 0 ? (
                                quotes.map((quote) => (
                                    <JobRow
                                        key={quote.id}
                                        title={quote.name || `Project ${quote.id.slice(0, 8)}`}
                                        date={format(new Date(quote.created_at), 'd MMM', { locale: nl })}
                                        status={quote.status || 'Concept'}
                                    />
                                ))
                            ) : (
                                // Fallback data if no quotes exist
                                <>
                                    <JobRow
                                        title="Badkamer Renovatie"
                                        date={format(new Date(), 'd MMM', { locale: nl })}
                                        status="Concept"
                                    />
                                    <JobRow
                                        title="Dakisolatie Project"
                                        date={format(new Date(Date.now() - 86400000), 'd MMM', { locale: nl })}
                                        status="Done"
                                    />
                                </>
                            )}
                        </div>
                    </Card>
                </section>

            </div>
        </div>
    )
}

function JobRow({ title, date, status }: { title: string; date: string; status: string }) {
    const isDone = status === 'Done' || status === 'Klaar' || status === 'completed' || status === 'klaar'
    
    return (
        <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
            <div className="flex-1">
                <span className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors block">
                    {title}
                </span>
                <span className="text-sm text-slate-500">{date}</span>
            </div>
            <div className="flex items-center gap-3">
                {isDone ? (
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                        Klaar
                    </Badge>
                ) : (
                    <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
                        Concept
                    </Badge>
                )}
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>
        </div>
    )
}
