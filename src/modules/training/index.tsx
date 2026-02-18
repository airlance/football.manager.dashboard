import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "./pages/overview/page";

export default function TrainingModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="overview" replace />} />

                    <Route path="overview" element={<Page />} />
                    <Route path="calendar" element={<Page />} />
                    <Route path="schedules" element={<Page />} />
                    <Route path="units" element={<Page />} />
                    <Route path="mentoring" element={<Page />} />
                    <Route path="individual" element={<Page />} />
                    <Route path="coaches" element={<Page />} />
                    <Route path="rest" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
