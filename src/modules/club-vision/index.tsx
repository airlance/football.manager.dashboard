import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { OverviewPage } from "./pages/overview/page";

export default function ClubVisionModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="overview" replace />} />
                    <Route path="overview" element={<OverviewPage />} />
                    <Route path="board" element={<OverviewPage />} />
                    <Route path="performance" element={<OverviewPage />} />
                    <Route path="supporters" element={<OverviewPage />} />
                    <Route path="match-performance" element={<OverviewPage />} />
                    <Route path="transfer-activity" element={<OverviewPage />} />
                    <Route path="squad" element={<OverviewPage />} />
                    <Route path="tactics" element={<OverviewPage />} />
                </Route>
            </Route>
        </Routes>
    )
}
