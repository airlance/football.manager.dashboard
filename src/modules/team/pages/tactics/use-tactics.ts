import { useState, useMemo, useCallback } from 'react';
import type { Player } from './data';
import { FORMATIONS, type Formation, DEFAULT_FORMATION } from './formations';

export function useTactics(initialPlayers: Player[]) {
    const [formationKey, setFormationKey] = useState<string>(DEFAULT_FORMATION);
    const [isCustom, setIsCustom] = useState(false);

    // assignments: slotId -> Player
    const [assignments, setAssignments] = useState<Record<string, Player>>({});

    const formation = useMemo(() => FORMATIONS[formationKey], [formationKey]);

    // ---------- helpers ----------
    const getSlotForPlayer = (playerId: string): string | null => {
        const entry = Object.entries(assignments).find(([, p]) => p.id === playerId);
        return entry ? entry[0] : null;
    };

    // ---------- move / swap ----------
    const movePlayer = useCallback((player: Player, toSlotId: string) => {
        setAssignments(prev => {
            const next = { ...prev };

            // Remove player from current slot (if on pitch)
            const fromSlot = Object.entries(next).find(([, p]) => p.id === player.id)?.[0];
            if (fromSlot) delete next[fromSlot];

            // If target slot has someone, swap
            const occupant = next[toSlotId];
            if (occupant && fromSlot) {
                next[fromSlot] = occupant;
            }
            // If target slot has someone and player came from list, replace (target goes to bench)
            // (no action needed — occupant just gets removed)

            next[toSlotId] = player;
            return next;
        });
    }, []);

    const removePlayer = useCallback((playerId: string) => {
        setAssignments(prev => {
            const next = { ...prev };
            const slot = Object.entries(next).find(([, p]) => p.id === playerId)?.[0];
            if (slot) delete next[slot];
            return next;
        });
    }, []);

    // ---------- auto-pick ----------
    const autoPick = useCallback(() => {
        const newAssignments: Record<string, Player> = {};
        const pool = [...initialPlayers];

        const pop = (positions: string[]) => {
            for (const pos of positions) {
                const idx = pool.findIndex(p =>
                    p.position === pos ||
                    p.position.startsWith(pos) ||
                    pos.startsWith(p.position)
                );
                if (idx !== -1) return pool.splice(idx, 1)[0];
            }
            return pool.shift();
        };

        // GK first
        formation.positions.forEach(slot => {
            if (slot.label === 'GK') {
                const gk = pool.find(p => p.position === 'GK');
                if (gk) {
                    newAssignments[slot.id] = gk;
                    pool.splice(pool.indexOf(gk), 1);
                }
            }
        });

        // Rest
        formation.positions.forEach(slot => {
            if (slot.label === 'GK') return;
            const p = pop([...slot.naturalFor, ...slot.accomplishedFor]);
            if (p) newAssignments[slot.id] = p;
        });

        setAssignments(newAssignments);
        setIsCustom(false);
    }, [formation, initialPlayers]);

    const clearPitch = useCallback(() => {
        setAssignments({});
        setIsCustom(false);
    }, []);

    // ---------- formation change ----------
    const handleFormationChange = useCallback((newKey: string) => {
        const newFormation = FORMATIONS[newKey];
        const pool = [...initialPlayers];
        const currentOnPitch = Object.values(assignments);
        // Prefer already-on-pitch players
        const priorityPool = [
            ...currentOnPitch,
            ...initialPlayers.filter(p => !currentOnPitch.find(cp => cp.id === p.id)),
        ];

        const newAssignments: Record<string, Player> = {};
        const remaining = [...priorityPool];

        const pop = (positions: string[]) => {
            for (const pos of positions) {
                const idx = remaining.findIndex(p =>
                    p.position === pos || p.position.startsWith(pos) || pos.startsWith(p.position)
                );
                if (idx !== -1) return remaining.splice(idx, 1)[0];
            }
            return remaining.shift();
        };

        // GK first
        newFormation.positions.forEach(slot => {
            if (slot.label === 'GK') {
                const gk = remaining.find(p => p.position === 'GK');
                if (gk) {
                    newAssignments[slot.id] = gk;
                    remaining.splice(remaining.indexOf(gk), 1);
                }
            }
        });

        newFormation.positions.forEach(slot => {
            if (slot.label === 'GK') return;
            const p = pop([...slot.naturalFor, ...slot.accomplishedFor]);
            if (p) newAssignments[slot.id] = p;
        });

        setFormationKey(newKey);
        setAssignments(newAssignments);
        setIsCustom(false);
    }, [assignments, initialPlayers]);

    return {
        formation,
        formationKey,
        isCustom,
        assignments,
        handleFormationChange,
        movePlayer,
        removePlayer,
        autoPick,
        clearPitch,
    };
}