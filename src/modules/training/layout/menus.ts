import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Overview', path: '/training/overview' },
            { title: 'Calendar', path: '/training/calendar' },
            { title: 'Schedules', path: '/training/schedules' },
            { title: 'Units', path: '/training/units' },
            { title: 'Mentoring', path: '/training/mentoring' },
            { title: 'Individual', path: '/training/individual' },
            { title: 'Rest', path: '/training/rest' },
            { title: 'Coaches', path: '/training/coaches' },
        ]
    }
}
