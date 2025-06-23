import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { Spin } from "antd";
import { UserContext } from "../../providers/UserContext";
import { MovieProvider } from "../../providers/MovieContext";
import { ActorProvider } from "../../providers/ActorContext";
import { DirectorProvider } from "../../providers/DirectorContext";

export const ProtectedRoutes = () => {
	const { user, loading } = useContext(UserContext);
	const location = useLocation();

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}>
				<Spin size="large" />
			</div>
		);
	}

	const publicRoutes = ["/", "/signup"];
	if (publicRoutes.includes(location.pathname) && user) {
		return <Navigate to="/movies" replace />;
	}

	if (!user && !publicRoutes.includes(location.pathname)) {
		return <Navigate to="/" replace state={{ from: location }} />;
	}

	return (
		<DirectorProvider>
			<ActorProvider>
				<MovieProvider>
					<Outlet />
				</MovieProvider>
			</ActorProvider>
		</DirectorProvider>
	);
};
