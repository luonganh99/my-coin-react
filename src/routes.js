import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import HistoryTransaction from './pages/HistoryTransaction';
import MainLayout from './components/MainLayout';
import AccessWallet from './pages/AccessWallet';
import CreateWallet from './pages/CreateWallet';
import Dashboard from './pages/Dashboard';

const routes = [
    {
        path: '/app',
        element: <DashboardLayout />,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'history', element: <HistoryTransaction /> },
            { path: '*', element: <Navigate to='/404' /> },
        ],
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'create-wallet', element: <CreateWallet /> },
            { path: 'access-wallet', element: <AccessWallet /> },
            { path: '/', element: <Navigate to='/create-wallet' /> },
            { path: '*', element: <Navigate to='/404' /> },
        ],
    },
];

export default routes;
