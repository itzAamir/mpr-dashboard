import React from "react";
import {
	AppBar,
	Toolbar,
	CssBaseline,
	Typography,
	makeStyles,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/features/currentUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
	navlinks: {
		marginLeft: theme.spacing(10),
		display: "flex",
	},
	logo: {
		flexGrow: "1",
		cursor: "pointer",
	},
	link: {
		textDecoration: "none",
		color: "white",
		fontSize: "20px",
		marginLeft: theme.spacing(20),
		"&:hover": {
			color: "yellow",
			borderBottom: "1px solid white",
		},
	},
}));

function Navbar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const classes = useStyles();
	const token = localStorage.getItem("token");

	const handleLogout = () => {
		toast.warn("You have been logged out");
		dispatch(logoutUser());
		navigate("/login");
	};

	return (
		<AppBar position="static">
			<CssBaseline />
			<Toolbar>
				<Typography variant="h5" className={classes.logo}>
					Dashboard
				</Typography>
				{token && (
					<div className={classes.navlinks}>
						<Button variant="contained" color="error" onClick={handleLogout}>
							Logout
						</Button>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
}
export default Navbar;
