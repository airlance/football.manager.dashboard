import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Overview', path: '/club-vision/fixtures' },
            { title: 'Board', path: '/club-vision/board' },
            { title: 'Performance', children: [
                    { title: 'Performance', path: '/club-vision/performance' },
                    { title: 'Match Performance', path: '/club-vision/match-performance' },
                    { title: 'Transfer Activity', path: '/club-vision/transfer-activity' },
                    { title: 'Squad', path: '/club-vision/squad' },
                    { title: 'Tactics', path: '/club-vision/tactics' },
                ] },
            { title: 'Supporters', path: '/club-vision/supporters' },
        ]
    }
}
