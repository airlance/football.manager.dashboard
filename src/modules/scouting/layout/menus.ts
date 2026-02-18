import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Overview', path: '/scouting' },
            { title: 'Scouting Centre', path: '/scouting/scouting-centre' },
            { title: 'Players', children: [
                    { title: 'Players in Range', path: '/scouting/players-range' },
                    { title: 'Scouted Players', path: '/scouting/scored-players' },
                ] },
            { title: 'Recruitment Focus', children: [
                    { title: 'Recruitment Focus', path: '/scouting/recruitment-focus' },
                    { title: 'Scout Priorities', path: '/scouting/scout-priorities' },
                ] },
            { title: 'Scouting Coverage', children: [
                    { title: 'Scouting Assignments', path: '/scouting/scouting-assignment' },
                    { title: 'Match and Team Analysis', path: '/scouting/match-and-team-analysis' },
                    { title: 'Team Report Priorities', path: '/scouting/team-report-priorities' },
                ] },
            { title: 'Shortlist', children: [
                    { title: 'Shortlist', path: '/scouting/shortlist' },
                    { title: 'Not Interested List', path: '/scouting/not-interested-list' },
                ] },
        ]
    }
}
