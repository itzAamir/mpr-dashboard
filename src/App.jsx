import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EditUser from "./pages/Home/EditUser";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Protected from "./components/Protected";

const App = () => {
	return (
		<Router>
			<Navbar />
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable
				pauseOnHover
				theme="dark"
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Protected>
							<Home />
						</Protected>
					}
				/>
				<Route
					path="/:uid"
					element={
						<Protected>
							<EditUser />
						</Protected>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</Router>
	);
};

export default App;
