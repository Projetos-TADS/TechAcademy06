import { MainRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar
				closeOnClick
				theme="light"
			/>
			<MainRoutes />
		</>
	);
};
