import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/dashboard-pages/dashboard')));
const LandingPage = Loadable(lazy(() => import('views/pages/landing-page/LandingPage')));
const ChangePicture = Loadable(lazy(() => import('views/dashboard-pages/change-picture')));
const ChangePassword = Loadable(lazy(() => import('views/dashboard-pages/change-password')));
const DisplayName = Loadable(lazy(() => import('views/dashboard-pages/display-name')));
const Availability = Loadable(lazy(() => import('views/dashboard-pages/availability')));
// const Friends = Loadable(lazy(() => import('views/dashboard-pages/friends')));
const OnlineUsers = Loadable(lazy(() => import('views/video-chat-app/components/OnlineUsers')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
      
    path: '/',
   
   
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <LandingPage />
        },
        {
            path: '/dashboard',
            element: <SamplePage />
        },
        {
            path: '/change-picture',
            element: <ChangePicture />
        },
        {
            path: '/change-password',
            element: <ChangePassword />
        },
        {
            path: '/display-name',
            element: <DisplayName />
        },
        {
            path: '/availability',
            element: <Availability />
        },
        {
            path: '/friends',
            element: <OnlineUsers />
        }
    ]
};

export default MainRoutes;
