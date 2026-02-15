import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from "./pages/main/page";
import { PlayerPage } from "./pages/player/page";
import { SetupPage } from "./pages/setup/page";
import { Layout } from "./layout";

export default function MainModule() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Navigate to="team" replace />} />
                <Route path="team" element={<MainPage />} />
                <Route path="player" element={<PlayerPage />} />
                <Route path="setup" element={<SetupPage />} />
            </Route>
        </Routes>
    )
}