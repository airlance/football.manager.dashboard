import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Overview', children: [
                    { title: 'Overview', path: '/squad/overview' },
                    { title: 'Numbers', path: '/squad/numbers' },
                    { title: 'Registration', path: '/squad/registration' },
                    { title: 'All Players', path: '/squad/all-players' },
                    { title: 'Export Team for Versus Competition', path: '/squad/export-team' },
                ] },
            { title: 'International', children: [
                    { title: 'Players on Int Duty', path: '/squad/players-on-in-duty' },
                    { title: 'Int Friendly Availability', path: '/squad/in-friendly-availability' },
                ] },
        ]
    }
}
