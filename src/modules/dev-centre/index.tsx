import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "./pages/overview/page";

export default function DevCentreModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="overview" replace />} />

                    <Route path="overview" element={<Page />} />
                    <Route path="loans" element={<Page />} />
                    <Route path="metalist-under-19s-staff" element={<Page />} />
                    <Route path="youth-candidates" element={<Page />} />
                    <Route path="competitions" element={<Page />} />
                    <Route path="fixtures" element={<Page />} />
                    <Route path="match" element={<Page />} />
                    <Route path="training" element={<Page />} />
                    <Route path="tactics" element={<Page />} />
                    <Route path="dynamics" element={<Page />} />
                    <Route path="squad" element={<Page />} />
                    <Route path="under-19s" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
