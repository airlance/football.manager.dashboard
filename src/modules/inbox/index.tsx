import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "@/layout";
import { SectionLayout } from "@/layout/components/section-layout";
import { getMenuItems } from "./layout/menus";
import { InboxPage } from "./pages/inbox/page";
import { InboxSocialFeedPage } from "./pages/social-feed/page";
import { InboxNewsPage } from "./pages/news/page";
import { LeaguesInFocusPage } from "./pages/leagues-in-focus/page";
import { AroundTheWorldPage } from "./pages/around-the-world/page";
import { TransferWindowNewsPage } from "./pages/transfer-window-news/page";

export default function InboxModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<SectionLayout menu={getMenuItems(true)}/>}>
                    <Route index element={<Navigate to="inbox" replace />} />

                    <Route path="inbox" element={<InboxPage />} />
                    <Route path="social-feed" element={<InboxSocialFeedPage />} />
                    <Route path="news" element={<InboxNewsPage />} />
                    <Route path="leagues-in-focus" element={<LeaguesInFocusPage />} />
                    <Route path="around-the-world" element={<AroundTheWorldPage />} />
                    <Route path="transfer-window-news" element={<TransferWindowNewsPage />} />
                </Route>
            </Route>
        </Routes>
    )
}
