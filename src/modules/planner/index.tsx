import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "./pages/squad-planner/page";

export default function SquadPlannerModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="squad-planner" replace />} />

                    <Route path="squad-planner" element={<Page />} />
                    <Route path="experience-matrix" element={<Page />} />
                    <Route path="best-xi" element={<Page />} />
                    <Route path="assistant-report" element={<Page />} />
                    <Route path="stats" element={<Page />} />
                    <Route path="comparison" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
