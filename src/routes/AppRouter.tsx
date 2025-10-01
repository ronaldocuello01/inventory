import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import { ROLES } from '../config/constants';

import ProtectedRoute from "../components/ProtectedRoute";

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import SettingsPage from '../pages/SettingsPage';
import { useAppSelector } from '../hooks/reduxHook';


function AppRouter() {
    // SIMULACION
    const { loggedUser } = useAppSelector((state) => state.users);
    const userRole = loggedUser != null? loggedUser.role: ROLES.NONE;

    return (
        <Routes>
            <Route path="/" element={<Layout userRole={userRole} />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />

                {/* Rutas protegidas */}
                <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.OPERATOR, ROLES.VIEWER]} />}>
                    <Route path="/products" element={<ProductsPage />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.OPERATOR]} />}>
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRouter;