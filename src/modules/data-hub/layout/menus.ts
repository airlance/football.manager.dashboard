import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Overview', path: '/data-hub' },
            { title: 'Team', children: [
                    { title: 'Team Performance', path: '/data-hub/team-performance' },
                    { title: 'Analyst Report', path: '/data-hub/analyst-report' },
                    { title: 'Shots', path: '/data-hub/shots' },
                ] },
            { title: 'Player', path: '/data-hub/player' },
            { title: 'Matches', children: [
                    { title: 'Last Match', path: '/data-hub/last-match' },
                    { title: 'Last 5 Matches', path: '/data-hub/last-5-matches' },
                ] },
            { title: 'Next Opponent', children: [
                    { title: 'Overview', path: '/data-hub/next-opponent' },
                    { title: 'Next Opposition Performance', path: '/data-hub/next-opposition-performance' },
                    { title: 'Scout Report', path: '/data-hub/scout-report' },
                    { title: 'Analyst Report', path: '/data-hub/analyst-report' },
                    { title: 'Stat Pack', path: '/data-hub/stat-pack' },
                    { title: 'Past Meetings', path: '/data-hub/past-meetings' },
                ] },
        ]
    }
}
