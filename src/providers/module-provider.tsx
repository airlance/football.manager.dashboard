import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ScreenLoader } from '@/components/screen-loader';

const HomeModule = lazy(() => import('@/modules/home'));
const InboxModule = lazy(() => import('@/modules/inbox'));
const ClubInfoModule = lazy(() => import('@/modules/club-info'));
const ClubVisionModule = lazy(() => import('@/modules/club-vision'));
const CompetitionsModule = lazy(() => import('@/modules/competitions'));
const DataHubModule = lazy(() => import('@/modules/data-hub'));
const DevCentreModule = lazy(() => import('@/modules/dev-centre'));
const MedicalCentreModule = lazy(() => import('@/modules/medical-centre'));
const StaffModule = lazy(() => import('@/modules/staff'));
const SquadModule = lazy(() => import('@/modules/squad'));
const TacticsModule = lazy(() => import('@/modules/tactics'));
const TrainingModule = lazy(() => import('@/modules/training'));
const ScoutingModule = lazy(() => import('@/modules/scouting'));
const TransfersModule = lazy(() => import('@/modules/transfers'));
const SquadPlannerModule = lazy(() => import('@/modules/planner'));
const ScheduleModule = lazy(() => import('@/modules/schedule'));
const DynamicsModule = lazy(() => import('@/modules/dynamics'));
const FinancesModule = lazy(() => import('@/modules/finances'));

const TeamModule = lazy(() => import('@/modules/team'));

export function ModuleProvider() {
    const location = useLocation();
    const path = location.pathname;

    const isHome = path.startsWith('/home');
    const isInbox = path.startsWith('/inbox');
    const isInfo = path.startsWith('/club-info');
    const isVision = path.startsWith('/club-vision');
    const isCompetition = path.startsWith('/competitions');
    const isDataHub = path.startsWith('/data-hub');
    const isDevCentre = path.startsWith('/dev-centre');
    const isMedicalCentre = path.startsWith('/medical-centre');
    const isStaff = path.startsWith('/staff');
    const isSquad = path.startsWith('/squad');
    const isTactics = path.startsWith('/tactics');
    const isTraining = path.startsWith('/training');
    const isScouting = path.startsWith('/scouting');
    const isTransfers = path.startsWith('/transfers');
    const isPlanner = path.startsWith('/planner');
    const isSchedule = path.startsWith('/schedule');
    const isDynamics = path.startsWith('/dynamics');
    const isFinances = path.startsWith('/finances');

    const isTeam = path.startsWith('/team');

    if (isHome) {
        return (
            <Routes>
                <Route
                    path="/home/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <HomeModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isInbox) {
        return (
            <Routes>
                <Route
                    path="/inbox/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <InboxModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isInfo) {
        return (
            <Routes>
                <Route
                    path="/club-info/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <ClubInfoModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isVision) {
        return (
            <Routes>
                <Route
                    path="/club-vision/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <ClubVisionModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isCompetition) {
        return (
            <Routes>
                <Route
                    path="/competitions/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <CompetitionsModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isDataHub) {
        return (
            <Routes>
                <Route
                    path="/data-hub/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <DataHubModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isDevCentre) {
        return (
            <Routes>
                <Route
                    path="/dev-centre/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <DevCentreModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isMedicalCentre) {
        return (
            <Routes>
                <Route
                    path="/medical-centre/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <MedicalCentreModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isStaff) {
        return (
            <Routes>
                <Route
                    path="/staff/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <StaffModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isSquad) {
        return (
            <Routes>
                <Route
                    path="/squad/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <SquadModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isTactics) {
        return (
            <Routes>
                <Route
                    path="/tactics/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <TacticsModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isTraining) {
        return (
            <Routes>
                <Route
                    path="/training/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <TrainingModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isScouting) {
        return (
            <Routes>
                <Route
                    path="/scouting/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <ScoutingModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isPlanner) {
        return (
            <Routes>
                <Route
                    path="/planner/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <SquadPlannerModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isSchedule) {
        return (
            <Routes>
                <Route
                    path="/schedule/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <ScheduleModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isFinances) {
        return (
            <Routes>
                <Route
                    path="/finances/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <FinancesModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isTransfers) {
        return (
            <Routes>
                <Route
                    path="/transfers/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <TransfersModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isDynamics) {
        return (
            <Routes>
                <Route
                    path="/dynamics/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <DynamicsModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }

    if (isTeam) {
        return (
            <Routes>
                <Route
                    path="/team/*"
                    element={
                        <Suspense fallback={<ScreenLoader />}>
                            <TeamModule />
                        </Suspense>
                    }
                />
            </Routes>
        );
    }
}