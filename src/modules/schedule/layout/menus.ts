import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Fixtures', path: '/schedule/fixtures' },
            { title: 'Calendar', path: '/schedule/calendar' },
            { title: 'Events', path: '/schedule/events' },
            { title: 'Reminders', path: '/schedule/reminders' },
        ]
    }
}
