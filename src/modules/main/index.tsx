import { useLocation } from 'react-router-dom';
import { OnboardPage } from './pages/onboard';
import { CareerIndexPage } from './pages/career';

export default function MainModule() {
    const { pathname } = useLocation();

    if (pathname.startsWith('/onboard')) {
        return <OnboardPage />;
    }

    return <CareerIndexPage />;
}
