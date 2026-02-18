import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Home', path: '/home' },
            { title: 'My Profile', children: [
                    { title: 'Profile', path: '/home/profile' },
                    { title: 'Start a Coaching Course', path: '/home/start-course' },
                    { title: 'Retire', path: '/home/retire' },
                    { title: 'Go On Holiday', path: '/home/go-on-holiday' },
                ] },
            { title: 'My Contract', children: [
                    { title: 'Contract Details', path: '/home/contract-details' },
                    { title: 'Contract Offer', path: '/home/contract-offer' },
                    { title: 'Resign', path: '/home/resign' },
                ] },
            { title: 'Promises', path: '/home/promises' },
            { title: 'Relationships', path: '/home/relationships' },
            { title: 'My History', children: [
                    { title: 'Overview', path: '/home/overview' },
                    { title: 'Job History', path: '/home/job-history' },
                    { title: 'My Manager Timeline', path: '/home/my-manager-timeline' },
                    { title: 'Biography', path: '/home/biography' },
                    { title: 'Press Conferences', path: '/home/press-conferences' },
                    { title: 'Keep History After Retirement', path: '/home/keep-history-after-retirement' },
                ] },
            { title: 'Notebook', path: '/home/notebook' },
        ]
    }
}
