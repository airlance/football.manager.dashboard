import { ScrollArea } from "@/components/scroll-area";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RegionEvent {
    title: string;
    date: string;
    badgeBg?: string;
}

interface RegionHeadline {
    category: string;
    text: string;
}

interface Region {
    id: string;
    name: string;
    headerBg: string;
    textColor: string;
    headlines: RegionHeadline[];
    events: RegionEvent[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const REGIONS: Region[] = [
    {
        id: 'africa',
        name: 'AFRICA',
        headerBg: 'bg-green-600',
        textColor: 'text-white',
        headlines: [
            { category: 'CHAMPIONS LEAGUE', text: 'Champions League: Spotlight on Stade Félix...' },
            { category: 'CHAMPIONS LEAGUE', text: 'Champions League: Al Hawharah Al Zarqa play...' },
            { category: 'CHAMPIONS LEAGUE', text: 'Champions League kicks off' },
        ],
        events: [
            { title: 'Royal AM v Club Africain', date: 'Saturday 17th September 2022', badgeBg: 'bg-zinc-700' },
            { title: 'CS Sfax v Al-Gaish', date: 'Saturday 17th September 2022', badgeBg: 'bg-zinc-600' },
        ],
    },
    {
        id: 'asia',
        name: 'ASIA',
        headerBg: 'bg-purple-600',
        textColor: 'text-white',
        headlines: [
            { category: 'TEAM OF THE WEEK', text: 'Team of the Week announced' },
            { category: 'GALEOS KAGOSHIMA', text: 'Inoue seals move to Galeos Kagoshima' },
            { category: 'TOTTENHAM', text: 'Son shines as Tottenham win' },
        ],
        events: [
            { title: 'North Korea Under 23s v Jordan Under 23s', date: 'Wednesday 14th September 2022', badgeBg: 'bg-red-700' },
            { title: 'Uzbekistan Under 19s v Saudi Arabia Under 19s', date: 'Wednesday 14th September 2022', badgeBg: 'bg-green-700' },
        ],
    },
    {
        id: 'europe',
        name: 'EUROPE',
        headerBg: 'bg-blue-600',
        textColor: 'text-white',
        headlines: [
            { category: 'UEFA EUROPA LEAGUE', text: 'UEFA Europa League: Belotti gets the job done' },
            { category: 'UEFA EUROPA CONF. LEAGUE', text: 'UEFA Europa Conf. League: Entertainment at...' },
            { category: 'CAPITOLINE', text: 'UEFA Europa League Group B: Capitoline turn...' },
        ],
        events: [
            { title: 'UEFA Youth League starts', date: 'Tuesday 13th September 2022', badgeBg: 'bg-blue-700' },
            { title: 'Juventus v Benfica', date: 'Tuesday 13th September 2022', badgeBg: 'bg-zinc-600' },
        ],
    },
    {
        id: 'north-america',
        name: 'NORTH AMERICA',
        headerBg: 'bg-blue-500',
        textColor: 'text-white',
        headlines: [
            { category: 'TEAM OF THE WEEK', text: 'Team of the Week announced' },
            { category: 'TEAM OF THE WEEK', text: 'Team of the Week announced' },
            { category: 'TEAM OF THE WEEK', text: 'Team of the Week announced' },
        ],
        events: [
            { title: 'Campeones Cup starts', date: 'Wednesday 14th September 2022', badgeBg: 'bg-yellow-600' },
            { title: 'NYCFC v Atlas', date: 'Wednesday 14th September 2022', badgeBg: 'bg-yellow-500' },
        ],
    },
    {
        id: 'oceania',
        name: 'OCEANIA',
        headerBg: 'bg-teal-500',
        textColor: 'text-white',
        headlines: [
            { category: 'NEW ZEALAND', text: 'New Zealand boss faces injury headache' },
            { category: 'NEW ZEALAND', text: 'Clean bill of health for New Zealand Under 19s' },
            { category: 'NEW CALEDONIA', text: 'Clean bill of health for New Caledonia' },
        ],
        events: [
            { title: 'Oceania Champions League starts', date: 'Saturday 28th January 2023', badgeBg: 'bg-teal-600' },
            { title: 'Oceania Champions League ends', date: 'Sunday 14th May 2023', badgeBg: 'bg-teal-600' },
        ],
    },
    {
        id: 'south-america',
        name: 'SOUTH AMERICA',
        headerBg: 'bg-red-600',
        textColor: 'text-white',
        headlines: [
            { category: 'FOR', text: 'Copa Libertadores: BRA triumph despite secon...' },
            { category: 'TEAM OF THE WEEK', text: 'Team of the Week announced' },
            { category: 'PSG', text: 'Messi signs new 2-year PSG deal' },
        ],
        events: [
            { title: 'CBR v VDG', date: 'Tuesday 13th September 2022', badgeBg: 'bg-orange-500' },
            { title: 'COR v FLA', date: 'Wednesday 14th September 2022', badgeBg: 'bg-zinc-600' },
        ],
    },
];

// ─── Components ───────────────────────────────────────────────────────────────

function EventBadge({ bg = 'bg-zinc-700' }: { bg?: string }) {
    return (
        <div className={cn('size-10 rounded shrink-0 flex items-center justify-center', bg)}>
            <svg viewBox="0 0 24 24" className="size-5 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2 C12 2 16 8 16 12 C16 16 12 22 12 22 C12 22 8 16 8 12 C8 8 12 2 12 2Z" />
                <path d="M2 12 L22 12" />
            </svg>
        </div>
    );
}

function RegionCard({ region }: { region: Region }) {
    return (
        <div className="border border-zinc-700/60 rounded-lg overflow-hidden bg-zinc-900">
            {/* Header */}
            <div className={cn('px-4 py-2.5 flex items-center gap-2', region.headerBg)}>
                <div className="size-5 rounded-full bg-white/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="size-3 text-white" fill="currentColor">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/>
                        <path d="M2 12 L22 12 M12 2 C8 6 8 18 12 22 M12 2 C16 6 16 18 12 22" stroke="white" strokeWidth="1.5" fill="none"/>
                    </svg>
                </div>
                <span className={cn('text-sm font-bold tracking-wider', region.textColor)}>{region.name}</span>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 divide-x divide-zinc-700/40">
                {/* Headlines */}
                <div className="p-3 space-y-2.5">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">NEWS</p>
                    <div className="space-y-2.5">
                        {region.headlines.map((h, i) => (
                            <div key={i} className="cursor-pointer group">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{h.category}</p>
                                <p className="text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">{h.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Events */}
                <div className="p-3 space-y-2.5">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">EVENTS</p>
                    <div className="space-y-2">
                        {region.events.map((ev, i) => (
                            <div key={i} className="flex items-center gap-2.5 cursor-pointer group">
                                <EventBadge bg={ev.badgeBg} />
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors leading-snug">{ev.title}</p>
                                    <p className="text-[10px] text-zinc-500 mt-0.5">{ev.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AroundTheWorldPage() {
    const pairs: [Region, Region | undefined][] = [];
    for (let i = 0; i < REGIONS.length; i += 2) {
        pairs.push([REGIONS[i], REGIONS[i + 1]]);
    }

    return (
        <div className="h-[calc(100vh-120px)] px-2.5 pb-2.5">
            <ScrollArea className="h-full">
                <div className="pr-2 space-y-3 pb-4">
                    {pairs.map(([left, right], i) => (
                        <div key={i} className="grid grid-cols-2 gap-3">
                            <RegionCard region={left} />
                            {right && <RegionCard region={right} />}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}