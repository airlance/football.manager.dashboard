import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Squad Planner', path: '/planner/squad-planner' },
            { title: 'Experience Matrix', path: '/planner/experience-matrix' },
            { title: 'Report', children: [
                    { title: 'Best XI', path: '/planner/best-xi' },
                    { title: 'Assistant Report', path: '/planner/assistant-report' },
                    { title: 'Stats', path: '/planner/stats' },
                    { title: 'Comparison', path: '/planner/comparison' },
                ] },
        ]
    }
}
