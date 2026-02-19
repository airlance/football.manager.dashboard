import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/layout';
import { PrivacyPage } from './pages/privacy/page';
import { TermsPage } from './pages/terms/page';

export default function StaticModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Navigate to="privacy" replace />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="terms" element={<TermsPage />} />
            </Route>
        </Routes>
    );
}
