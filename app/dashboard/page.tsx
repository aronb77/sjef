import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale/nl'
import { Mic, Wallet, Activity, Clock, TrendingUp, MoreHorizontal, CalendarDays, FolderOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, credits_balance')
        .eq('id', user.id)
        .single()

    // Fetch recent quotes (limit 5)
    const { data: quotes } = await supabase
        .from('quotes')
        .select('id, name, created_at, status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

    // Count quotes for stats
    const { count: totalQuotesCount } = await supabase
        .from('quotes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

    const credits = profile?.credits_balance ?? 0
    // Mocked stats
    const activeQuotesCount = 3
    const savedHours = "12u"
    const conversionRate = "100%"

    return (
        <div className="flex-col md:flex">
            <div className="flex-1 space-y-4 p-8 pt-6">

                {/* HEADER SECTION */}
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex items-center space-x-2">
                        {/* Action Button: Safety Orange */}
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                            <Mic className="mr-2 h-4 w-4" />
                            Nieuwe Opname Starten
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger
                            value="overview"
                            className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600"
                        >
                            Overzicht
                        </TabsTrigger>
                        <TabsTrigger value="quotes">Mijn Offertes</TabsTrigger>
                        <TabsTrigger value="settings">Instellingen</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">

                        {/* METRICS ROW */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                            {/* Card 1: Saldo */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Totaal Saldo</CardTitle>
                                    <Wallet className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{credits} Credits</div>
                                    <p className="text-xs text-muted-foreground">+20% tov vorige maand</p>
                                </CardContent>
                            </Card>

                            {/* Card 2: Actieve Klussen */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Actieve Klussen</CardTitle>
                                    <Activity className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{activeQuotesCount}</div>
                                    <p className="text-xs text-muted-foreground">2 in concept</p>
                                </CardContent>
                            </Card>

                            {/* Card 3: Bespaarde Tijd */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Bespaarde Tijd</CardTitle>
                                    <Clock className="h-4 w-4 text-purple-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{savedHours}</div>
                                    <p className="text-xs text-muted-foreground">Door AI automatie</p>
                                </CardContent>
                            </Card>

                            {/* Card 4: Conversie */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Conversie</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-orange-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{conversionRate}</div>
                                    <p className="text-xs text-muted-foreground">Alle offertes geaccepteerd</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* MAIN CONTENT AREA */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                            {/* LEFT COLUMN: ACTIVITY CHART (Span 4) */}
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Activiteit</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    {/* Simulated Bar Chart */}
                                    <div className="h-[200px] w-full flex items-end justify-between gap-2 px-4">
                                        {/* Generate bars. Use Orange for bars. Highlight "current" month (say index 8 'Sep') */}
                                        {[35, 78, 45, 90, 60, 45, 70, 85, 95, 65, 50, 80].map((height, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2 w-full">
                                                <div
                                                    className={`w-full rounded-sm transition-all hover:opacity-80 ${i === 8 ? 'bg-orange-400 opacity-100' : 'bg-orange-500/80'}`}
                                                    style={{ height: `${height}%` }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between px-4 mt-2 text-xs text-muted-foreground uppercase">
                                        <span>Jan</span>
                                        <span>Feb</span>
                                        <span>Mar</span>
                                        <span>Apr</span>
                                        <span>Mei</span>
                                        <span>Jun</span>
                                        <span>Jul</span>
                                        <span>Aug</span>
                                        <span>Sep</span>
                                        <span>Okt</span>
                                        <span>Nov</span>
                                        <span>Dec</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* RIGHT COLUMN: RECENTE KLUSSEN (Span 3) */}
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Recente Klussen</CardTitle>
                                    <CardDescription>
                                        Je laatste {quotes?.length || 0} projecten.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        {quotes && quotes.length > 0 ? (
                                            quotes.map((quote) => (
                                                <div key={quote.id} className="flex items-center">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                                        <AvatarFallback>{getInitials(quote.name || 'Onbekend')}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="ml-4 space-y-1">
                                                        <p className="text-sm font-medium leading-none">{quote.name || `Project ${quote.id.slice(0, 4)}`}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {format(new Date(quote.created_at), 'd MMM yyyy', { locale: nl })}
                                                        </p>
                                                    </div>
                                                    <div className="ml-auto font-medium">
                                                        <BadgeVariant status={quote.status} />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                                                <div className="p-3 bg-slate-50 rounded-full">
                                                    <FolderOpen className="h-8 w-8 text-slate-300" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-slate-900">Nog geen klussen</p>
                                                    <p className="text-xs text-muted-foreground">Start je eerste opname!</p>
                                                </div>
                                                <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 hover:bg-orange-50">
                                                    Start nu
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Placeholder Content for other tabs */}
                    <TabsContent value="quotes">
                        <div className="p-4 text-muted-foreground">Offerte overzicht komt hier.</div>
                    </TabsContent>
                    <TabsContent value="settings">
                        <div className="p-4 text-muted-foreground">Instellingen komen hier.</div>
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}

function getInitials(name: string) {
    if (!name) return '??'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
}

function BadgeVariant({ status }: { status: string }) {
    const s = status?.toLowerCase() || 'concept'
    if (s === 'accepted' || s === 'completed' || s === 'geaccepteerd') {
        return <Badge className="bg-green-500 hover:bg-green-600 border-0">Geaccepteerd</Badge>
    }
    if (s === 'sent' || s === 'verzonden') {
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0">Verzonden</Badge>
    }
    // Concept/Default
    return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Concept</Badge>
}
