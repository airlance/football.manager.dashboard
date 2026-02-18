import { ScrollArea } from "@/components/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeadlineTransfer {
    id: string;
    status: string;
    playerName: string;
    playerAge: number;
    playerRole: string;
    fromClub: string;
    fromBadge: string;
    toClub: string;
    toBadge: string;
    fee: string;
}

interface TransferRow {
    id: string;
    player: string;
    position: string;
    nationality: string;
    flagEmoji: string;
    age: number;
    club: string;
    clubBadgeColor: string;
    status: string;
    fee: string;
    dateGroup: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const STATS = [
    { value: '183', label: 'DONE DEALS', icon: 'users' },
    { value: '£17.25M', label: 'TOTAL SPENT', icon: 'coin' },
    { value: '£94K', label: 'AVG. TRANSFER VALUE', icon: 'coin' },
];

const HEADLINE_TRANSFERS: HeadlineTransfer[] = [
    {
        id: 'h1', status: 'Done Deal',
        playerName: 'Mykhaylo Mudryk', playerAge: 21, playerRole: '21 year-old winger',
        fromClub: 'Shakhtar', fromBadge: 'bg-orange-500',
        toClub: 'Chelsea', toBadge: 'bg-blue-600',
        fee: '£60M',
    },
    {
        id: 'h2', status: 'Done Deal',
        playerName: 'Illia Zabarnyi', playerAge: 20, playerRole: '20 year-old centre-back',
        fromClub: 'Dynamo Kyiv', fromBadge: 'bg-blue-700',
        toClub: 'Bournemouth', toBadge: 'bg-red-700',
        fee: '£20M',
    },
    {
        id: 'h3', status: 'Done Deal',
        playerName: 'Marcos Antonio', playerAge: 22, playerRole: '22 year-old defensive midfielder',
        fromClub: 'Shakhtar', fromBadge: 'bg-orange-500',
        toClub: 'Lazio', toBadge: 'bg-blue-400',
        fee: '£6.5M',
    },
    {
        id: 'h4', status: 'Done Deal',
        playerName: 'Fernando', playerAge: 23, playerRole: '23 year-old striker',
        fromClub: 'Shakhtar', fromBadge: 'bg-orange-500',
        toClub: 'FC RB Salzburg', toBadge: 'bg-red-600',
        fee: '£5.25M',
    },
];

const TRANSFER_ROWS: TransferRow[] = [
    // 5th September
    { id: 'r1', player: 'Dmytro Shostak', position: 'ST (C)', nationality: 'UKR', flagEmoji: '🇺🇦', age: 18, club: 'Chernihiv', clubBadgeColor: 'bg-zinc-600', status: 'Done Deal', fee: 'Loan', dateGroup: '5th September' },
    { id: 'r2', player: 'Bohdan Sliubyk', position: 'D (C)', nationality: 'UKR', flagEmoji: '🇺🇦', age: 18, club: 'Dinaz', clubBadgeColor: 'bg-red-700', status: 'Done Deal', fee: 'Loan', dateGroup: '5th September' },
    { id: 'r3', player: 'Vitalii Kholod', position: 'D (C)', nationality: 'UKR', flagEmoji: '🇺🇦', age: 18, club: 'Skoruk', clubBadgeColor: 'bg-blue-600', status: 'Done Deal', fee: 'Loan', dateGroup: '5th September' },
    { id: 'r4', player: 'Mykhaylo Rudavskyi', position: 'WB (L)', nationality: 'UKR', flagEmoji: '🇺🇦', age: 21, club: 'Obolon', clubBadgeColor: 'bg-yellow-600', status: 'Done Deal', fee: 'Loan', dateGroup: '5th September' },
    { id: 'r5', player: 'Yaroslav Karabin', position: 'ST (C)', nationality: 'UKR', flagEmoji: '🇺🇦', age: 19, club: 'Poltava', clubBadgeColor: 'bg-red-500', status: 'Done Deal', fee: 'Loan', dateGroup: '5th September' },
    { id: 'r6', player: 'Vitaliy Roman', position: 'D (L)', nationality: 'UKR', flagEmoji: '🇺🇦', age: 19, club: 'Polissia', clubBadgeColor: 'bg-yellow-500', status: 'Done Deal', fee: 'Loan', dateGroup: '5th September' },
    // 27th August
    { id: 'r7', player: 'Vinicius', position: 'D (L)', nationality: 'BRA', flagEmoji: '🇧🇷', age: 22, club: 'Hirnyk-Sport', clubBadgeColor: 'bg-red-600', status: 'Done Deal', fee: 'Loan', dateGroup: '27th August' },
    { id: 'r8', player: 'Denys Pidhurskyi', position: 'DM', nationality: 'UKR', flagEmoji: '🇺🇦', age: 19, club: 'Prykarpattia', clubBadgeColor: 'bg-yellow-600', status: 'Done Deal', fee: 'Loan', dateGroup: '27th August' },
    // 26th August
    { id: 'r9', player: 'Volodymyr Makhankov', position: 'GK', nationality: 'UKR', flagEmoji: '🇺🇦', age: 24, club: 'Karpaty', clubBadgeColor: 'bg-green-700', status: 'Done Deal', fee: 'Loan', dateGroup: '26th August' },
    { id: 'r10', player: 'Maksym Braharu', position: 'AM (R)', nationality: 'UKR', flagEmoji: '🇺🇦', age: 20, club: 'Norwich', clubBadgeColor: 'bg-yellow-500', status: 'Done Deal', fee: '£575K', dateGroup: '26th August' },
    // 25th August
    { id: 'r11', player: 'Anton Hlushchenko', position: 'M (C)', nationality: 'UKR', flagEmoji: '🇺🇦', age: 18, club: 'Nyva Ternopil', clubBadgeColor: 'bg-green-600', status: 'Done Deal', fee: 'Loan', dateGroup: '25th August' },
];

// ─── Components ───────────────────────────────────────────────────────────────

function DoneIcon() {
    return (
        <svg viewBox="0 0 16 16" className="size-3.5 text-teal-400" fill="currentColor">
            <path d="M2 8 L6 12 L14 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function ClubBadge({ color, size = 'sm' }: { color: string; size?: 'sm' | 'xs' }) {
    const sz = size === 'sm' ? 'size-5' : 'size-4';
    return (
        <div className={cn('rounded-full flex items-center justify-center shrink-0', sz, color)}>
            <svg viewBox="0 0 32 36" className="size-2.5 text-white/70" fill="currentColor">
                <path d="M16 2L3 8v10c0 8.5 5.5 16.5 13 19 7.5-2.5 13-10.5 13-19V8L16 2z" />
            </svg>
        </div>
    );
}

function PlayerSilhouette() {
    return (
        <div className="size-12 bg-zinc-700/60 rounded flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 30" className="h-10 text-zinc-500" fill="currentColor">
                <ellipse cx="12" cy="8" rx="6" ry="7" />
                <path d="M2 28 Q5 16 12 16 Q19 16 22 28 Z" />
            </svg>
        </div>
    );
}

function HeadlineCard({ t }: { t: HeadlineTransfer }) {
    return (
        <div className="border border-zinc-700/60 rounded-lg p-3 bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-1.5 mb-2">
                <DoneIcon />
                <span className="text-xs text-teal-400 font-semibold">{t.status}</span>
            </div>
            <div className="flex items-center gap-2.5">
                <PlayerSilhouette />
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                                <div className="size-4 bg-zinc-600 rounded-full flex items-center justify-center shrink-0">
                                    <svg viewBox="0 0 24 24" className="size-2.5 text-zinc-300" fill="currentColor">
                                        <path d="M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>
                                    </svg>
                                </div>
                                <span className="text-sm font-semibold text-zinc-100 truncate">{t.playerName}</span>
                            </div>
                            <p className="text-xs text-zinc-500 mt-0.5">{t.playerRole}</p>
                        </div>
                        <span className="text-sm font-bold text-zinc-100 shrink-0">{t.fee}</span>
                    </div>
                    {/* Transfer arrow */}
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                            <ClubBadge color={t.fromBadge} />
                            <span className="text-xs text-zinc-400">{t.fromClub}</span>
                        </div>
                        <svg viewBox="0 0 16 8" className="size-4 text-zinc-600 shrink-0" fill="none">
                            <path d="M0 4 L12 4 M9 1 L12 4 L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="flex items-center gap-1">
                            <ClubBadge color={t.toBadge} />
                            <span className="text-xs text-zinc-400">{t.toClub}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Group rows by date
function groupRowsByDate(rows: TransferRow[]) {
    const groups: Record<string, TransferRow[]> = {};
    for (const row of rows) {
        if (!groups[row.dateGroup]) groups[row.dateGroup] = [];
        groups[row.dateGroup].push(row);
    }
    return Object.entries(groups);
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function TransferWindowNewsPage() {
    const grouped = groupRowsByDate(TRANSFER_ROWS);

    return (
        <div className="h-[calc(100vh-120px)] px-2.5 pb-2.5">
            <ScrollArea className="h-full">
                <div className="pr-2 pb-4 space-y-5">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Transfer News</h2>
                        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 border border-zinc-600/60 text-xs text-zinc-200 hover:bg-zinc-700 transition-colors">
                            <div className="size-3.5 rounded-full bg-yellow-500 flex items-center justify-center">
                                <svg viewBox="0 0 32 36" className="size-2 text-white" fill="currentColor">
                                    <path d="M16 2L3 8v10c0 8.5 5.5 16.5 13 19 7.5-2.5 13-10.5 13-19V8L16 2z" />
                                </svg>
                            </div>
                            Ukrainian Premier League
                            <ChevronDown className="size-3 text-zinc-500" />
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        {STATS.map((s, i) => (
                            <div key={i} className="border border-zinc-700/60 rounded-lg px-4 py-3 bg-zinc-800/30 flex items-center gap-3">
                                <div className="size-9 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center shrink-0">
                                    {s.icon === 'users' ? (
                                        <svg viewBox="0 0 24 24" className="size-4 text-teal-400" fill="currentColor">
                                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" className="size-4 text-teal-400" fill="currentColor">
                                            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-zinc-100 leading-none">{s.value}</p>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Headline Stories */}
                    <div>
                        <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-3">Headline Stories</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {HEADLINE_TRANSFERS.map(t => (
                                <HeadlineCard key={t.id} t={t} />
                            ))}
                        </div>
                    </div>

                    {/* Transfer Activity */}
                    <div>
                        <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-3">Transfer Activity</h3>
                        <div className="border border-zinc-700/60 rounded-lg overflow-hidden bg-zinc-900">
                            {/* Table header */}
                            <div className="grid grid-cols-[1fr_100px_60px_50px_1fr_150px_100px] gap-3 px-4 py-2 border-b border-zinc-700/40 bg-zinc-800/40">
                                {['PLAYER', 'POSITION', 'NAT', 'AGE', 'CLUB', 'STATUS', 'FEE'].map(h => (
                                    <span key={h} className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{h}</span>
                                ))}
                            </div>
                            {/* Grouped rows */}
                            {grouped.map(([date, rows]) => (
                                <div key={date}>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/20 border-b border-zinc-700/30">
                                        <span className="size-2 rounded-full bg-zinc-500 shrink-0" />
                                        <span className="text-xs font-semibold text-zinc-400">{date}</span>
                                    </div>
                                    {rows.map(row => (
                                        <div
                                            key={row.id}
                                            className="grid grid-cols-[1fr_100px_60px_50px_1fr_150px_100px] gap-3 px-4 py-2.5 border-b border-zinc-700/20 last:border-b-0 hover:bg-zinc-800/30 transition-colors cursor-pointer"
                                        >
                                            <span className="text-sm font-semibold text-zinc-200">{row.player}</span>
                                            <span className="text-sm text-zinc-400">{row.position}</span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm">{row.flagEmoji}</span>
                                                <span className="text-xs text-zinc-400">{row.nationality}</span>
                                            </div>
                                            <span className="text-sm text-zinc-400">{row.age}</span>
                                            <div className="flex items-center gap-1.5">
                                                <div className={cn('size-4 rounded-full flex items-center justify-center shrink-0', row.clubBadgeColor)}>
                                                    <svg viewBox="0 0 32 36" className="size-2 text-white/70" fill="currentColor">
                                                        <path d="M16 2L3 8v10c0 8.5 5.5 16.5 13 19 7.5-2.5 13-10.5 13-19V8L16 2z" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm text-zinc-300">{row.club}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <DoneIcon />
                                                <span className="text-xs text-teal-400">{row.status}</span>
                                            </div>
                                            <span className={cn(
                                                'text-sm font-semibold',
                                                row.fee === 'Loan' ? 'text-zinc-300' : 'text-zinc-100'
                                            )}>
                                                {row.fee}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}