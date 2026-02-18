import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "./pages/fixtures/page";

export default function ScheduleModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="fixtures" replace />} />

                    <Route path="fixtures" element={<Page />} />
                    <Route path="calendar" element={<Page />} />
                    <Route path="events" element={<Page />} />
                    <Route path="reminders" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
