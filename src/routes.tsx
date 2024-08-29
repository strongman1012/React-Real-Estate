import { RouteObject, Navigate } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { FC } from 'react';

import Home from './pages/Dashboard/Home';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Area1 from './pages/Dashboard/Area1';
import Area2 from './pages/Dashboard/Area2';
import Area3 from './pages/Dashboard/Area3';
import Area4 from './pages/Dashboard/Area4';
import Area5 from './pages/Dashboard/Area5';
import Area6 from './pages/Dashboard/Area6';

const routes: RouteObject[] = [
    {
        path: '/login',
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    {
        path: '/register',
        element: (
            <PublicRoute>
                <Register />
            </PublicRoute>
        ),
    },
    {
        path: '/forgot-password',
        element: (
            <PublicRoute>
                <ForgotPassword />
            </PublicRoute>
        ),
    },
    {
        path: '/',
        element: <Navigate to="/dashboard/home" replace />,
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '',
                element: <Navigate to="home" replace />,
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'a-area-1',
                element: <Area1 />,
            },
            {
                path: 'a-area-2',
                element: <Area2 />,
            },
            {
                path: 'a-area-3',
                element: <Area3 />,
            },
            {
                path: 'a-area-4',
                element: <Area4 />,
            },
            {
                path: 'a-area-5',
                element: <Area5 />,
            },
            {
                path: 'a-area-6',
                element: <Area6 />,
            },
        ],
    },
];

const Router: FC = () => {
    return useRoutes(routes);
};

export default Router;
