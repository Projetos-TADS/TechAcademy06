import { Routes, Route } from "react-router";
import { LoginPage } from "../pages/Login";
import { SignupPage } from "../pages/Signup";
import { MoviesPage } from "../pages/Movies";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import { NotFound } from "../pages/NotFound";

export const MainRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/movies" element={<ProtectedRoutes />}>
				<Route index element={<MoviesPage />} />
				<Route path="page/:pageNumber" element={<MoviesPage />} />
			</Route>
			<Route path="*" element={<NotFound />}></Route>
		</Routes>
	);
};
