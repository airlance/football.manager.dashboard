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

const DUTY_COLOR: Record<string, string> = {
    Attack: '#8b5cf6', attack: '#8b5cf6',
    Support: '#27ae60', support: '#27ae60',
    Defend: '#e74c3c', defend: '#e74c3c',
};

const DUTY_ABBR: Record<string, string> = {
    Attack: 'At', attack: 'At',
    Support: 'Su', support: 'Su',
    Defend: 'De', defend: 'De',
};

// Determines highlight level for a dragging player dropped on this slot
function getCompatibility(
    draggingPlayer: Player,
    slot: GridPosition,
): 'natural' | 'accomplished' | 'incompatible' | null {
    if (!draggingPlayer) return null;
    const pos = draggingPlayer.position;

    // GK can only go to GK slot; GK slot only accepts GK
    if (slot.label === 'GK') {
        return pos === 'GK' ? 'natural' : 'incompatible';
    }
    if (pos === 'GK') {
        return 'incompatible';
    }

    if (slot.naturalFor.some(p =>
        pos === p || pos.startsWith(p) || p.startsWith(pos)
    )) return 'natural';

    if (slot.accomplishedFor.some(p =>
        pos === p || pos.startsWith(p) || p.startsWith(pos)
    )) return 'accomplished';

    return 'incompatible';
}

// Ghost shirt SVG (transparent, outlined)
function GhostShirt({ isGK = false }: { isGK?: boolean }) {
    return (
        <svg width="52" height="52" viewBox="0 0 40 40">
            <path
                d="M8 12 L4 18 L10 20 L10 34 L30 34 L30 20 L36 18 L32 12 L26 10 Q20 14 14 10 Z"
                fill={isGK ? 'rgba(180,60,40,0.18)' : 'rgba(255,255,255,0.10)'}
                stroke={isGK ? 'rgba(180,60,40,0.55)' : 'rgba(255,255,255,0.40)'}
                strokeWidth="1"
            />
            <path d="M14 10 Q20 16 26 10" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            <path d="M8 12 L4 18 L10 20 L10 16" fill="rgba(255,255,255,0.05)" />
            <path d="M32 12 L36 18 L30 20 L30 16" fill="rgba(255,255,255,0.05)" />
        </svg>
    );
}

// Real player shirt SVG
function PlayerShirt({ number, isGK }: { number: number; isGK: boolean }) {
    const shirtColor = isGK ? '#c0392b' : '#1a1a1a';
    return (
        <svg width="64" height="64" viewBox="0 0 40 40" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.7))' }}>
            <path
                d="M8 12 L4 18 L10 20 L10 34 L30 34 L30 20 L36 18 L32 12 L26 10 Q20 14 14 10 Z"
                fill={shirtColor} stroke="rgba(255,255,255,0.18)" strokeWidth="0.5"
            />
            <path d="M14 10 Q20 16 26 10" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            <path d="M8 12 L4 18 L10 20 L10 16" fill="rgba(255,255,255,0.08)" />
            <path d="M32 12 L36 18 L30 20 L30 16" fill="rgba(255,255,255,0.08)" />
            <text x="20" y="26" textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fontWeight="bold" fill="#f39c12" fontFamily="Georgia,serif">
                {number}
            </text>
        </svg>
    );
}

export function PositionSlot({ slot, player, draggingPlayer, onDrop, onDragStart }: PositionSlotProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    const compatibility = draggingPlayer ? getCompatibility(draggingPlayer, slot) : null;
    const isGKSlot = slot.label === 'GK';
    const isGKPlayer = player?.position === 'GK';

    // Border/background highlight during drag
    let highlightStyle: React.CSSProperties = {};
    let ringColor = 'transparent';

    if (compatibility === 'natural') {
        ringColor = 'rgba(74, 222, 128, 0.85)';
        highlightStyle = { boxShadow: `0 0 0 2px ${ringColor}, 0 0 12px rgba(74,222,128,0.25)` };
    } else if (compatibility === 'accomplished') {
        ringColor = 'rgba(251, 146, 60, 0.85)';
        highlightStyle = { boxShadow: `0 0 0 2px ${ringColor}, 0 0 12px rgba(251,146,60,0.2)` };
    } else if (compatibility === 'incompatible') {
        ringColor = 'rgba(248, 113, 113, 0.7)';
        highlightStyle = { boxShadow: `0 0 0 2px ${ringColor}` };
    }

    if (isDragOver && compatibility !== 'incompatible') {
        highlightStyle = {
            ...highlightStyle,
            backgroundColor: 'rgba(255,255,255,0.08)',
        };
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = compatibility === 'incompatible' ? 'none' : 'move';
        setIsDragOver(true);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        onDrop(e, slot.id);
    };

    const dutyColor = player
        ? (DUTY_COLOR[player.duty] ?? '#888')
        : (DUTY_COLOR[slot.defaultDuty] ?? '#888');

    const dutyAbbr = player
        ? (DUTY_ABBR[player.duty] ?? 'Su')
        : (DUTY_ABBR[slot.defaultDuty] ?? 'Su');

    const roleLabel = player ? player.role : slot.defaultRole;
    const shortName = player
        ? (player.name.length > 11 ? player.name.split(' ').pop()! : player.name)
        : null;

    return (
        <div
            style={{
                position: 'absolute',
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: isDragOver ? 20 : 10,
                transition: 'all 0.15s ease',
            }}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
        >
            {/* Shirt */}
            {player ? (
                <div
                    draggable
                    onDragStart={(e) => onDragStart(e, player)}
                    style={{ cursor: 'grab', transition: 'transform 0.15s' }}
                    className="hover:scale-110"
                >
                    <PlayerShirt number={player.number} isGK={isGKPlayer} />
                </div>
            ) : (
                <div style={{ opacity: draggingPlayer ? 0.55 : 0.35 }}>
                    <GhostShirt isGK={isGKSlot} />
                </div>
            )}

            {/* FM-style card */}
            <div
                style={{
                    marginTop: -2,
                    borderRadius: 6,
                    overflow: 'hidden',
                    minWidth: 100,
                    maxWidth: 120,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                    ...highlightStyle,
                    transition: 'box-shadow 0.15s',
                }}
            >
                {/* Role-Duty row */}
                <div style={{
                    background: isGKSlot
                        ? 'rgba(80,50,20,0.95)'
                        : player
                            ? 'rgba(30,30,50,0.95)'
                            : 'rgba(30,40,60,0.88)',
                    padding: '3px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#d4d4d4', fontFamily: 'monospace' }}>
                            {roleLabel}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>-</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: dutyColor, fontFamily: 'monospace' }}>
                            {dutyAbbr}
                        </span>
                    </div>
                    <ChevronDown size={10} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0, marginLeft: 2 }} />
                </div>

                {/* Player name row */}
                <div style={{
                    background: 'rgba(15,20,35,0.92)',
                    padding: '3px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 4,
                }}>
                    {player ? (
                        <>
                            <span style={{
                                fontSize: 12, color: '#f0f0f0', fontWeight: 600,
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                fontFamily: 'system-ui, sans-serif',
                            }}>
                                {shortName}
                            </span>
                            <ChevronDown size={10} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                        </>
                    ) : (
                        <>
                            <span style={{ fontSize: 11, color: 'rgba(200,200,220,0.5)', fontStyle: 'italic' }}>
                                Pick Player
                            </span>
                            <ChevronDown size={10} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
                        </>
                    )}
                </div>
            </div>

            {/* Compatibility label shown during drag */}
            {draggingPlayer && compatibility && (
                <div style={{
                    marginTop: 3,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: compatibility === 'natural' ? '#4ade80' : compatibility === 'accomplished' ? '#fb923c' : '#f87171',
                    textTransform: 'uppercase',
                    textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                }}>
                    {compatibility === 'natural' ? 'Natural' : compatibility === 'accomplished' ? 'Accomplished' : '✕'}
                </div>
            )}
        </div>
    );
}