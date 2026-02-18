import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "./pages/overview/page";

export default function MedicalCentreModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="overview" replace />} />

                    <Route path="overview" element={<Page />} />
                    <Route path="risk-assessment" element={<Page />} />
                    <Route path="current-injuries" element={<Page />} />
                    <Route path="injury-history" element={<Page />} />
                    <Route path="season-summary" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
