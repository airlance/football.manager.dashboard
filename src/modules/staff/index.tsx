import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "./pages/overview/page";

export default function StaffModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="overview" replace />} />

                    <Route path="overview" element={<Page />} />
                    <Route path="board" element={<Page />} />
                    <Route path="staff" element={<Page />} />
                    <Route path="advice-and-reports" element={<Page />} />
                    <Route path="transfers-and-contracts" element={<Page />} />
                    <Route path="match" element={<Page />} />
                    <Route path="media" element={<Page />} />
                    <Route path="tactics" element={<Page />} />
                    <Route path="training" element={<Page />} />
                    <Route path="responsibilities" element={<Page />} />
                    <Route path="coaching-team" element={<Page />} />
                    <Route path="medical-team" element={<Page />} />
                    <Route path="recruitment-team" element={<Page />} />
                    <Route path="all" element={<Page />} />
                    <Route path="staff-search" element={<Page />} />
                    <Route path="staff-shortlist" element={<Page />} />
                    <Route path="job-centre" element={<Page />} />
                    <Route path="job-security" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
