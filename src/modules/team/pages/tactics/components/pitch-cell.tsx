import { useState } from 'react';
import type { Player } from '../data';
import { PitchPlayer } from './pitch-player';
import { GhostPlayer } from './ghost-player';

interface PitchCellProps {
    row: number;
    col: number;
    player: Player | undefined;
    label?: string;
    draggingPlayer: Player | null;
    onDrop: (e: React.DragEvent<HTMLDivElement>, row: number, col: number) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, player: Player) => void;
}

function ratingToColor(rating: number): string {
    if (rating <= 0) return 'rgba(220, 38, 38, 0.55)';
    if (rating >= 100) return 'rgba(34, 197, 94, 0.55)';

    if (rating < 50) {
        const t = rating / 50;
        const g = Math.round(38 + (197 - 38) * t);
        return `rgba(220, ${g}, 38, 0.55)`;
    } else {
        const t = (rating - 50) / 50;
        const r = Math.round(220 - (220 - 34) * t);
        return `rgba(${r}, 197, 94, 0.55)`;
    }
}

function getPositionRating(player: Player, positionLabel: string): number {
    const ratings = player.positionRatings;
    if (!ratings) return 0;
    if (ratings[positionLabel] !== undefined) return ratings[positionLabel];

    const label = positionLabel.toUpperCase();
    let best = 0;
    for (const [key, val] of Object.entries(ratings)) {
        const k = key.toUpperCase();
        if (k === label || k.startsWith(label) || label.startsWith(k)) {
            if (val > best) best = val;
        }
    }
    return best;
}

export function PitchCell({ row, col, player, label, draggingPlayer, onDrop, onDragStart }: PitchCellProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setIsDragOver(true);
    };

    const handleDragLeave = () => setIsDragOver(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        onDrop(e, row, col);
    };

    let highlightStyle: React.CSSProperties = {};
    let ratingPct: number | null = null;

    if (draggingPlayer && label) {
        ratingPct = getPositionRating(draggingPlayer, label);
        const color = ratingToColor(ratingPct);
        highlightStyle = {
            backgroundColor: color,
            boxShadow: `inset 0 0 0 2px ${color.replace('0.55', '0.9')}`,
            transition: 'background-color 0.15s, box-shadow 0.15s',
        };
    } else if (isDragOver) {
        highlightStyle = { backgroundColor: 'rgba(255,255,255,0.12)' };
    }

    const isFormationSlot = Boolean(label);

    return (
        <div
            className="relative w-full h-full flex items-center justify-center"
            style={highlightStyle}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Rating overlay during drag */}
            {draggingPlayer && label && ratingPct !== null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30">
                    <span className="text-[11px] font-bold text-white drop-shadow-md">{label}</span>
                    <span
                        className="text-[11px] font-bold drop-shadow-md"
                        style={{
                            color: ratingPct >= 67 ? '#4ade80' : ratingPct >= 34 ? '#facc15' : '#f87171',
                        }}
                    >
                        {ratingPct}%
                    </span>
                </div>
            )}

            {player ? (
                <div className="z-10">
                    <PitchPlayer
                        player={player}
                        position={{ x: 50, y: 50 }}
                        onDragStart={(e, p) => onDragStart(e, p)}
                    />
                </div>
            ) : isFormationSlot && !draggingPlayer ? (
                /* Ghost player shown when slot is empty and nothing is being dragged */
                <GhostPlayer label={label!} />
            ) : null}
        </div>
    );
}