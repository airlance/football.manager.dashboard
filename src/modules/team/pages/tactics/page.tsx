import { useState } from 'react';
import { SQUAD_PLAYERS, type Player } from './data';
import { Pitch } from './components/pitch';
import { PlayerList } from './components/player-list';
import { Helmet } from '@packages/react-helmet-async';
import { useTactics } from './use-tactics';
import { FORMATIONS } from './formations';
import { ChevronDown, RefreshCcw, Trash2, Wand2 } from 'lucide-react';
import { setPlayerDragImage } from './components/drag-image';

export function SetupPage() {
    const {
        formation,
        formationKey,
        isCustom,
        assignments,
        handleFormationChange,
        movePlayer,
        removePlayer,
        autoPick,
        clearPitch,
    } = useTactics(SQUAD_PLAYERS);

    const [draggingPlayer, setDraggingPlayer] = useState<Player | null>(null);
    const [showFormationMenu, setShowFormationMenu] = useState(false);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, player: Player) => {
        e.dataTransfer.setData('player', JSON.stringify(player));
        setDraggingPlayer(player);
    };

    const handleDragEnd = () => setDraggingPlayer(null);

    const handlePitchDrop = (e: React.DragEvent<HTMLDivElement>, slotId: string) => {
        setDraggingPlayer(null);
        try {
            const player = JSON.parse(e.dataTransfer.getData('player')) as Player;
            movePlayer(player, slotId);
        } catch { /* empty */ }
    };

    // Drop on squad list = remove from pitch
    const handleListDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingPlayer(null);
        try {
            const player = JSON.parse(e.dataTransfer.getData('player')) as Player;
            removePlayer(player.id);
        } catch { /* empty */ }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const displayName = isCustom
        ? `${formation.displayName} (Custom)`
        : formation.displayName;

    return (
        <div
            className="flex flex-col h-screen bg-[#111318] text-white font-sans selection:bg-green-500/30"
            onDragEnd={handleDragEnd}
        >
            <Helmet>
                <title>Tactics | Football Manager</title>
            </Helmet>

            {/* ── Top bar ──────────────────────────────────────────── */}
            <div className="flex-shrink-0 px-6 pt-4 pb-2 flex flex-col items-center gap-1 relative z-30">
                {/* FORMATION label */}
                <div className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Formation</div>

                {/* Formation selector */}
                <div className="relative">
                    <button
                        onClick={() => setShowFormationMenu(v => !v)}
                        className="flex items-center gap-2 text-2xl font-extrabold text-white hover:text-green-300 transition-colors"
                    >
                        {displayName}
                        <ChevronDown size={20} className="opacity-60" />
                    </button>

                    {showFormationMenu && (
                        <div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1b1e2b] border border-zinc-700 rounded-lg shadow-2xl overflow-hidden z-50 min-w-[180px]"
                        >
                            {Object.entries(FORMATIONS).map(([key, f]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        handleFormationChange(key);
                                        setShowFormationMenu(false);
                                    }}
                                    className={`w-full px-5 py-2.5 text-left text-sm font-bold hover:bg-green-600/20 transition-colors border-b border-zinc-800 last:border-0 ${
                                        formationKey === key ? 'text-green-400 bg-green-600/10' : 'text-white'
                                    }`}
                                >
                                    {f.displayName}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 mt-1">
                    <button
                        onClick={autoPick}
                        className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-bold text-yellow-400 transition-colors border border-zinc-700"
                    >
                        <Wand2 size={12} />
                        AUTO PICK
                    </button>
                    <button
                        onClick={clearPitch}
                        className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-bold text-red-400 transition-colors border border-zinc-700"
                    >
                        <Trash2 size={12} />
                        CLEAR
                    </button>
                </div>
            </div>

            {/* ── Main area ────────────────────────────────────────── */}
            <div className="flex-1 overflow-hidden px-4 pb-4 relative z-10">
                <div className="grid grid-cols-12 gap-4 h-full max-w-[1920px] mx-auto">

                    {/* Pitch - center */}
                    <div className="col-span-8 flex items-center justify-center relative">
                        <Pitch
                            assignments={assignments}
                            positions={formation.positions}
                            draggingPlayer={draggingPlayer}
                            onDragStart={handleDragStart}
                            onDrop={handlePitchDrop}
                        />

                        {/* Team Fluidity */}
                        <div className="absolute bottom-2 left-4 bg-black/50 p-2 rounded backdrop-blur text-white text-xs">
                            <div className="font-bold uppercase text-green-400 text-[10px]">Team Fluidity</div>
                            <div className="flex items-center gap-1">
                                <RefreshCcw size={10} className="text-green-400" />
                                <span>Fluid</span>
                            </div>
                        </div>

                        {/* Player count */}
                        <div className="absolute bottom-2 right-4 bg-black/50 px-2 py-1 rounded backdrop-blur text-xs text-gray-400">
                            {Object.keys(assignments).length} / 11
                        </div>
                    </div>

                    {/* Squad list */}
                    <div className="col-span-4 h-full overflow-hidden">
                        <PlayerList
                            players={SQUAD_PLAYERS}
                            gridAssignments={assignments}
                            positions={formation.positions}
                            onDragStart={(e, player) => {
                                setPlayerDragImage(e, player);
                                handleDragStart(e, player);
                            }}
                            onDragOver={handleDragOver}
                            onDrop={handleListDrop}
                            onAssign={(player, slotId) => movePlayer(player, slotId)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}