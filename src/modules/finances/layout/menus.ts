import { type MenuItem } from '@/layout/components/types';

export const getMenuItems = (): MenuItem => {
    return {
        children: [
            { title: 'Summary', path: '/finances/summary' },
            { title: 'Income', path: '/finances/income' },
            { title: 'Expenditure', path: '/finances/expenditure' },
            { title: 'Wages', children: [
                    { title: 'Summary', path: '/finances/wages' },
                    { title: 'Salary Commitments', path: '/finances/salary-commitments' },
                    { title: 'Code of Conduct', path: '/finances/code-of-conduct' },
                ] },
            { title: 'FFP', children: [
                    { title: 'Summary', path: '/finances/ffp' },
                ] },
            { title: 'Debt and Loans', path: '/finances/debt-and-loans' },
            { title: 'Sponsors and Other', path: '/finances/sponsors-other' },
            { title: 'Projection', path: '/finances/projection' },
        ]
    }
}
