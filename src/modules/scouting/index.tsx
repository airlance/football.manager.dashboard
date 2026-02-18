import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "./pages/overview/page";

export default function ScoutingModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="overview" replace />} />

                    <Route path="overview" element={<Page />} />
                    <Route path="recruitment-focus" element={<Page />} />
                    <Route path="scouting-centre" element={<Page />} />
                    <Route path="players-range" element={<Page />} />
                    <Route path="scored-players" element={<Page />} />
                    <Route path="scout-priorities" element={<Page />} />
                    <Route path="match-and-team-analysis" element={<Page />} />
                    <Route path="team-report-priorities" element={<Page />} />
                    <Route path="shortlist" element={<Page />} />
                    <Route path="not-interested-list" element={<Page />} />
                    <Route path="scouting-assignment" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
