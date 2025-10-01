import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useAppSelector } from "../hooks/reduxHook";
// import { useEffect } from "react";

type ProtectedRouteProps = {
    allowedRoles: number[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    // const dispatch = useAppDispatch();
    const { loggedUser } = useAppSelector((state) => state.users);

    // useEffect(() => {
    //     dispatch(fetchUsers());
    // }, [dispatch]);


    // Si no hay userRole → no está logueado
    if (!loggedUser) return <Navigate to="/" replace />;

    // Si el rol no está permitido
    if (!allowedRoles.includes(loggedUser.role)) return <Navigate to="/" replace />;

    // Si todo está bien, renderiza la ruta
    return <Outlet />;
}
