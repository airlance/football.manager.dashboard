import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Overview', children: [
                    { title: 'Overview', path: '/staff/fixtures' },
                    { title: 'Coaching Team', path: '/staff/coaching-team' },
                    { title: 'Medical Team', path: '/staff/medical-team' },
                    { title: 'Recruitment Team', path: '/staff/recruitment-team' },
                    { title: 'All', path: '/staff/all' },
                ] },
            { title: 'Responsibilities', children: [
                    { title: 'Overview', path: '/staff/responsibilities' },
                    { title: 'Board', path: '/staff/board' },
                    { title: 'Staff', path: '/staff/staff' },
                    { title: 'Advice and Reports', path: '/staff/advice-and-reports' },
                    { title: 'Transfers and Contracts', path: '/staff/transfers-and-contracts' },
                    { title: 'Match', path: '/staff/match' },
                    { title: 'Media', path: '/staff/media' },
                    { title: 'Training', path: '/staff/training' },
                    { title: 'Tactics', path: '/staff/tactics' },
                ] },
            { title: 'Staff Search', path: '/staff/staff-search' },
            { title: 'Staff Shortlist', path: '/staff/staff-shortlist' },
            { title: 'Job Centre', path: '/staff/job-centre' },
            { title: 'Job Security', path: '/staff/job-security' },
        ]
    }
}
