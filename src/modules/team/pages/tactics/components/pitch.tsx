import type { Player } from '../data';
import type { GridPosition } from '../formations';
import { PositionSlot } from './position-slot';
import { setPlayerDragImage } from './drag-image';

interface PitchProps {
    assignments: Record<string, Player>;
    positions: GridPosition[];
    draggingPlayer: Player | null;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, player: Player) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>, slotId: string) => void;
}

function PitchMarkings() {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 300 420"
            preserveAspectRatio="none"
        >
            {/* Outer boundary */}
            <rect x="8" y="8" width="284" height="404" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" rx="2" />
            {/* Half-way line */}
            <line x1="8" y1="210" x2="292" y2="210" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
            {/* Centre circle */}
            <circle cx="150" cy="210" r="38" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <circle cx="150" cy="210" r="2.5" fill="rgba(255,255,255,0.30)" />

            {/* Top penalty area */}
            <rect x="75" y="8" width="150" height="72" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            <rect x="112" y="8" width="76" height="30" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
            <circle cx="150" cy="62" r="2" fill="rgba(255,255,255,0.28)" />
            <path d="M 110 80 A 38 38 0 0 0 190 80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
            {/* Top goal */}
            <rect x="124" y="3" width="52" height="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />

            {/* Bottom penalty area */}
            <rect x="75" y="340" width="150" height="72" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            <rect x="112" y="382" width="76" height="30" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
            <circle cx="150" cy="358" r="2" fill="rgba(255,255,255,0.28)" />
            <path d="M 110 340 A 38 38 0 0 1 190 340" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
            {/* Bottom goal */}
            <rect x="124" y="409" width="52" height="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />

            {/* Corner arcs */}
            <path d="M 8 20 A 10 10 0 0 1 20 8"    fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <path d="M 280 8 A 10 10 0 0 1 292 20"  fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <path d="M 8 400 A 10 10 0 0 0 20 412"  fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <path d="M 280 412 A 10 10 0 0 0 292 400" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
    );
}

function GrassStripes() {
    const stripes = 8;
    return (
        <>
            {Array.from({ length: stripes }).map((_, i) => (
                <div
                    key={i}
                    className="absolute left-0 right-0 pointer-events-none"
                    style={{
                        top: `${(i / stripes) * 100}%`,
                        height: `${100 / stripes}%`,
                        background: i % 2 === 0 ? 'rgba(0,0,0,0.06)' : 'transparent',
                    }}
                />
            ))}
        </>
    );
}

export function Pitch({ assignments, positions, draggingPlayer, onDragStart, onDrop }: PitchProps) {
    const handleSlotDragStart = (e: React.DragEvent<HTMLDivElement>, player: Player) => {
        setPlayerDragImage(e, player);
        onDragStart(e, player);
    };

    return (
        <div
            className="relative select-none"
            style={{
                width: '100%',
                aspectRatio: '3 / 4',
                maxWidth: 480,
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
        >
            {/* Grass background */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, #1a4d28 0%, #1e5c2e 40%, #1a5228 65%, #1e5c2e 100%)',
                }}
            />
            <GrassStripes />
            <PitchMarkings />

            {/* Absolute-positioned slots */}
            <div className="absolute inset-0">
                {positions.map(slot => (
                    <PositionSlot
                        key={slot.id}
                        slot={slot}
                        player={assignments[slot.id]}
                        draggingPlayer={draggingPlayer}
                        onDrop={onDrop}
                        onDragStart={handleSlotDragStart}
                    />
                ))}
            </div>
        </div>
    );
}