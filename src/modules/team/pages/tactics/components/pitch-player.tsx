import type { Player } from '../data';
import { setPlayerDragImage } from './drag-image';

interface PitchPlayerProps {
    player: Player;
    position: { x: number; y: number };
    onDragStart: (e: React.DragEvent<HTMLDivElement>, player: Player, source: 'pitch') => void;
}

const DUTY_COLOR: Record<string, string> = {
    attack:  '#8b5cf6',
    Attack:  '#8b5cf6',
    support: '#27ae60',
    Support: '#27ae60',
    defend:  '#e74c3c',
    Defend:  '#e74c3c',
};

const DUTY_ABBR: Record<string, string> = {
    attack:  'At',
    Attack:  'At',
    support: 'Su',
    Support: 'Su',
    defend:  'De',
    Defend:  'De',
};

function PlayerShirt({ number, isGK }: { number: number; isGK: boolean }) {
    const shirtColor = isGK ? '#c0392b' : '#1a1a1a';
    const numberColor = '#f39c12';

    return (
        <svg width="52" height="52" viewBox="0 0 40 40">
            {/* Shirt body */}
            <path
                d="M8 12 L4 18 L10 20 L10 34 L30 34 L30 20 L36 18 L32 12 L26 10 Q20 14 14 10 Z"
                fill={shirtColor}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
            />
            {/* Collar */}
            <path
                d="M14 10 Q20 16 26 10"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
            />
            {/* Sleeve highlights */}
            <path d="M8 12 L4 18 L10 20 L10 16" fill="rgba(255,255,255,0.08)" />
            <path d="M32 12 L36 18 L30 20 L30 16" fill="rgba(255,255,255,0.08)" />
            {/* Number */}
            <text
                x="20" y="26"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fontWeight="bold"
                fill={numberColor}
                fontFamily="Georgia, serif"
            >
                {number}
            </text>
        </svg>
    );
}

export function PitchPlayer({ player, position, onDragStart }: PitchPlayerProps) {
    const isGK = player.position === 'GK';
    const dutyColor = DUTY_COLOR[player.duty] ?? '#888';
    const dutyAbbr = DUTY_ABBR[player.duty] ?? player.duty.slice(0, 2);

    const shortName =
        player.name.length > 11 ? player.name.split(' ').pop()! : player.name;

    return (
        <div
            draggable
            onDragStart={(e) => {
                setPlayerDragImage(e, player);
                onDragStart(e, player, 'pitch');
            }}
            style={{
                position: 'absolute',
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'grab',
                zIndex: 10,
                userSelect: 'none',
            }}
            className="flex flex-col items-center group"
        >
            {/* Shirt - bigger */}
            <div
                className="transition-transform group-hover:scale-110"
                style={{
                    filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.7))',
                }}
            >
                <PlayerShirt number={player.number} isGK={isGK} />
            </div>

            {/* Name badge - wider */}
            <div
                style={{
                    background: 'rgba(15,15,25,0.92)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 5,
                    padding: '3px 7px',
                    marginTop: 2,
                    minWidth: 72,
                    maxWidth: 96,
                    textAlign: 'center',
                    backdropFilter: 'blur(4px)',
                }}
            >
                {/* Role – Duty row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginBottom: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#d4d4d4', letterSpacing: '0.03em', fontFamily: 'monospace' }}>
                        {player.role}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10 }}>–</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: dutyColor, fontFamily: 'monospace' }}>
                        {dutyAbbr}
                    </span>
                </div>
                {/* Name */}
                <div style={{
                    fontSize: 11,
                    color: '#f0f0f0',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontFamily: 'system-ui, sans-serif',
                }}>
                    {shortName}
                </div>
            </div>
        </div>
    );
}