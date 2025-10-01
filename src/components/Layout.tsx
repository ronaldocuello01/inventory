// src/components/Layout.tsx
import type { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./styles/Layout.module.css";
import { ROLES } from "../config/constants";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { logout } from "../features/users/usersSlice";



type RouteItem = {
	path: string;
	label: string;
	roles: number[];
};

const routes: RouteItem[] = [
	{ path: "/", label: "Home", roles: [] },
	{ path: "/login", label: "Login", roles: [] },
	{ path: "/products", label: "Products", roles: [ROLES.ADMIN, ROLES.OPERATOR, ROLES.VIEWER] },
	{ path: "/settings", label: "Settings", roles: [ROLES.ADMIN, ROLES.OPERATOR] }
];

type LayoutProps = {
	children?: ReactNode;
	userRole?: number;
};

export default function Layout({ children, userRole }: LayoutProps) {
	const { loggedUser } = useAppSelector((state) => state.users);
  	const dispatch = useAppDispatch();

	const filteredRoutes = routes.filter((r) => {
		if (r.roles.length === 0) return true;
		if (userRole !== undefined && r.roles.includes(userRole)) return true;
		return false;
	});

	const handleLogout = () => {
		dispatch(logout());
		localStorage.removeItem("userSession"); // si estás guardando sesión
	};

	return (
		<div className={styles.layout}>
			{/* Sidebar */}
			<aside className={styles.sidebar}>
				<h2 className={styles.sidebarTitle}>Inventario</h2>
				<nav className={styles.nav}>
					{filteredRoutes.map((route) => (
						<Link key={route.path} to={route.path} className={styles.link}>
							{route.label}
						</Link>
					))}
				</nav>

				{loggedUser && (
					<div className={styles.userBox}>
						<p>Hola, {loggedUser.name}</p>
						<button onClick={handleLogout}>Cerrar sesión</button>
					</div>
				)}
			</aside>

			{/* Contenido principal */}
			<div className={styles.main}>
				<main className={styles.content}>
					{children ? children : <Outlet />}
				</main>
			</div>
		</div>
	);
}
