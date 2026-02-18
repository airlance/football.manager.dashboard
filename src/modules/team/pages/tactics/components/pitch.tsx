import { useRef } from 'react';
import type { Player } from '../data';
import { PitchCell } from './pitch-cell';
import { FIELD_ROWS, FIELD_COLS, type GridPosition } from '../formations';

interface PitchProps {
    gridAssignments: Record<string, Player>;
    positions: GridPosition[];
    onDragStart: (e: React.DragEvent<HTMLDivElement>, player: Player, source: 'pitch') => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>, row: number, col: number) => void;
}

/** SVG field markings — drawn over the grass */
function PitchMarkings() {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 300 360"
            preserveAspectRatio="none"
        >
            {/* Outer border */}
            <rect x="8" y="8" width="284" height="344" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" rx="2" />

            {/* Centre line */}
            <line x1="8" y1="180" x2="292" y2="180" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

            {/* Centre circle */}
            <circle cx="150" cy="180" r="38" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <circle cx="150" cy="180" r="2.5" fill="rgba(255,255,255,0.35)" />

            {/* ── TOP HALF ── */}
            {/* Penalty area top */}
            <rect x="75" y="8" width="150" height="72" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
            {/* Goal area top */}
            <rect x="112" y="8" width="76" height="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            {/* Penalty spot top */}
            <circle cx="150" cy="62" r="2" fill="rgba(255,255,255,0.3)" />
            {/* Penalty arc top */}
            <path d="M 110 80 A 38 38 0 0 0 190 80" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            {/* Goal top */}
            <rect x="124" y="3" width="52" height="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

            {/* ── BOTTOM HALF ── */}
            {/* Penalty area bottom */}
            <rect x="75" y="280" width="150" height="72" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
            {/* Goal area bottom */}
            <rect x="112" y="322" width="76" height="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            {/* Penalty spot bottom */}
            <circle cx="150" cy="298" r="2" fill="rgba(255,255,255,0.3)" />
            {/* Penalty arc bottom */}
            <path d="M 110 280 A 38 38 0 0 1 190 280" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            {/* Goal bottom */}
            <rect x="124" y="349" width="52" height="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

            {/* Corner arcs */}
            <path d="M 8 20 A 10 10 0 0 1 20 8"   fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <path d="M 280 8 A 10 10 0 0 1 292 20" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <path d="M 8 340 A 10 10 0 0 0 20 352" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <path d="M 280 352 A 10 10 0 0 0 292 340" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        </svg>
    );
}

/** Alternating dark/light grass stripes */
function GrassStripes({ rows }: { rows: number }) {
    return (
        <>
            {Array.from({ length: rows }).map((_, i) => (
                <div
                    key={i}
                    className="absolute left-0 right-0 pointer-events-none"
                    style={{
                        top: `${(i / rows) * 100}%`,
                        height: `${100 / rows}%`,
                        background: i % 2 === 0 ? 'rgba(0,0,0,0.07)' : 'transparent',
                    }}
                />
            ))}
        </>
    );
}

export function Pitch({ gridAssignments, positions, onDragStart, onDrop }: PitchProps) {
    const pitchRef = useRef<HTMLDivElement>(null);

    const cells = [];
    for (let row = 0; row < FIELD_ROWS; row++) {
        for (let col = 0; col < FIELD_COLS; col++) {
            const key = `${row}-${col}`;
            const player = gridAssignments[key];
            const positionLabel = positions.find(p => p.row === row && p.col === col)?.label;

            cells.push(
                <PitchCell
                    key={key}
                    row={row}
                    col={col}
                    player={player}
                    label={positionLabel}
                    onDrop={onDrop}
                    onDragStart={(e, p) => onDragStart(e, p, 'pitch')}
                />
            );
        }
    }

    return (
        <div
            ref={pitchRef}
            className="relative w-full select-none"
            style={{
                aspectRatio: '5/6',
                maxWidth: 500,
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
        >
            {/* Grass base */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, #1a4d28 0%, #1e5c2e 35%, #1a5228 65%, #1e5c2e 100%)',
                }}
            />

            {/* Stripe overlay */}
            <GrassStripes rows={FIELD_ROWS} />

            {/* SVG markings */}
            <PitchMarkings />

            {/* Grid of cells */}
            <div className="grid grid-rows-6 grid-cols-5 w-full h-full relative z-10">
                {cells}
            </div>
        </div>
    );
}