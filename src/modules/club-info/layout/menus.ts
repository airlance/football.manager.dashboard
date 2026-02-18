import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Profile', path: '/club-info/fixtures' },
            { title: 'General', path: '/club-info/general' },
            { title: 'News', path: '/club-info/news' },
            { title: 'Facilities', path: '/club-info/facilities' },
            { title: 'Affiliates', children: [
                    { title: 'Affiliated Clubs', path: '/club-info/affiliated-clubs' },
                    { title: 'Proposed Affiliates', path: '/club-info/proposed-affiliates' },
                ] },
            { title: 'History', children: [
                    { title: 'Overview', path: '/club-info/history' },
                    { title: 'Competitions', path: '/club-info/fixtures' },
                    { title: 'Landmarks', path: '/club-info/landmarks' },
                    { title: 'Managers', path: '/club-info/managers' },
                    { title: 'Records', path: '/club-info/records' },
                    { title: 'Best Eleven', path: '/club-info/best-eleven' },
                    { title: 'Players', path: '/club-info/players' },
                    { title: 'Notes', path: '/club-info/notes' },
                ] },
        ]
    }
}
