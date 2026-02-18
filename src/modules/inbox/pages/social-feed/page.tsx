import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/scroll-area";
import { cn } from "@/lib/utils";
import { Settings, ThumbsUp, ChevronDown, Check, Eye, Search, UserPlus } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FeedFilter = 'News' | 'Social' | 'News + Social';

interface NewsPost {
    id: string;
    type: 'news';
    league: string;
    timeAgo: string;
    source: string;
    headline: string;
    imageBg?: string; // css gradient or color
    imageLabel?: string; // e.g. "TEAM OF THE WEEK"
    leagueLogoColor?: string;
}

interface SocialPost {
    id: string;
    type: 'social';
    author: string;
    authorInitials: string;
    authorAvatarColor?: string;
    isLeague?: boolean;
    timeAgo: string;
    text: string;
    hashtags?: string[];
    likes: number;
}

type FeedItem = NewsPost | SocialPost;

interface FollowSubject {
    id: string;
    name: string;
    type: 'club' | 'person';
    avatarColor?: string;
    avatarInitials?: string;
    underlined?: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FEED_ITEMS: FeedItem[] = [
    {
        id: 'n1',
        type: 'news',
        league: 'UKRAINIAN PREMIER LEAGUE',
        timeAgo: '4 HOURS AGO',
        source: 'THE UKRAINIAN FOO...',
        headline: 'Jovićević wins Coach of the Week',
    },
    {
        id: 's1',
        type: 'social',
        author: 'Ukrainian Premier League',
        authorInitials: 'UPL',
        isLeague: true,
        timeAgo: '4 hours ago',
        text: "Shakhtar's inimitable Igor Jovićević has been named as the Coach of the Week.",
        hashtags: ['#UPL'],
        likes: 5757,
    },
    {
        id: 's2',
        type: 'social',
        author: 'Oleksandr Skydan',
        authorInitials: 'OS',
        timeAgo: '4 hours ago',
        text: "A few good contenders for the award but Jovićević wouldn't have been my choice.",
        likes: 2878,
    },
    {
        id: 'n2',
        type: 'news',
        league: 'UKRAINIAN PREMIER LEAGUE',
        timeAgo: '4 HOURS AGO',
        source: 'THE UKRAINIAN FOO...',
        headline: 'Sikan claims Player of the Week',
    },
    {
        id: 's3',
        type: 'social',
        author: 'Ukrainian Premier League',
        authorInitials: 'UPL',
        isLeague: true,
        timeAgo: '4 hours ago',
        text: "Shakhtar's Danylo Sikan has been named as the Player of the Week!",
        hashtags: ['#UPL'],
        likes: 4457,
    },
    {
        id: 's4',
        type: 'social',
        author: 'Illia Holokolosov',
        authorInitials: 'IH',
        timeAgo: '4 hours ago',
        text: "Danylo Sikan is the sort of character who won't let this go to his head and instead just look to carry on where he left off.",
        likes: 2228,
    },
    {
        id: 's5',
        type: 'social',
        author: 'Taras Fedak',
        authorInitials: 'TF',
        timeAgo: '2 days ago',
        text: 'How many times have they each made a successful and decisive well-timed run instead?',
        likes: 1919,
    },
    {
        id: 's6',
        type: 'social',
        author: 'Ukrainian Premier League',
        authorInitials: 'UPL',
        isLeague: true,
        timeAgo: '2 days ago',
        text: 'Where would Shakhtar have been without Danylo Sikan?',
        hashtags: ['#Sikan', '#Shakht', '#ZoriavsShakht', '#UPL'],
        likes: 4546,
    },
    {
        id: 's7',
        type: 'social',
        author: 'Olexandr Ilchenko',
        authorInitials: 'OI',
        timeAgo: '2 days ago',
        text: "I think there's clearly a whole lot more to come from Danylo Sikan after that display!",
        likes: 2252,
    },
    {
        id: 'n3',
        type: 'news',
        league: 'PKO BANK POLSKI EKSTRAKLASA',
        timeAgo: '4 HOURS AGO',
        source: 'GOAL',
        headline: 'Team of the Week announced',
        imageBg: 'bg-green-800',
        imageLabel: 'TEAM OF THE WEEK',
    },
    {
        id: 'n4',
        type: 'news',
        league: 'BRAZILIAN NATIONAL FIRST DIVISION',
        timeAgo: '4 HOURS AGO',
        source: 'PLANET FOOTBALL',
        headline: 'Team of the Week announced',
        imageBg: 'bg-green-700',
        imageLabel: 'TEAM OF THE WEEK',
    },
    {
        id: 'n5',
        type: 'news',
        league: 'ITALIAN SERIE A',
        timeAgo: '4 HOURS AGO',
        source: 'THE ITALIAN FOOTBA...',
        headline: 'Team of the Week announced',
        imageBg: 'bg-green-800',
        imageLabel: 'TEAM OF THE WEEK',
    },
    {
        id: 'n6',
        type: 'news',
        league: 'ENGLISH PREMIER DIVISION',
        timeAgo: '4 HOURS AGO',
        source: 'TEAMTALK.COM',
        headline: 'Team of the Week announced',
        imageBg: 'bg-green-700',
        imageLabel: 'TEAM OF THE WEEK',
    },
];

const FOLLOW_SUBJECTS: FollowSubject[] = [
    { id: '1', name: 'Chornomorets Odesa', type: 'club', avatarColor: 'bg-blue-700' },
    { id: '2', name: 'Dmytro Shastal', type: 'person', avatarColor: 'bg-zinc-600' },
    { id: '3', name: 'FC Minaj', type: 'club', avatarColor: 'bg-yellow-600' },
    { id: '4', name: 'Kolos Kovalivka', type: 'club', avatarColor: 'bg-zinc-700' },
    { id: '5', name: 'Kryvbas Kryvyi Rih', type: 'club', avatarColor: 'bg-red-700' },
    { id: '6', name: 'Metalist 1925 Kharkiv', type: 'club', avatarColor: 'bg-yellow-500' },
    { id: '7', name: 'Oleksiy Horiainov', type: 'person', avatarColor: 'bg-zinc-600' },
    { id: '8', name: 'Oleksiy Zozulia', type: 'person', avatarColor: 'bg-zinc-600' },
    { id: '9', name: 'PFC Lviv', type: 'club', avatarColor: 'bg-blue-600' },
    { id: '10', name: 'Polissia Zhytomyr', type: 'club', avatarColor: 'bg-yellow-600', underlined: true },
    { id: '11', name: 'Rukh Lviv', type: 'club', avatarColor: 'bg-zinc-700' },
    { id: '12', name: 'SC Dnipro-1', type: 'club', avatarColor: 'bg-blue-600' },
    { id: '13', name: 'Shakhtar Donetsk', type: 'club', avatarColor: 'bg-orange-500' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatLikes(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(3).replace('.', ',');
    return n.toString();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LeagueAvatar({ initials, color = 'bg-teal-600' }: { initials: string; color?: string }) {
    return (
        <div className={cn('size-10 rounded-sm flex items-center justify-center text-[10px] font-bold text-white shrink-0', color)}>
            {initials}
        </div>
    );
}

function PersonAvatar({ initials, color = 'bg-zinc-600' }: { initials: string; color?: string }) {
    return (
        <div className={cn('size-10 rounded-sm flex items-center justify-center text-xs font-semibold text-zinc-200 shrink-0', color)}>
            {initials}
        </div>
    );
}

function NewsCard({ item }: { item: NewsPost }) {
    return (
        <div className="border border-zinc-700/60 rounded-lg overflow-hidden bg-zinc-800/40 hover:bg-zinc-800/60 transition-colors cursor-pointer group">
            <div className="flex items-stretch gap-0">
                {/* Thumbnail */}
                <div className={cn(
                    'w-24 shrink-0 flex flex-col items-center justify-center text-center p-2 relative',
                    item.imageBg ?? 'bg-zinc-700'
                )}>
                    {/* Player avatar silhouette + league badge */}
                    <div className="relative flex items-center justify-center w-full h-full min-h-[70px]">
                        {item.imageLabel ? (
                            <div className="flex flex-col items-center gap-1">
                                <div className={cn('size-9 rounded-full flex items-center justify-center', item.imageBg ?? 'bg-zinc-600')}>
                                    <svg viewBox="0 0 24 24" className="size-5 text-zinc-200/60" fill="currentColor">
                                        <path d="M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>
                                    </svg>
                                </div>
                                <span className="text-[8px] font-bold text-white/80 leading-tight text-center uppercase tracking-wide">{item.imageLabel}</span>
                            </div>
                        ) : (
                            <div className="flex items-end justify-center gap-1">
                                {/* Silhouette */}
                                <svg viewBox="0 0 60 70" className="h-16 text-zinc-500/50" fill="currentColor">
                                    <ellipse cx="30" cy="20" rx="14" ry="18" />
                                    <path d="M5 65 Q10 35 30 35 Q50 35 55 65 Z" />
                                </svg>
                                <div className="absolute bottom-2 right-2 size-6 rounded-full bg-orange-500 flex items-center justify-center">
                                    <svg viewBox="0 0 32 36" className="size-4 text-white" fill="currentColor">
                                        <path d="M16 2L3 8v10c0 8.5 5.5 16.5 13 19 7.5-2.5 13-10.5 13-19V8L16 2z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header bar */}
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-700/40">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider truncate">
                            {item.league} · {item.timeAgo}
                        </span>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                            <span className="text-[10px] text-zinc-500 font-medium">{item.source}</span>
                            <button className="text-zinc-600 hover:text-zinc-400 transition-colors">
                                <Settings className="size-3.5" />
                            </button>
                        </div>
                    </div>
                    <div className="px-3 py-2.5">
                        <p className="text-sm font-semibold text-zinc-100 leading-snug group-hover:text-white transition-colors">
                            {item.headline}
                        </p>
                        <button className="text-xs text-zinc-500 hover:text-teal-400 transition-colors mt-1">
                            Read more...
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SocialCard({ item }: { item: SocialPost }) {
    return (
        <div className="border border-zinc-700/50 rounded-lg px-3 py-2.5 bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-start gap-3">
                {item.isLeague ? (
                    <LeagueAvatar initials={item.authorInitials} />
                ) : (
                    <PersonAvatar initials={item.authorInitials} color={item.authorAvatarColor} />
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-zinc-200">{item.author}</span>
                            <span className="text-xs text-zinc-500">{item.timeAgo}</span>
                        </div>
                        <button className="text-zinc-600 hover:text-zinc-400 transition-colors shrink-0 mt-0.5">
                            <Settings className="size-3.5" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed mt-1">
                        {item.text}{' '}
                        {item.hashtags?.map((tag, i) => (
                            <span key={i} className="text-teal-400 hover:text-teal-300 cursor-pointer transition-colors">{tag} </span>
                        ))}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                        <ThumbsUp className="size-3.5 text-zinc-500" />
                        <span className="text-xs text-zinc-500">{formatLikes(item.likes)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Filter Dropdown ──────────────────────────────────────────────────────────

function FilterDropdown({ value, onChange }: { value: FeedFilter; onChange: (v: FeedFilter) => void }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const options: FeedFilter[] = ['News', 'Social', 'News + Social'];

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800 border border-zinc-600/60 text-sm text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
                <Eye className="size-3.5 text-zinc-400" />
                {value}
                <ChevronDown className="size-3.5 text-zinc-400" />
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1 w-36 bg-zinc-800 border border-zinc-600 rounded-md shadow-xl z-50 overflow-hidden">
                    {options.map(opt => (
                        <button
                            key={opt}
                            onClick={() => { onChange(opt); setOpen(false); }}
                            className={cn(
                                'w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-700 transition-colors',
                                value === opt ? 'text-zinc-100' : 'text-zinc-400'
                            )}
                        >
                            {value === opt && <Check className="size-3.5 text-teal-400" />}
                            <span className={value === opt ? '' : 'ml-5'}>{opt}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function FollowSidebar() {
    return (
        <div className="w-[260px] shrink-0 flex flex-col gap-3">
            <div className="bg-zinc-900 border border-zinc-700/60 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-700/40">
                    <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                        Subjects and People to Follow
                    </h3>
                </div>
                {/* Search */}
                <div className="px-3 py-2 border-b border-zinc-700/30">
                    <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-md px-2.5 py-1.5">
                        <Search className="size-3.5 text-zinc-500 shrink-0" />
                        <input
                            className="flex-1 bg-transparent text-xs text-zinc-300 placeholder:text-zinc-600 outline-none"
                            placeholder="Search..."
                        />
                    </div>
                </div>
                {/* List */}
                <ScrollArea className="max-h-[calc(100vh-280px)]">
                    <div className="py-1">
                        {FOLLOW_SUBJECTS.map(subject => (
                            <div
                                key={subject.id}
                                className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-zinc-800/60 transition-colors group cursor-pointer"
                            >
                                <div className={cn(
                                    'size-7 rounded-sm flex items-center justify-center shrink-0',
                                    subject.type === 'person' ? 'rounded-full' : '',
                                    subject.avatarColor ?? 'bg-zinc-700'
                                )}>
                                    {subject.type === 'club' ? (
                                        <svg viewBox="0 0 32 36" className="size-4 text-white/70" fill="currentColor">
                                            <path d="M16 2L3 8v10c0 8.5 5.5 16.5 13 19 7.5-2.5 13-10.5 13-19V8L16 2z" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" className="size-4 text-zinc-300/70" fill="currentColor">
                                            <path d="M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>
                                        </svg>
                                    )}
                                </div>
                                <span className={cn(
                                    'text-xs flex-1 min-w-0 truncate',
                                    subject.underlined ? 'underline text-zinc-300' : 'text-zinc-300'
                                )}>
                                    {subject.name}
                                </span>
                                <button className="size-6 rounded border border-zinc-600 bg-zinc-700 flex items-center justify-center text-zinc-400 hover:border-teal-500 hover:text-teal-400 hover:bg-zinc-600 transition-all opacity-0 group-hover:opacity-100 shrink-0">
                                    <UserPlus className="size-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Following count */}
                <div className="px-3 py-3 border-t border-zinc-700/40 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-zinc-500">Following</p>
                        <p className="text-sm font-bold text-zinc-200">33</p>
                    </div>
                    <button className="px-3 py-1.5 text-xs border border-zinc-600 bg-zinc-700 text-zinc-200 rounded-md hover:bg-zinc-600 transition-colors">
                        Manage
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Feed Renderer ────────────────────────────────────────────────────────────

function FeedContent({ filter }: { filter: FeedFilter }) {
    const items = FEED_ITEMS.filter(item => {
        if (filter === 'News') return item.type === 'news';
        if (filter === 'Social') return item.type === 'social';
        return true; // News + Social
    });

    return (
        <div className="space-y-2">
            {items.map(item => (
                item.type === 'news'
                    ? <NewsCard key={item.id} item={item} />
                    : <SocialCard key={item.id} item={item} />
            ))}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function InboxSocialFeedPage() {
    const [filter, setFilter] = useState<FeedFilter>('News + Social');

    return (
        <div className="flex gap-2.5 h-[calc(100vh-120px)] px-2.5 pb-2.5">
            {/* ── Main feed ── */}
            <div className="flex-1 flex flex-col gap-2.5 min-w-0">
                {/* Filter bar */}
                <div className="flex items-center gap-3 px-1">
                    <FilterDropdown value={filter} onChange={setFilter} />
                </div>

                {/* Feed */}
                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-[calc(100vh-170px)]">
                        <div className="pr-2">
                            <FeedContent filter={filter} />
                        </div>
                    </ScrollArea>
                </div>
            </div>

            {/* ── Sidebar ── */}
            <FollowSidebar />
        </div>
    );
}