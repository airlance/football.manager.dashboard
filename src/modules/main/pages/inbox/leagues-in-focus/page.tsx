import { useState } from 'react';
import { ScrollArea } from "@/components/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LeagueTableRow {
    pos: number;
    inf?: string;
    team: string;
    badgeColor: string;
    p: number;
    w: number;
    gd: number;
    pts: number;
    highlighted?: boolean;
}

interface LeagueHeadline {
    category: string;
    text: string;
}

interface MatchResult {
    homeTeam: string;
    score: string;
    awayTeam: string;
    note?: string;
}

interface LeagueBlock {
    id: string;
    name: string;
    badgeBg: string;
    headlines: LeagueHeadline[];
    table?: LeagueTableRow[];
    match?: MatchResult;
    noNews?: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const LEAGUES: LeagueBlock[] = [
    {
        id: 'epl',
        name: 'English Premier Division',
        badgeBg: 'bg-purple-700',
        headlines: [
            { category: 'PREMIER DIVISION', text: 'Premier Division: Martinelli captures the...' },
            { category: 'BRENTFORD', text: 'Premier Division: Brentford ease past Liverpool' },
            { category: 'MAN UFC', text: "Premier Division: Man UFC's poor performanc..." },
        ],
        table: [
            { pos: 1, team: 'Man City', badgeColor: 'bg-blue-400', p: 7, w: 6, gd: 10, pts: 19 },
            { pos: 2, team: 'Tottenham', badgeColor: 'bg-zinc-100', p: 7, w: 6, gd: 7, pts: 19 },
            { pos: 3, team: 'Arsenal', badgeColor: 'bg-red-600', p: 7, w: 4, gd: 6, pts: 14 },
            { pos: 4, team: 'Newcastle', badgeColor: 'bg-zinc-900', p: 7, w: 3, gd: 3, pts: 12 },
            { pos: 5, team: 'Soton', badgeColor: 'bg-red-500', p: 7, w: 3, gd: 3, pts: 12 },
        ],
    },
    {
        id: 'serie-a',
        name: 'Italian Serie A',
        badgeBg: 'bg-blue-700',
        headlines: [
            { category: 'SERIE A', text: 'Serie A: Duda steals the show' },
            { category: 'TORINO', text: 'Serie A: Juventus go top of Serie A' },
            { category: 'LAZIO', text: 'Serie A: Honours even at Olimpico' },
        ],
        table: [
            { pos: 1, team: 'Juventus', badgeColor: 'bg-zinc-800', p: 5, w: 3, gd: 7, pts: 11 },
            { pos: 2, team: 'Milan', badgeColor: 'bg-red-700', p: 5, w: 3, gd: 4, pts: 11 },
            { pos: 3, team: 'Lazio', badgeColor: 'bg-blue-400', p: 6, w: 3, gd: 4, pts: 11 },
            { pos: 4, team: 'Salernitana', badgeColor: 'bg-red-500', p: 5, w: 3, gd: 4, pts: 11 },
            { pos: 5, team: 'Capitoline', badgeColor: 'bg-yellow-500', p: 4, w: 3, gd: 3, pts: 9 },
        ],
    },
    {
        id: 'brazil',
        name: 'Brazilian National First Division',
        badgeBg: 'bg-green-700',
        headlines: [
            { category: 'FIRST DIVISION', text: 'First Division: Arias gets the job done' },
            { category: 'ATM', text: 'First Division: Guga gets one over on ATM' },
            { category: 'SAN', text: 'First Division: COR hold out for draw' },
        ],
        table: [
            { pos: 1, team: 'ATM', badgeColor: 'bg-red-600', p: 25, w: 18, gd: 19, pts: 57 },
            { pos: 2, team: 'SEP', badgeColor: 'bg-blue-600', p: 23, w: 16, gd: 25, pts: 52 },
            { pos: 3, team: 'FLA', badgeColor: 'bg-red-500', p: 25, w: 16, gd: 24, pts: 51 },
            { pos: 4, team: 'FLU', badgeColor: 'bg-green-600', p: 24, w: 16, gd: 21, pts: 49 },
            { pos: 5, team: 'COR', badgeColor: 'bg-zinc-700', p: 22, w: 11, gd: 5, pts: 38 },
        ],
    },
    {
        id: 'upl',
        name: 'Ukrainian Premier League',
        badgeBg: 'bg-yellow-600',
        headlines: [
            { category: 'ZORIA', text: 'Premier League: Sikan sends Shakhtar top' },
            { category: 'PREMIER LEAGUE', text: 'Premier League: Hirnyk KZRK Shakhta...' },
            { category: 'DNIPRO-1', text: 'Premier League: Dnipro-1 in control as Bilo-sy...' },
        ],
        table: [
            { pos: 1, team: 'Shakhtar', badgeColor: 'bg-orange-500', p: 5, w: 4, gd: 14, pts: 12 },
            { pos: 2, team: 'Vorskla', badgeColor: 'bg-green-700', p: 5, w: 4, gd: 7, pts: 12 },
            { pos: 3, team: 'Dnipro-1', badgeColor: 'bg-blue-500', p: 5, w: 4, gd: 4, pts: 12, highlighted: true },
            { pos: 4, team: 'MK1925', badgeColor: 'bg-yellow-500', p: 4, w: 3, gd: 4, pts: 10 },
            { pos: 5, team: 'Dynamo', badgeColor: 'bg-blue-700', p: 4, w: 3, gd: 5, pts: 9 },
        ],
    },
    {
        id: 'rio',
        name: 'Brazilian Rio de Janeiro State Championship',
        badgeBg: 'bg-green-600',
        headlines: [],
        noNews: true,
        match: { homeTeam: 'FLA', score: '2 : 3', awayTeam: 'BOT', note: 'Tie was played on 17/4/2022' },
    },
    {
        id: 'gaucho',
        name: 'Brazilian Gaúcho State Championship',
        badgeBg: 'bg-green-600',
        headlines: [],
        noNews: true,
        match: { homeTeam: 'INT', score: '1 : 1', awayTeam: 'GRE', note: 'Tie was played on 17/4/2022' },
    },
];

// ─── Components ───────────────────────────────────────────────────────────────

function ClubBadge({ color, size = 'sm' }: { color: string; size?: 'sm' | 'xs' }) {
    const sz = size === 'sm' ? 'size-5' : 'size-4';
    return (
        <div className={cn('rounded-full flex items-center justify-center shrink-0', sz, color)}>
            <svg viewBox="0 0 32 36" className="size-3 text-white/70" fill="currentColor">
                <path d="M16 2L3 8v10c0 8.5 5.5 16.5 13 19 7.5-2.5 13-10.5 13-19V8L16 2z" />
            </svg>
        </div>
    );
}

function LeagueCard({ league }: { league: LeagueBlock }) {
    const [open, setOpen] = useState(true);

    return (
        <div className="border border-zinc-700/60 rounded-lg overflow-hidden bg-zinc-900">
            {/* Header */}
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-zinc-800/40 transition-colors"
            >
                <div className="flex items-center gap-2.5">
                    <div className={cn('size-6 rounded flex items-center justify-center shrink-0', league.badgeBg)}>
                        <svg viewBox="0 0 32 36" className="size-3.5 text-white/80" fill="currentColor">
                            <path d="M16 2L3 8v10c0 8.5 5.5 16.5 13 19 7.5-2.5 13-10.5 13-19V8L16 2z" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold text-zinc-200">{league.name}</span>
                </div>
                {open ? <ChevronUp className="size-4 text-zinc-500" /> : <ChevronDown className="size-4 text-zinc-500" />}
            </button>

            {open && (
                <div className="border-t border-zinc-700/40">
                    {league.noNews ? (
                        /* Simple match result */
                        <div className="flex flex-col gap-3 p-4">
                            {league.match && (
                                <>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-teal-400 font-bold cursor-pointer hover:text-teal-300">LEAGUE TABLE›</span>
                                    </div>
                                    {league.match.note && (
                                        <p className="text-xs text-zinc-500">{league.match.note}</p>
                                    )}
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-sm font-semibold text-zinc-300">{league.match.homeTeam}</span>
                                        <span className="text-sm font-bold text-zinc-100 bg-zinc-800 px-3 py-1 rounded">{league.match.score}</span>
                                        <span className="text-sm font-semibold text-zinc-300">{league.match.awayTeam}</span>
                                    </div>
                                </>
                            )}
                            <p className="text-xs text-zinc-500 text-center py-2">There is currently no news to display for this competition.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2">
                            {/* Headlines */}
                            <div className="p-3 border-r border-zinc-700/40 space-y-3">
                                <button className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors tracking-wide">
                                    HEADLINES›
                                </button>
                                <div className="space-y-2">
                                    {league.headlines.map((h, i) => (
                                        <div key={i} className="cursor-pointer group">
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{h.category}</p>
                                            <p className="text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">{h.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Table */}
                            <div className="p-3">
                                <button className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors tracking-wide mb-2">
                                    LEAGUE TABLE›
                                </button>
                                {league.table && (
                                    <table className="w-full text-xs">
                                        <thead>
                                        <tr className="text-zinc-500 text-[10px]">
                                            <th className="text-left py-0.5 w-8">POS</th>
                                            <th className="text-left py-0.5 w-6">INF</th>
                                            <th className="text-left py-0.5">TEAM</th>
                                            <th className="text-right py-0.5 w-6">P</th>
                                            <th className="text-right py-0.5 w-6">W</th>
                                            <th className="text-right py-0.5 w-8">GD</th>
                                            <th className="text-right py-0.5 w-8">PTS</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {league.table.map(row => (
                                            <tr
                                                key={row.pos}
                                                className={cn(
                                                    'hover:bg-zinc-800/40 cursor-pointer transition-colors',
                                                    row.highlighted && 'text-teal-400'
                                                )}
                                            >
                                                <td className="py-0.5 text-zinc-400">{row.pos}</td>
                                                <td className="py-0.5" />
                                                <td className="py-0.5">
                                                    <div className="flex items-center gap-1.5">
                                                        <ClubBadge color={row.badgeColor} size="xs" />
                                                        <span className={cn('truncate', row.highlighted ? 'text-teal-400' : 'text-zinc-200')}>
                                                                {row.team}
                                                            </span>
                                                    </div>
                                                </td>
                                                <td className="py-0.5 text-right text-zinc-400">{row.p}</td>
                                                <td className="py-0.5 text-right text-zinc-400">{row.w}</td>
                                                <td className="py-0.5 text-right text-zinc-400">{row.gd}</td>
                                                <td className="py-0.5 text-right font-semibold text-zinc-200">{row.pts}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function LeaguesInFocusPage() {
    const pairs: [LeagueBlock, LeagueBlock | undefined][] = [];
    for (let i = 0; i < LEAGUES.length; i += 2) {
        pairs.push([LEAGUES[i], LEAGUES[i + 1]]);
    }

    return (
        <div className="h-[calc(100vh-120px)] px-2.5 pb-2.5">
            <ScrollArea className="h-full">
                <div className="pr-2 space-y-3 pb-4">
                    {pairs.map(([left, right], i) => (
                        <div key={i} className="grid grid-cols-2 gap-3">
                            <LeagueCard league={left} />
                            {right && <LeagueCard league={right} />}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}