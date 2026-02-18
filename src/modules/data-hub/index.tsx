import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "./pages/overview/page";

export default function DataHubModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="overview" replace />} />

                    <Route path="overview" element={<Page />} />
                    <Route path="player" element={<Page />} />
                    <Route path="team-performance" element={<Page />} />
                    <Route path="analyst-report" element={<Page />} />
                    <Route path="last-5-matches" element={<Page />} />
                    <Route path="last-match" element={<Page />} />
                    <Route path="shots" element={<Page />} />
                    <Route path="next-opponent" element={<Page />} />
                    <Route path="next-opposition-performance" element={<Page />} />
                    <Route path="scout-report" element={<Page />} />
                    <Route path="analyst-report" element={<Page />} />
                    <Route path="stat-pack" element={<Page />} />
                    <Route path="past-meetings" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
