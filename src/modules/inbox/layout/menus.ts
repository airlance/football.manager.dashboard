import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (hasTransferAccess: boolean): MenuItem => {
    return {
        children: [
            { title: 'Inbox', path: '/inbox/inbox' },
            { title: 'Social Feed', path: '/inbox/social-feed' },
            { title: 'News', path: '/inbox/news' },
            { title: 'Leagues in Focus', path: '/inbox/leagues-in-focus' },
            { title: 'Around the World', path: '/inbox/around-the-world' },
            ...(hasTransferAccess
                ? [{ title: 'Transfer Window News', path: '/inbox/transfer-window-news' }]
                : []),
        ]
    }
}
