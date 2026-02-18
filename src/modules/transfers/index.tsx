import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "@/modules/transfers/pages/transfer-centre/page";

export default function TransfersModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="transfer-centre" replace />} />

                    <Route path="transfer-centre" element={<Page />} />
                    <Route path="clauses" element={<Page />} />
                    <Route path="transfer-targets" element={<Page />} />
                    <Route path="unwanted-list" element={<Page />} />
                    <Route path="development-list" element={<Page />} />
                    <Route path="suggest-transfer-targets" element={<Page />} />
                    <Route path="transfer-history" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
