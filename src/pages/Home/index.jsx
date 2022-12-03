import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../components/UserTable";
import { fetchUsers } from "../../redux/features/userSlice";

const useStyles = makeStyles(() => ({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "20px",
	},
}));

const Home = () => {
	const classes = useStyles();
	const state = useSelector((state) => state.users);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	return (
		<div className={classes.container}>
			{state.isLoading ? (
				<div>Loading...</div>
			) : (
				<UserTable users={state.users} />
			)}
		</div>
	);
};

export default Home;
