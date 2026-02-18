import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Overview', path: '/dev-centre/fixtures' },
            { title: 'Loans', path: '/dev-centre/loans' },
            { title: 'Under 19s', children: [
                    { title: 'Overview', path: '/dev-centre/under-19s' },
                    { title: 'Squad', path: '/dev-centre/squad' },
                    { title: 'Dynamics', path: '/dev-centre/dynamics' },
                    { title: 'Tactics', path: '/dev-centre/tactics' },
                    { title: 'Training', path: '/dev-centre/training' },
                    { title: 'Match', path: '/dev-centre/match' },
                    { title: 'Fixtures', path: '/dev-centre/fixtures' },
                    { title: 'Competitions', path: '/dev-centre/fixtures' },
                ] },
            { title: 'Youth Candidates', path: '/dev-centre/youth-candidates' },
            { title: 'Staff', children: [
                    { title: 'Metalist Under 19s Staff', path: '/dev-centre/metalist-under-19s-staff' },
                ] },
        ]
    }
}
