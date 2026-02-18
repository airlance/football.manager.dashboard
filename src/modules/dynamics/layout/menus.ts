import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Overview', path: '/dynamics/overview' },
            { title: 'Hierarchy', path: '/dynamics/hierarchy' },
            { title: 'Social Groups', path: '/dynamics/social-groups' },
            { title: 'Happiness', path: '/dynamics/happiness' },
            { title: 'Code of Conduct', path: '/dynamics/code-of-conduct' },
            { title: 'Team Meeting', path: '/dynamics/team-meeting' },
            { title: 'Team Talk Feedback', path: '/dynamics/team-talk-feedback' },
        ]
    }
}
