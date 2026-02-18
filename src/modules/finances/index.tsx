import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { Page } from "./pages/summary/page";

export default function FinancesModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems()}/>}>
                    <Route index element={<Navigate to="summary" replace />} />

                    <Route path="summary" element={<Page />} />
                    <Route path="ffp" element={<Page />} />
                    <Route path="projection" element={<Page />} />
                    <Route path="sponsors-other" element={<Page />} />
                    <Route path="debt-and-loans" element={<Page />} />
                    <Route path="wages" element={<Page />} />
                    <Route path="income" element={<Page />} />
                    <Route path="expenditure" element={<Page />} />
                    <Route path="salary-commitments" element={<Page />} />
                    <Route path="code-of-conduct" element={<Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
