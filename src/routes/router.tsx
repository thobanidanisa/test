import { Suspense, lazy } from 'react';
import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';

import paths, { rootPaths } from './paths';

import PageLoader from '../components/loading/PageLoader';
import Splash from 'components/loading/Splash';
import ApplicationManagement from 'pages/authentication/ApplicationManagement';
import AddRehabAdmin from 'pages/authentication/AddRehebAdmin';
import ClientProgress from 'pages/authentication/ClientProgress';
import RoomAllocation from 'pages/authentication/RoomAllocation';
import Dashboard from 'pages/authentication/Dashboard';
import UserProfile from 'pages/authentication/UserProfile';
import Home from 'pages/authentication/Home';
import AddSocialWorkers from 'pages/authentication/AddSocialWorkers';
import SocialWorkerList from 'pages/authentication/SocialWorkerList';
import ClientsList from 'pages/authentication/ClientsList';
import AddClient from 'pages/authentication/AddClient';
import AddAdminNGO from 'pages/authentication/AddAdminNGO';
import AdminListNGO from 'pages/authentication/AdminListNGO';

const App = lazy(() => import('App'));
const MainLayout = lazy(async () => {
  return Promise.all([
    import('layouts/main-layout'),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports);
});
/*const AuthLayout = lazy(async () => {
  return Promise.all([
    import('layouts/auth-layout'),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports);
});
*/
const Error404 = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return import('pages/errors/Error404');
});

const Sales = lazy(async () => {
  return Promise.all([
    import('pages/home/Sales'),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const SignUp = lazy(async () => import('pages/authentication/SignUp'));

const ResetPassword = lazy(async () => import('pages/authentication/ResetPassword'));
const ForgotPassword = lazy(async () => import('pages/authentication/ForgotPassword'));


const routes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: rootPaths.homeRoot,
        element: (
          
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          
        ),
        children: [
          {
            path: paths.home,
            element: <Sales />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: (
          
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          
        ),
        children: [
          {
            path: paths.forgotPassword,
            element: <ForgotPassword />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: (
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
          
        ),
        children: [
          //HOME PAGE
          {
            path: '/authentication/recent-activities',
            element: <Home />,
          },

          {
            path: paths.signup,
            element: <SignUp />,
          },
          {
            path: paths.resetPassword,
            element: <ResetPassword />,
          },
          //NGO ADMIN
          {
            path: paths.addsocialworker,
            element: <AddSocialWorkers />,
          },
          {
            path: paths.socialworkerlist,
            element: <SocialWorkerList />,
          },
          {
            path: paths.addclient,
            element: <AddClient />,
          },
          {
            path: paths.clientlist,
            element: <ClientsList />,
          },

          {
            path: paths.addadminngo,
            element: <AddAdminNGO />,
          },
          {
            path: paths.adminlistngo,
            element: <AdminListNGO />,
          },

          {
            path: paths.applicationmanagement,
            element: <ApplicationManagement/>,
          },
          {
            path: '/authentication/add-rehab-admin',
            element: <AddRehabAdmin/>,
          },
          {
            path: paths.clientprogress,
            element: <ClientProgress/>,
          },
          {
            path: paths.roomallocation,
            element: <RoomAllocation/>,
          },
          {
            path: '/authentication/dashboard',
            element: <Dashboard/>,
          },
          {
            path: paths.userprofile,
            element: <UserProfile/>,
          },
        ],
      },
  
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '/' });

export default router;
