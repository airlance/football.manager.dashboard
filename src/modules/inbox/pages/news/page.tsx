import { ScrollArea } from "@/components/scroll-area";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NewsArticle {
    id: string;
    league?: string;
    category?: string;
    headline: string;
    bullets: string[];
    hasPlayerAvatar?: boolean;
    hasLeagueBadge?: boolean;
    leagueBadgeColor?: string;
    playerBadgeColor?: string;
    imageType?: 'players' | 'team-of-week' | 'none';
    imageBg?: string;
}

interface UpcomingEvent {
    id: string;
    title: string;
    date: string;
    badgeBg?: string;
    badgeText?: string;
}

interface TransferActivity {
    id: string;
    player: string;
    clubs: string;
    fee: string;
    feeAlt?: string;
}

interface SidebarScout {
    league: string;
    country: string;
    text: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const HERO: NewsArticle = {
    id: 'hero',
    league: 'Premier League',
    category: 'The Big Story',
    headline: 'Jovićević wins Coach of the Week',
    bullets: [
        'Sikan claims Player of the Week',
        'Jovićević pleased to send fans fixtures happy',
    ],
    imageType: 'players',
};

const GRID_ARTICLES: NewsArticle[] = [
    {
        id: 'a1',
        league: 'SERIE A',
        headline: 'Serie A: Sassuolo hold out for draw',
        bullets: ['(A) Fiorentina 1-1 Sassuolo', 'Serie A: Udinese miss chance to win'],
        imageType: 'players',
        leagueBadgeColor: 'bg-purple-600',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a2',
        league: 'TEAM OF THE WEEK',
        headline: 'Team of the Week announced',
        bullets: [],
        imageType: 'team-of-week',
        imageBg: 'bg-green-800',
    },
    {
        id: 'a3',
        league: 'PKO BP EKSTRAKLASA',
        headline: 'PKO BP Ekstraklasa: Vintage display ensures Radomiak victory',
        bullets: ['(EKS) Radomiak 1-0 Wisła Płock', 'PKO BP Ekstraklasa: Raków hold Legia to draw'],
        imageType: 'players',
        leagueBadgeColor: 'bg-blue-700',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a4',
        league: 'TEAM OF THE WEEK',
        headline: 'Team of the Week announced',
        bullets: ['Ochoa on form as Salernitana score easy victory'],
        imageType: 'team-of-week',
        imageBg: 'bg-green-700',
    },
    {
        id: 'a5',
        league: 'PREMIER LEAGUE',
        headline: 'Classy Sikan on form for Shakhtar',
        bullets: ['Krupchanka makes SC Dnipra-1 debut'],
        imageType: 'players',
        leagueBadgeColor: 'bg-yellow-500',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a6',
        league: 'SHAKHTAR',
        headline: 'Van Leeuwen troubled by rival defeat',
        bullets: ['Jovićević believes Shakhtar have a chance'],
        imageType: 'players',
        leagueBadgeColor: 'bg-orange-500',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a7',
        category: '',
        headline: 'Okun rejects Kolos',
        bullets: ['Rykun set for Zoria chief scout role', 'Pylypenko rejects Kolos'],
        imageType: 'players',
        playerBadgeColor: 'bg-zinc-600',
        leagueBadgeColor: 'bg-zinc-700',
    },
    {
        id: 'a8',
        league: 'TEAM OF THE WEEK',
        headline: 'Team of the Week announced',
        bullets: [],
        imageType: 'team-of-week',
        imageBg: 'bg-green-800',
    },
    {
        id: 'a9',
        league: 'PREMIER LEAGUE',
        headline: 'Zubkov impresses for Rukh',
        bullets: ['Goalkeeper Shevchenko makes Vorskla debut', 'Avramenko makes Metalist Kharkiv debut'],
        imageType: 'players',
        leagueBadgeColor: 'bg-yellow-600',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a10',
        league: 'MILAN',
        headline: "'Milan must respect Koke', says Pirlo",
        bullets: ['Pioli wants to keep momentum going', 'Gattuso fears Immobile threat'],
        imageType: 'players',
        leagueBadgeColor: 'bg-red-700',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a11',
        league: 'SERIE A',
        headline: 'Bastoni commits future to Inter',
        bullets: ['Igor commits future to Fiorentina', 'Hakan Çalhanoğlu snubs new deal'],
        imageType: 'players',
        leagueBadgeColor: 'bg-blue-700',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a12',
        league: 'SHAKHTAR',
        headline: 'Chygrynskyi singles out Kimmich',
        bullets: ['Jovićević expecting cagey affair against Zoria', 'Kryventsov singles out Danchenko'],
        imageType: 'players',
        leagueBadgeColor: 'bg-orange-500',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a13',
        league: 'PREMIER DIVISION',
        headline: 'Palmer in training injury blow',
        bullets: ['Caballero suffers training injury setback', 'Walker suffers training injury setback'],
        imageType: 'players',
        leagueBadgeColor: 'bg-blue-500',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a14',
        league: 'PREMIER LEAGUE',
        headline: 'Injury woe for Myziuk',
        bullets: ['Dubinchak suffers flu', 'Yakimets out injured'],
        imageType: 'players',
        leagueBadgeColor: 'bg-yellow-500',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a15',
        league: 'CHELSEA',
        headline: 'Mourinho warns Chelsea to respect Coates',
        bullets: ['Premier Division Preview: Fans Anticipate Rivalry', "'Chelsea must respect Palhinha', says Clarke"],
        imageType: 'players',
        leagueBadgeColor: 'bg-blue-600',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a16',
        league: 'SERIE A',
        headline: 'Bellanova out with training injury',
        bullets: ['Gila suffers injury in training', 'Birindelli suffers training injury setback'],
        imageType: 'players',
        leagueBadgeColor: 'bg-blue-700',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a17',
        league: 'LIVERPOOL',
        headline: 'Gerrard fears Furuhashi threat',
        bullets: ['Klopp fancies chances'],
        imageType: 'players',
        leagueBadgeColor: 'bg-red-600',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a18',
        league: 'INTER',
        headline: 'Inzaghi wants to keep momentum going',
        bullets: ['Matthäus warns Inter about Kolo Muani'],
        imageType: 'players',
        leagueBadgeColor: 'bg-blue-700',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a19',
        league: 'TOTTENHAM',
        headline: 'Balerdi key for OM',
        bullets: ['Scott heading to Tottenham?', 'Conte rules out John sale'],
        imageType: 'players',
        leagueBadgeColor: 'bg-zinc-200',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a20',
        league: 'VORSKLA',
        headline: 'Stepaniuk heading to Dynamo Kyiv?',
        bullets: ['Skrypnyk spotted at Inhulets', 'Vorskla boss on Metalist rivalry'],
        imageType: 'players',
        leagueBadgeColor: 'bg-green-700',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a21',
        league: 'PARTHENOPE',
        headline: 'Hamšík fears Mbappé threat',
        bullets: ['Spalletti fancies chances', 'Spalletti rules out Demme sale'],
        imageType: 'players',
        leagueBadgeColor: 'bg-blue-500',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a22',
        league: 'SEP',
        headline: 'Mano Menezes hopes for positive reaction',
        bullets: ['Morinigo uneasy with defensive approach', 'Ferreira hopes for positive reaction'],
        imageType: 'players',
        leagueBadgeColor: 'bg-blue-400',
        playerBadgeColor: 'bg-zinc-600',
    },
    {
        id: 'a23',
        league: 'TEAM OF THE WEEK',
        headline: 'Team of the Week announced',
        bullets: ['Holec performance pleases Van den Brom'],
        imageType: 'team-of-week',
        imageBg: 'bg-green-700',
    },
    {
        id: 'a24',
        league: 'ATP',
        headline: 'Pressure grows on Paulo Turra ahead of GOI clash',
        bullets: ['Pressure grows on Paulo Turra ahead of FOR clash'],
        imageType: 'players',
        leagueBadgeColor: 'bg-green-700',
        playerBadgeColor: 'bg-zinc-600',
    },
];

const UPCOMING_EVENTS: UpcomingEvent[] = [
    { id: '1', title: 'CBR v VDG', date: 'Tuesday 13th September 2022', badgeBg: 'bg-orange-500' },
    { id: '2', title: 'UEFA Youth League starts', date: 'Tuesday 13th September 2022', badgeBg: 'bg-blue-700' },
];

const TRANSFER_ACTIVITY: TransferActivity[] = [
    { id: '1', player: 'Hans Hateboer', clubs: 'Atalanta to Capitoline', fee: '£6.75M', feeAlt: '(£9M)' },
    { id: '2', player: 'Fabio Borini', clubs: 'Fatih Karagümrük to Cre...', fee: '£3.3M', feeAlt: '(£4.2M)' },
    { id: '3', player: 'Derry John Murkin', clubs: 'FC Volendam to Everton', fee: '£2.9M', feeAlt: '(£3.2M)' },
];

const SIDEBAR_SCOUT: SidebarScout = {
    league: 'Italian Serie A, Italy',
    country: '',
    text: "Juventus' Dušan Vlahović heads the scoring charts with 6 goals.",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function PlayerSilhouette({ leagueBadgeColor = 'bg-zinc-600' }: { leagueBadgeColor?: string; playerBadgeColor?: string }) {
    return (
        <div className="relative flex items-end justify-center h-full w-full">
            {/* Player silhouette */}
            <svg viewBox="0 0 60 70" className="h-14 text-zinc-600/50" fill="currentColor">
                <ellipse cx="30" cy="18" rx="13" ry="16" />
                <path d="M7 65 Q12 36 30 36 Q48 36 53 65 Z" />
            </svg>
            {/* League badge */}
            <div className={cn('absolute bottom-1 right-1 size-6 rounded-full flex items-center justify-center', leagueBadgeColor)}>
                <svg viewBox="0 0 32 36" className="size-3.5 text-white/80" fill="currentColor">
                    <path d="M16 2L3 8v10c0 8.5 5.5 16.5 13 19 7.5-2.5 13-10.5 13-19V8L16 2z" />
                </svg>
            </div>
        </div>
    );
}

function TeamOfWeekImage({ bg = 'bg-green-800' }: { bg?: string }) {
    return (
        <div className={cn('flex flex-col items-center justify-center h-full w-full gap-1', bg)}>
            <div className={cn('size-9 rounded-full flex items-center justify-center bg-black/20')}>
                <svg viewBox="0 0 24 24" className="size-5 text-white/60" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 2 L12 22 M2 12 L22 12 M5 5 L19 19 M19 5 L5 19" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                </svg>
            </div>
            <p className="text-[8px] font-bold text-white/70 uppercase tracking-wide text-center leading-tight">TEAM OF<br/>THE WEEK</p>
        </div>
    );
}

function ArticleCard({ article }: { article: NewsArticle }) {
    return (
        <div className="flex gap-3 p-3 hover:bg-zinc-800/40 transition-colors cursor-pointer rounded-lg group">
            {/* Thumbnail */}
            <div className="size-14 shrink-0 rounded overflow-hidden bg-zinc-800/60 flex items-center justify-center">
                {article.imageType === 'team-of-week' ? (
                    <TeamOfWeekImage bg={article.imageBg} />
                ) : (
                    <PlayerSilhouette
                        leagueBadgeColor={article.leagueBadgeColor}
                        playerBadgeColor={article.playerBadgeColor}
                    />
                )}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
                {article.headline && (
                    <p className="text-sm font-semibold text-zinc-100 leading-snug group-hover:text-white transition-colors line-clamp-2">
                        {article.headline}
                    </p>
                )}
                <ul className="mt-1 space-y-0.5">
                    {article.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                            <span className="mt-1.5 size-1.5 rounded-full bg-zinc-600 shrink-0" />
                            <span className="text-xs text-zinc-400 leading-relaxed line-clamp-1">{b}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function NewsSidebar() {
    return (
        <div className="w-[250px] shrink-0 flex flex-col gap-3">
            <div className="bg-zinc-900 border border-zinc-700/60 rounded-xl overflow-hidden">
                {/* Upcoming Events */}
                <div className="px-4 py-2.5 border-b border-zinc-700/40">
                    <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Upcoming Events</h3>
                </div>
                <div className="divide-y divide-zinc-700/30">
                    {UPCOMING_EVENTS.map(event => (
                        <div key={event.id} className="flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-800/40 transition-colors cursor-pointer">
                            <div className={cn('size-10 rounded shrink-0 flex items-center justify-center', event.badgeBg ?? 'bg-zinc-700')}>
                                {event.id === '1' ? (
                                    <svg viewBox="0 0 32 36" className="size-5 text-white/80" fill="currentColor">
                                        <path d="M16 2L3 8v10c0 8.5 5.5 16.5 13 19 7.5-2.5 13-10.5 13-19V8L16 2z" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 32 32" className="size-5 text-white/80" fill="currentColor">
                                        <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2"/>
                                        <text x="16" y="21" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">UEFA</text>
                                    </svg>
                                )}
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-zinc-200">{event.title}</p>
                                <p className="text-xs text-zinc-500 mt-0.5">{event.date}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Manager Watch */}
                <div className="px-4 py-2 border-t border-zinc-700/40">
                    <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1.5">Manager Watch</h3>
                    <p className="text-xs text-zinc-500">No recent movements.</p>
                </div>

                {/* Recent Transfer Activity */}
                <div className="border-t border-zinc-700/40">
                    <div className="px-4 py-2">
                        <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Recent Transfer Activity</h3>
                    </div>
                    <div className="divide-y divide-zinc-700/30">
                        {TRANSFER_ACTIVITY.map(t => (
                            <div key={t.id} className="flex items-center gap-2.5 px-3 py-2 hover:bg-zinc-800/40 transition-colors cursor-pointer">
                                <div className="size-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                                    <svg viewBox="0 0 24 24" className="size-4 text-zinc-400" fill="currentColor">
                                        <path d="M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-zinc-200 truncate">{t.player}</p>
                                    <p className="text-xs text-zinc-500 truncate">{t.clubs}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-xs font-semibold text-zinc-200">{t.fee}</p>
                                    {t.feeAlt && <p className="text-xs text-zinc-500">{t.feeAlt}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scout section */}
                <div className="border-t border-zinc-700/40 px-4 py-3">
                    <p className="text-xs text-zinc-500 mb-1">{SIDEBAR_SCOUT.league}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{SIDEBAR_SCOUT.text}</p>
                </div>
            </div>
        </div>
    );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
    return (
        <div className="flex gap-0 border border-zinc-700/60 rounded-lg overflow-hidden bg-zinc-800/40 hover:bg-zinc-800/60 transition-colors cursor-pointer group mb-2">
            {/* Hero image */}
            <div className="w-[340px] shrink-0 bg-zinc-700 relative overflow-hidden min-h-[160px] flex items-end justify-center">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-600 to-zinc-800" />
                {/* Silhouettes */}
                <div className="relative flex items-end justify-center gap-2 pb-2 w-full px-4">
                    <svg viewBox="0 0 60 70" className="h-28 text-zinc-500/50 -mb-1" fill="currentColor">
                        <ellipse cx="30" cy="18" rx="13" ry="16" />
                        <path d="M7 65 Q12 36 30 36 Q48 36 53 65 Z" />
                    </svg>
                    {/* Big badge */}
                    <div className="absolute bottom-4 right-6 size-20 rounded-full bg-orange-500/90 border-4 border-orange-400/60 flex items-center justify-center shadow-lg">
                        <svg viewBox="0 0 32 36" className="size-10 text-white/90" fill="currentColor">
                            <path d="M16 2L3 8v10c0 8.5 5.5 16.5 13 19 7.5-2.5 13-10.5 13-19V8L16 2z" />
                            <path d="M16 6L7 11v7c0 5.8 3.7 11.2 9 13.4 5.3-2.2 9-7.6 9-13.4v-7L16 6z" fill="currentColor" opacity="0.3" />
                        </svg>
                    </div>
                </div>
            </div>
            {/* Content */}
            <div className="flex-1 p-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-teal-400">{HERO.category}</span>
                    <span className="text-xs text-zinc-500">{HERO.league}</span>
                </div>
                <h2 className="text-xl font-bold text-zinc-100 leading-tight group-hover:text-white transition-colors mb-3">
                    {HERO.headline}
                </h2>
                <ul className="space-y-2">
                    {HERO.bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-zinc-500 shrink-0" />
                            <span className="text-sm text-zinc-400">{b}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function InboxNewsPage() {
    // Split into pairs for 2-col grid
    const gridPairs: [NewsArticle, NewsArticle | undefined][] = [];
    for (let i = 0; i < GRID_ARTICLES.length; i += 2) {
        gridPairs.push([GRID_ARTICLES[i], GRID_ARTICLES[i + 1]]);
    }

    return (
        <div className="flex gap-2.5 h-[calc(100vh-120px)] px-2.5 pb-2.5">
            {/* ── Main content ── */}
            <div className="flex-1 min-w-0 overflow-hidden">
                <ScrollArea className="h-[calc(100vh-120px)]">
                    <div className="pr-2 pb-4">
                        {/* Hero */}
                        <HeroSection />

                        {/* 2-column grid */}
                        <div className="space-y-0">
                            {gridPairs.map(([left, right], rowIdx) => (
                                <div key={rowIdx} className="grid grid-cols-2 divide-x divide-zinc-700/40 border-b border-zinc-700/30 last:border-b-0">
                                    {/* Left col */}
                                    <div>
                                        {left.league && (
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 pt-2.5 pb-0">
                                                {left.league}
                                            </p>
                                        )}
                                        <ArticleCard article={left} />
                                    </div>
                                    {/* Right col */}
                                    {right ? (
                                        <div>
                                            {right.league && (
                                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 pt-2.5 pb-0">
                                                    {right.league}
                                                </p>
                                            )}
                                            <ArticleCard article={right} />
                                        </div>
                                    ) : (
                                        <div />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </div>

            {/* ── Sidebar ── */}
            <NewsSidebar />
        </div>
    );
}