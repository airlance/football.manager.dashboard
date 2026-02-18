import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "./pages/overview/page";

export default function DynamicsModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="overview" replace />} />

                    <Route path="overview" element={<Page />} />
                    <Route path="hierarchy" element={<Page />} />
                    <Route path="social-groups" element={<Page />} />
                    <Route path="happiness" element={<Page />} />
                    <Route path="code-of-conduct" element={<Page />} />
                    <Route path="team-meeting" element={<Page />} />
                    <Route path="team-talk-feedback" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
