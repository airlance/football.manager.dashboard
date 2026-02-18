import { useState } from 'react';
import type { Player } from '../data';
import type { GridPosition } from '../formations';
import { ChevronDown } from 'lucide-react';

interface PositionSlotProps {
    slot: GridPosition;
    player: Player | undefined;
    draggingPlayer: Player | null;
    onDrop: (e: React.DragEvent<HTMLDivElement>, slotId: string) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, player: Player) => void;
}

// ── Duty colours / abbreviations ─────────────────────────────────────────────
const DUTY_COLOR: Record<string, string> = {
    Attack: '#9b6eec', attack: '#9b6eec',
    Support: '#2ecc71', support: '#2ecc71',
    Defend: '#e74c3c', defend: '#e74c3c',
};
const DUTY_ABBR: Record<string, string> = {
    Attack: 'At', attack: 'At',
    Support: 'Su', support: 'Su',
    Defend: 'De', defend: 'De',
};

// ── Role background colours (matching FM dark palette) ───────────────────────
function roleBg(label: string, isGK: boolean): string {
    if (isGK) return '#3d2b10';
    if (['WB','DL','DR','DC','CD','BPD'].includes(label)) return '#1a2a44';
    if (['DM','BWM','CM','MC'].includes(label)) return '#1e2236';
    return '#1e1e36'; // AM / attackers
}

// ── Compatibility check ───────────────────────────────────────────────────────
type Compat = 'natural' | 'accomplished' | 'incompatible';

function getCompat(player: Player, slot: GridPosition): Compat {
    const pos = player.position;
    if (slot.label === 'GK') return pos === 'GK' ? 'natural' : 'incompatible';
    if (pos === 'GK') return 'incompatible';

    const matches = (codes: string[]) =>
        codes.some(c => pos === c || pos.startsWith(c) || c.startsWith(pos));

    if (matches(slot.naturalFor)) return 'natural';
    if (matches(slot.accomplishedFor)) return 'accomplished';
    return 'incompatible';
}

const COMPAT_RING: Record<Compat, string> = {
    natural:      'rgba(74, 222, 128, 0.9)',
    accomplished: 'rgba(251, 146, 60, 0.9)',
    incompatible: 'rgba(248, 113, 113, 0.7)',
};
const COMPAT_LABEL: Record<Compat, string> = {
    natural:      'Natural',
    accomplished: 'Accom.',
    incompatible: '✕',
};

// ── Ghost shirt SVG ───────────────────────────────────────────────────────────
function GhostShirt({ isGK }: { isGK: boolean }) {
    return (
        <svg width="56" height="56" viewBox="0 0 40 40">
            <path
                d="M8 12 L4 18 L10 20 L10 34 L30 34 L30 20 L36 18 L32 12 L26 10 Q20 14 14 10 Z"
                fill={isGK ? 'rgba(150,60,40,0.18)' : 'rgba(255,255,255,0.09)'}
                stroke={isGK ? 'rgba(180,80,50,0.5)' : 'rgba(255,255,255,0.38)'}
                strokeWidth="1"
            />
            <path d="M14 10 Q20 16 26 10" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
            <path d="M8 12 L4 18 L10 20 L10 16" fill="rgba(255,255,255,0.04)" />
            <path d="M32 12 L36 18 L30 20 L30 16" fill="rgba(255,255,255,0.04)" />
        </svg>
    );
}

// ── Real player shirt SVG ─────────────────────────────────────────────────────
function PlayerShirt({ number, isGK }: { number: number; isGK: boolean }) {
    // GK gets a teal/chequered feel, outfield get dark shirt
    const fill = isGK ? '#1a7a6e' : '#1c1c2e';
    const collar = isGK ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.25)';
    const numColor = isGK ? '#ffffff' : '#f5a623';

    return (
        <svg
            width="68" height="68" viewBox="0 0 40 40"
            style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.75))' }}
        >
            <path
                d="M8 12 L4 18 L10 20 L10 34 L30 34 L30 20 L36 18 L32 12 L26 10 Q20 14 14 10 Z"
                fill={fill}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.6"
            />
            {isGK && (
                // chequered pattern hint
                <path
                    d="M10 20 L10 34 L20 34 L20 20 Z M20 27 L30 27 L30 34 L20 34 Z"
                    fill="rgba(255,255,255,0.06)"
                />
            )}
            <path d="M14 10 Q20 16 26 10" fill="none" stroke={collar} strokeWidth="1" />
            <path d="M8 12 L4 18 L10 20 L10 16" fill="rgba(255,255,255,0.07)" />
            <path d="M32 12 L36 18 L30 20 L30 16" fill="rgba(255,255,255,0.07)" />
            <text
                x="20" y="26"
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontWeight="bold"
                fill={numColor}
                fontFamily="Georgia, serif"
            >
                {number}
            </text>
        </svg>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
export function PositionSlot({
                                 slot, player, draggingPlayer, onDrop, onDragStart,
                             }: PositionSlotProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    const compat: Compat | null = draggingPlayer ? getCompat(draggingPlayer, slot) : null;
    const isGKSlot = slot.label === 'GK';
    const isGKPlayer = player?.position === 'GK';

    // Card outer ring / glow during drag
    const ringColor = compat ? COMPAT_RING[compat] : 'transparent';
    const ringStyle: React.CSSProperties = compat
        ? {
            boxShadow: `0 0 0 2px ${ringColor}, 0 0 14px ${ringColor.replace('0.9', '0.3').replace('0.7', '0.2')}`,
            borderRadius: 7,
        }
        : {};

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = compat === 'incompatible' ? 'none' : 'move';
        setIsDragOver(true);
    };
    const handleDragLeave = () => setIsDragOver(false);
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        onDrop(e, slot.id);
    };

    // Resolved values (use player's role/duty if assigned, else slot defaults)
    const duty     = player ? player.duty     : slot.defaultDuty;
    const role     = player ? player.role     : slot.defaultRole;
    const dutyClr  = DUTY_COLOR[duty]  ?? '#888';
    const dutyAbbr = DUTY_ABBR[duty]   ?? 'Su';
    const bg       = roleBg(slot.label, isGKSlot);

    const shortName = player
        ? (player.name.length > 12 ? player.name.split(' ').pop()! : player.name)
        : null;

    return (
        <div
            style={{
                position: 'absolute',
                left: `${slot.x}%`,
                top:  `${slot.y}%`,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: isDragOver ? 20 : 10,
                // slight opacity when dragging this specific player
                opacity: draggingPlayer && player?.id === draggingPlayer.id ? 0.4 : 1,
                transition: 'opacity 0.15s',
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* ── Shirt ── */}
            {player ? (
                <div
                    draggable
                    onDragStart={e => onDragStart(e, player)}
                    className="transition-transform hover:scale-105"
                    style={{ cursor: 'grab' }}
                >
                    <PlayerShirt number={player.number} isGK={isGKPlayer} />
                </div>
            ) : (
                <div style={{ opacity: draggingPlayer ? 0.6 : 0.38, pointerEvents: 'none' }}>
                    <GhostShirt isGK={isGKSlot} />
                </div>
            )}

            {/* ── FM card ── */}
            <div
                style={{
                    marginTop: -2,
                    minWidth: 104,
                    maxWidth: 128,
                    borderRadius: 6,
                    overflow: 'hidden',
                    ...ringStyle,
                    transition: 'box-shadow 0.12s',
                    cursor: player ? 'grab' : 'default',
                    // dim slot card (not the shirt) while player drags away
                    pointerEvents: player && draggingPlayer?.id === player.id ? 'none' : 'auto',
                }}
                draggable={!!player}
                onDragStart={player ? e => onDragStart(e, player) : undefined}
            >
                {/* Role – Duty row */}
                <div style={{
                    background: bg,
                    padding: '4px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    gap: 4,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{
                            fontSize: 12, fontWeight: 700, color: '#c8c8d8',
                            fontFamily: 'monospace', letterSpacing: '0.02em',
                        }}>
                            {role}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>-</span>
                        <span style={{
                            fontSize: 12, fontWeight: 700, color: dutyClr, fontFamily: 'monospace',
                        }}>
                            {dutyAbbr}
                        </span>
                    </div>
                    <ChevronDown size={11} color="rgba(255,255,255,0.35)" />
                </div>

                {/* Pick Player / name row */}
                <div style={{
                    background: 'rgba(10,12,22,0.94)',
                    padding: '4px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 4,
                }}>
                    {player ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, overflow: 'hidden' }}>
                                {/* Small person icon */}
                                <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0, opacity: 0.5 }}>
                                    <circle cx="5" cy="3" r="2" fill="rgba(255,255,255,0.7)" />
                                    <path d="M1 10 Q1 7 5 7 Q9 7 9 10" fill="rgba(255,255,255,0.7)" />
                                </svg>
                                <span style={{
                                    fontSize: 12, color: '#eaeaf5', fontWeight: 600,
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                    fontFamily: 'system-ui, sans-serif',
                                }}>
                                    {shortName}
                                </span>
                            </div>
                            <ChevronDown size={11} color="rgba(255,255,255,0.35)" />
                        </>
                    ) : (
                        <>
                            <span style={{
                                fontSize: 11, color: 'rgba(200,200,220,0.45)',
                                fontFamily: 'system-ui, sans-serif', fontStyle: 'italic',
                            }}>
                                Pick Player
                            </span>
                            <ChevronDown size={11} color="rgba(255,255,255,0.2)" />
                        </>
                    )}
                </div>
            </div>

            {/* ── Compat label (shown only during drag) ── */}
            {compat && (
                <div style={{
                    marginTop: 4,
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: COMPAT_RING[compat],
                    textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                    pointerEvents: 'none',
                }}>
                    {COMPAT_LABEL[compat]}
                </div>
            )}
        </div>
    );
}