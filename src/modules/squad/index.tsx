import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "./pages/overview/page";

export default function SquadModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="overview" replace />} />

                    <Route path="overview" element={<Page />} />
                    <Route path="numbers" element={<Page />} />
                    <Route path="registration" element={<Page />} />
                    <Route path="all-players" element={<Page />} />
                    <Route path="export-team" element={<Page />} />
                    <Route path="players-on-in-duty" element={<Page />} />
                    <Route path="in-friendly-availability" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
