import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { ClubInfoProfilePage } from "./pages/profile/page";

export default function ClubInfoModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="profile" replace />} />
                    <Route path="profile" element={<ClubInfoProfilePage />} />
                    <Route path="players" element={<ClubInfoProfilePage />} />
                    <Route path="best-eleven" element={<ClubInfoProfilePage />} />
                    <Route path="managers" element={<ClubInfoProfilePage />} />
                    <Route path="landmarks" element={<ClubInfoProfilePage />} />
                    <Route path="competitions" element={<ClubInfoProfilePage />} />
                    <Route path="records" element={<ClubInfoProfilePage />} />
                    <Route path="general" element={<ClubInfoProfilePage />} />
                    <Route path="news" element={<ClubInfoProfilePage />} />
                    <Route path="facilities" element={<ClubInfoProfilePage />} />
                    <Route path="notes" element={<ClubInfoProfilePage />} />
                    <Route path="affiliated-clubs" element={<ClubInfoProfilePage />} />
                    <Route path="history" element={<ClubInfoProfilePage />} />
                    <Route path="proposed-affiliates" element={<ClubInfoProfilePage />} />
                </Route>
            </Route>
        </Routes>
    )
}
