import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Overview', path: '/medical-centre/fixtures' },
            { title: 'Risk Assessment', path: '/medical-centre/risk-assessment' },
            { title: 'Current Injuries', path: '/medical-centre/current-injuries' },
            { title: 'Injury History', path: '/medical-centre/injury-history' },
            { title: 'Season Summary', path: '/medical-centre/season-summary' },
        ]
    }
}
