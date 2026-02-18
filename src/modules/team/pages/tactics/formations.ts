export interface GridPosition {
    id: string;          // unique slot id e.g. "GK", "DC1", "WB-L"
    label: string;       // display label e.g. "GK", "DC", "WB"
    x: number;           // % from left
    y: number;           // % from top
    // Default role/duty for this slot
    defaultRole: string;
    defaultDuty: 'Attack' | 'Support' | 'Defend';
    // Which position codes this slot naturally accepts (for drag highlight)
    // 'natural' = green, 'accomplished' = orange, 'competent' = red
    naturalFor: string[];
    accomplishedFor: string[];
}

export interface Formation {
    name: string;
    displayName: string;
    positions: GridPosition[];
}

// ─── 4-2-3-1 DM AM Wide ────────────────────────────────────────────────────
const F4231: Formation = {
    name: '4-2-3-1',
    displayName: '4-2-3-1 DM AM Wide',
    positions: [
        // GK
        {
            id: 'GK',
            label: 'GK',
            x: 50, y: 88,
            defaultRole: 'SK', defaultDuty: 'Support',
            naturalFor: ['GK'],
            accomplishedFor: [],
        },
        // Back 4
        {
            id: 'WB-L',
            label: 'WB',
            x: 10, y: 72,
            defaultRole: 'WB', defaultDuty: 'Support',
            naturalFor: ['DL', 'WBL'],
            accomplishedFor: ['DR', 'WBR', 'ML'],
        },
        {
            id: 'CD-L',
            label: 'CD',
            x: 32, y: 72,
            defaultRole: 'CD', defaultDuty: 'Defend',
            naturalFor: ['DC', 'DCL', 'DCR'],
            accomplishedFor: ['DL', 'DR', 'MC'],
        },
        {
            id: 'BPD-R',
            label: 'BPD',
            x: 68, y: 72,
            defaultRole: 'BPD', defaultDuty: 'Defend',
            naturalFor: ['DC', 'DCL', 'DCR'],
            accomplishedFor: ['DL', 'DR', 'MC'],
        },
        {
            id: 'WB-R',
            label: 'WB',
            x: 90, y: 72,
            defaultRole: 'WB', defaultDuty: 'Support',
            naturalFor: ['DR', 'WBR'],
            accomplishedFor: ['DL', 'WBL', 'MR'],
        },
        // DM pair
        {
            id: 'DM-L',
            label: 'DM',
            x: 36, y: 54,
            defaultRole: 'DM', defaultDuty: 'Support',
            naturalFor: ['DM', 'MCL', 'MC'],
            accomplishedFor: ['DC', 'AMC'],
        },
        {
            id: 'BWM-R',
            label: 'BWM',
            x: 64, y: 54,
            defaultRole: 'BWM', defaultDuty: 'Defend',
            naturalFor: ['MCR', 'MC', 'DM'],
            accomplishedFor: ['DC', 'AMC'],
        },
        // AM trio
        {
            id: 'IW-L',
            label: 'IW',
            x: 10, y: 34,
            defaultRole: 'IW', defaultDuty: 'Support',
            naturalFor: ['AML', 'ML', 'WBL'],
            accomplishedFor: ['AMC', 'MC', 'ST'],
        },
        {
            id: 'AP-C',
            label: 'AP',
            x: 50, y: 34,
            defaultRole: 'AP', defaultDuty: 'Support',
            naturalFor: ['AMC', 'MC'],
            accomplishedFor: ['AML', 'AMR', 'ST'],
        },
        {
            id: 'W-R',
            label: 'W',
            x: 90, y: 34,
            defaultRole: 'W', defaultDuty: 'Support',
            naturalFor: ['AMR', 'MR', 'WBR'],
            accomplishedFor: ['AMC', 'MC', 'ST'],
        },
        // CF
        {
            id: 'CF',
            label: 'CF',
            x: 50, y: 12,
            defaultRole: 'CF', defaultDuty: 'Attack',
            naturalFor: ['ST', 'STC'],
            accomplishedFor: ['AMC', 'AML', 'AMR'],
        },
    ],
};

// ─── 4-4-2 ─────────────────────────────────────────────────────────────────
const F442: Formation = {
    name: '4-4-2',
    displayName: '4-4-2',
    positions: [
        { id: 'GK',    label: 'GK', x: 50, y: 88, defaultRole: 'SK',  defaultDuty: 'Support', naturalFor: ['GK'], accomplishedFor: [] },
        { id: 'DL',    label: 'DL', x: 10, y: 72, defaultRole: 'WB',  defaultDuty: 'Support', naturalFor: ['DL','WBL'], accomplishedFor: ['DR','WBR','ML'] },
        { id: 'DC-L',  label: 'DC', x: 33, y: 72, defaultRole: 'CD',  defaultDuty: 'Defend',  naturalFor: ['DC','DCL','DCR'], accomplishedFor: ['DL','DR'] },
        { id: 'DC-R',  label: 'DC', x: 67, y: 72, defaultRole: 'CD',  defaultDuty: 'Defend',  naturalFor: ['DC','DCL','DCR'], accomplishedFor: ['DL','DR'] },
        { id: 'DR',    label: 'DR', x: 90, y: 72, defaultRole: 'WB',  defaultDuty: 'Support', naturalFor: ['DR','WBR'], accomplishedFor: ['DL','WBL','MR'] },
        { id: 'ML',    label: 'ML', x: 10, y: 48, defaultRole: 'W',   defaultDuty: 'Support', naturalFor: ['ML','AML'], accomplishedFor: ['MC','AMC'] },
        { id: 'MC-L',  label: 'MC', x: 35, y: 48, defaultRole: 'CM',  defaultDuty: 'Support', naturalFor: ['MC','MCL','MCR'], accomplishedFor: ['DM','AMC'] },
        { id: 'MC-R',  label: 'MC', x: 65, y: 48, defaultRole: 'CM',  defaultDuty: 'Support', naturalFor: ['MC','MCL','MCR'], accomplishedFor: ['DM','AMC'] },
        { id: 'MR',    label: 'MR', x: 90, y: 48, defaultRole: 'W',   defaultDuty: 'Support', naturalFor: ['MR','AMR'], accomplishedFor: ['MC','AMC'] },
        { id: 'ST-L',  label: 'ST', x: 35, y: 16, defaultRole: 'AF',  defaultDuty: 'Attack',  naturalFor: ['ST','STC'], accomplishedFor: ['AMC','AML','AMR'] },
        { id: 'ST-R',  label: 'ST', x: 65, y: 16, defaultRole: 'AF',  defaultDuty: 'Attack',  naturalFor: ['ST','STC'], accomplishedFor: ['AMC','AML','AMR'] },
    ],
};

// ─── 3-5-2 ─────────────────────────────────────────────────────────────────
const F352: Formation = {
    name: '3-5-2',
    displayName: '3-5-2',
    positions: [
        { id: 'GK',    label: 'GK',  x: 50, y: 88, defaultRole: 'SK',  defaultDuty: 'Support', naturalFor: ['GK'], accomplishedFor: [] },
        { id: 'DC-L',  label: 'DC',  x: 25, y: 72, defaultRole: 'CD',  defaultDuty: 'Defend',  naturalFor: ['DC','DCL','DCR'], accomplishedFor: ['DL','DR'] },
        { id: 'DC-C',  label: 'DC',  x: 50, y: 72, defaultRole: 'BPD', defaultDuty: 'Defend',  naturalFor: ['DC','DCL','DCR'], accomplishedFor: ['DL','DR'] },
        { id: 'DC-R',  label: 'DC',  x: 75, y: 72, defaultRole: 'CD',  defaultDuty: 'Defend',  naturalFor: ['DC','DCL','DCR'], accomplishedFor: ['DL','DR'] },
        { id: 'WBL',   label: 'WBL', x: 8,  y: 52, defaultRole: 'WB',  defaultDuty: 'Support', naturalFor: ['DL','WBL'], accomplishedFor: ['ML','AML'] },
        { id: 'MC-L',  label: 'MC',  x: 30, y: 50, defaultRole: 'CM',  defaultDuty: 'Support', naturalFor: ['MC','MCL'], accomplishedFor: ['DM','AMC'] },
        { id: 'DM',    label: 'DM',  x: 50, y: 54, defaultRole: 'DM',  defaultDuty: 'Defend',  naturalFor: ['DM','MC'], accomplishedFor: ['DC','AMC'] },
        { id: 'MC-R',  label: 'MC',  x: 70, y: 50, defaultRole: 'CM',  defaultDuty: 'Support', naturalFor: ['MC','MCR'], accomplishedFor: ['DM','AMC'] },
        { id: 'WBR',   label: 'WBR', x: 92, y: 52, defaultRole: 'WB',  defaultDuty: 'Support', naturalFor: ['DR','WBR'], accomplishedFor: ['MR','AMR'] },
        { id: 'ST-L',  label: 'ST',  x: 35, y: 16, defaultRole: 'AF',  defaultDuty: 'Attack',  naturalFor: ['ST','STC'], accomplishedFor: ['AMC'] },
        { id: 'ST-R',  label: 'ST',  x: 65, y: 16, defaultRole: 'AF',  defaultDuty: 'Attack',  naturalFor: ['ST','STC'], accomplishedFor: ['AMC'] },
    ],
};

export const FORMATIONS: Record<string, Formation> = {
    '4-2-3-1': F4231,
    '4-4-2':   F442,
    '3-5-2':   F352,
};

export const DEFAULT_FORMATION = '4-2-3-1';

// Legacy compat — not used anymore but keep for type safety
export const FIELD_ROWS = 6;
export const FIELD_COLS = 5;
export const getGridIndex = (row: number, col: number) => row * FIELD_COLS + col;