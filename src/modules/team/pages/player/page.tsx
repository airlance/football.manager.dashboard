import React, { useState, useRef } from 'react';
import { Users, Star, Activity, Shield, Target, Move } from 'lucide-react';

export function PlayerPage() {
    const [formation, setFormation] = useState('4-2-3-1');
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [draggingPosition, setDraggingPosition] = useState(null);
    const fieldRef = useRef(null);

    const [fieldPositions, setFieldPositions] = useState({
        GK: { player: 'Ederson', x: 50, y: 90, id: 1 },
        DR: { player: 'Kyle Walker', x: 75, y: 75, id: 2 },
        DCR: { player: 'Ruben Dias', x: 60, y: 80, id: 3 },
        DCL: { player: 'Aymeric Laporte', x: 40, y: 80, id: 4 },
        DL: { player: 'João Cancelo', x: 25, y: 75, id: 5 },
        MCR: { player: 'Rodri', x: 60, y: 60, id: 6 },
        MCL: { player: 'Kevin De Bruyne', x: 40, y: 60, id: 7 },
        AMR: { player: 'Bernardo Silva', x: 70, y: 40, id: 8 },
        AMC: { player: 'Phil Foden', x: 50, y: 35, id: 9 },
        AML: { player: 'Jack Grealish', x: 30, y: 40, id: 10 },
        STC: { player: 'Erling Haaland', x: 50, y: 15, id: 11 }
    });

    const [squad, setSquad] = useState([
        { id: 1, name: 'Ederson', position: 'GK', rating: 4, status: 'playing' },
        { id: 2, name: 'Kyle Walker', position: 'WB', rating: 3.5, status: 'playing' },
        { id: 3, name: 'Ruben Dias', position: 'BPD', rating: 4, status: 'playing' },
        { id: 4, name: 'Aymeric Laporte', position: 'CD', rating: 3.5, status: 'playing' },
        { id: 5, name: 'João Cancelo', position: 'WB', rating: 3, status: 'playing' },
        { id: 6, name: 'Rodri', position: 'BWM', rating: 4, status: 'playing' },
        { id: 7, name: 'Kevin De Bruyne', position: 'BBM', rating: 4.5, status: 'playing' },
        { id: 8, name: 'Bernardo Silva', position: 'IF', rating: 4, status: 'playing' },
        { id: 9, name: 'Phil Foden', position: 'AM', rating: 3, status: 'playing' },
        { id: 10, name: 'Jack Grealish', position: 'IF', rating: 3.5, status: 'playing' },
        { id: 11, name: 'Erling Haaland', position: 'AF', rating: 4.5, status: 'playing' },
        { id: 12, name: 'Stefan Ortega', position: 'GK', rating: 3, status: 'bench' },
        { id: 13, name: 'John Stones', position: 'CD', rating: 4, status: 'bench' },
        { id: 14, name: 'Kalvin Phillips', position: 'DM', rating: 3, status: 'bench' },
        { id: 15, name: 'Julián Álvarez', position: 'ST', rating: 3.5, status: 'bench' },
        { id: 16, name: 'Manuel Akanji', position: 'CD', rating: 3.5, status: 'bench' }
    ]);

    const getFieldCoordinates = (e) => {
        if (!fieldRef.current) return { x: 0, y: 0 };

        const rect = fieldRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        return {
            x: Math.max(5, Math.min(95, x)),
            y: Math.max(5, Math.min(95, y))
        };
    };

    const handleMouseDown = (position) => {
        setDraggingPosition(position);
    };

    const handleMouseMove = (e) => {
        if (!draggingPosition) return;

        const { x, y } = getFieldCoordinates(e);

        setFieldPositions(prev => ({
            ...prev,
            [draggingPosition]: {
                ...prev[draggingPosition],
                x,
                y
            }
        }));
    };

    const handleMouseUp = () => {
        setDraggingPosition(null);
    };

    const handlePlayerFromSquad = (player) => {
        setSelectedPlayer(player);
    };

    const handleFieldClick = (e) => {
        if (!selectedPlayer || draggingPosition) return;

        const { x, y } = getFieldCoordinates(e);

        // Find an empty position or create a new one
        const emptyPosition = Object.keys(fieldPositions).find(
            pos => !fieldPositions[pos].player
        );

        if (emptyPosition) {
            setFieldPositions(prev => ({
                ...prev,
                [emptyPosition]: {
                    player: selectedPlayer.name,
                    x,
                    y,
                    id: selectedPlayer.id
                }
            }));
        } else {
            // Create new position
            const newPos = `POS${Object.keys(fieldPositions).length + 1}`;
            setFieldPositions(prev => ({
                ...prev,
                [newPos]: {
                    player: selectedPlayer.name,
                    x,
                    y,
                    id: selectedPlayer.id
                }
            }));
        }

        setSquad(prev => prev.map(p =>
            p.id === selectedPlayer.id ? { ...p, status: 'playing' } : p
        ));

        setSelectedPlayer(null);
    };

    const removePlayerFromField = (position) => {
        const playerData = fieldPositions[position];
        if (playerData.player) {
            setSquad(prev => prev.map(p =>
                p.id === playerData.id ? { ...p, status: 'bench' } : p
            ));

            const newPositions = { ...fieldPositions };
            delete newPositions[position];
            setFieldPositions(newPositions);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />);
        }
        if (hasHalf) {
            stars.push(<Star key="half" size={12} fill="#fbbf24" color="#fbbf24" style={{ opacity: 0.5 }} />);
        }
        while (stars.length < 5) {
            stars.push(<Star key={`empty-${stars.length}`} size={12} color="#4b5563" />);
        }
        return stars;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-6">
                <div className="flex items-center justify-between bg-slate-800/50 backdrop-blur p-4 rounded-lg border border-blue-500/30">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">TACTICS</h1>
                            <p className="text-sm text-gray-400">16th in English Premier Division</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-400">Mon 5:00</div>
                        <div className="text-lg font-semibold">27 Jun 2022</div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Tactics */}
                <div className="lg:col-span-2">
                    <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 backdrop-blur rounded-lg p-6 border border-green-500/30">
                        {/* Tactical Settings */}
                        <div className="mb-4 space-y-3">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-semibold text-green-400">FORMATION</span>
                                <select
                                    value={formation}
                                    onChange={(e) => setFormation(e.target.value)}
                                    className="bg-slate-800/80 border border-green-500/50 rounded px-3 py-1 text-sm"
                                >
                                    <option value="4-2-3-1">4-2-3-1 Wide</option>
                                    <option value="4-3-3">4-3-3</option>
                                </select>
                            </div>

                            <div className="flex gap-4 text-sm">
                                <div>
                                    <span className="text-gray-400">TACTICAL STYLE:</span>
                                    <span className="ml-2 font-semibold text-green-400">GEGENPRESS</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">MENTALITY:</span>
                                    <span className="ml-2 font-semibold">Balanced</span>
                                </div>
                            </div>
                        </div>

                        {/* Football Field */}
                        <div
                            ref={fieldRef}
                            className="relative bg-gradient-to-b from-green-700 to-green-600 rounded-lg aspect-[3/4] border-2 border-white/20 overflow-hidden cursor-crosshair"
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onClick={handleFieldClick}
                        >
                            {/* Field Lines */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-0 left-1/2 w-px h-full bg-white/30 -translate-x-1/2" />
                                <div className="absolute top-1/2 left-0 w-full h-px bg-white/30 -translate-y-1/2" />
                                <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />

                                {/* Penalty Areas */}
                                <div className="absolute top-0 left-1/2 w-48 h-20 border-2 border-white/30 border-t-0 -translate-x-1/2" />
                                <div className="absolute bottom-0 left-1/2 w-48 h-20 border-2 border-white/30 border-b-0 -translate-x-1/2" />

                                {/* Goal Areas */}
                                <div className="absolute top-0 left-1/2 w-24 h-10 border-2 border-white/30 border-t-0 -translate-x-1/2" />
                                <div className="absolute bottom-0 left-1/2 w-24 h-10 border-2 border-white/30 border-b-0 -translate-x-1/2" />
                            </div>

                            {/* Players */}
                            {Object.entries(fieldPositions).map(([position, data]) => (
                                <div
                                    key={position}
                                    onMouseDown={(e) => {
                                        e.stopPropagation();
                                        handleMouseDown(position);
                                    }}
                                    onDoubleClick={(e) => {
                                        e.stopPropagation();
                                        removePlayerFromField(position);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        left: `${data.x}%`,
                                        top: `${data.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                        cursor: draggingPosition === position ? 'grabbing' : 'grab',
                                        zIndex: draggingPosition === position ? 50 : 10
                                    }}
                                    className="group"
                                >
                                    <div className="relative">
                                        <div className={`w-14 h-14 bg-blue-500 rounded-full border-3 border-white flex items-center justify-center font-bold text-xs shadow-xl transition-all ${
                                            draggingPosition === position ? 'scale-110 ring-4 ring-yellow-400' : 'group-hover:scale-105'
                                        }`}>
                                            <div className="text-center">
                                                <div className="text-[10px] opacity-70">{position}</div>
                                                <div className="text-xs">{data.player?.split(' ')[0] || position}</div>
                                            </div>
                                        </div>

                                        {/* Player name tooltip */}
                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            {data.player}
                                        </div>

                                        {/* Move icon */}
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            <Move size={12} />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Help text */}
                            {selectedPlayer && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-600/90 px-4 py-2 rounded-lg text-sm font-semibold pointer-events-none">
                                    Кликните на поле, чтобы поставить {selectedPlayer.name}
                                </div>
                            )}
                        </div>

                        {/* Instructions */}
                        <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                            <div className="bg-slate-800/50 rounded p-3">
                                <div className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                                    <Activity size={14} /> IN POSSESSION
                                </div>
                                <ul className="space-y-1 text-gray-300">
                                    <li>• Pass Into Space</li>
                                    <li>• Play Out Of Defence</li>
                                    <li>• Higher Tempo</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 rounded p-3">
                                <div className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                                    <Target size={14} /> OUT OF POSSESSION
                                </div>
                                <ul className="space-y-1 text-gray-300">
                                    <li>• Higher Defensive Line</li>
                                    <li>• High Press</li>
                                    <li>• Counter-Press</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Squad List */}
                <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4 border border-blue-500/30 max-h-[900px] overflow-y-auto">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Users size={20} /> SQUAD
                    </h2>

                    <div className="space-y-2">
                        {squad.map((player) => (
                            <div
                                key={player.id}
                                onClick={() => handlePlayerFromSquad(player)}
                                className={`bg-slate-700/50 rounded p-3 cursor-pointer transition-all hover:bg-slate-600/50 border-2 ${
                                    selectedPlayer?.id === player.id ? 'border-green-400 ring-2 ring-green-400/50' : 'border-transparent'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                                            {player.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">{player.name}</div>
                                            <div className="text-xs text-blue-400">{player.position}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {player.status === 'playing' ? (
                                            <div className="w-3 h-3 bg-green-500 rounded-full" title="Playing" />
                                        ) : (
                                            <div className="w-3 h-3 bg-gray-500 rounded-full" title="Bench" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {renderStars(player.rating)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 p-3 bg-blue-900/30 rounded text-xs space-y-2">
                        <p className="font-semibold">💡 Управление:</p>
                        <ul className="text-gray-300 space-y-1">
                            <li>• <strong>Перетащить:</strong> Зажмите игрока на поле и двигайте</li>
                            <li>• <strong>Добавить:</strong> Кликните на игрока в списке, затем на поле</li>
                            <li>• <strong>Удалить:</strong> Двойной клик по игроку на поле</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}