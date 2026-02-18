import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Transfer Centre', path: '/transfers/fixtures' },
            { title: 'Director of Football', children: [
                    { title: 'Transfer Targets', path: '/transfers/transfer-targets' },
                    { title: 'Unwanted List', path: '/transfers/unwanted-list' },
                    { title: 'Development List', path: '/transfers/development-list' },
                    { title: 'Suggest Transfer Targets', path: '/transfers/suggest-transfer-targets' },
                ] },
            { title: 'Clauses', path: '/transfers/clauses' },
            { title: 'Transfer History', path: '/transfers/transfer-history' },
        ]
    }
}
