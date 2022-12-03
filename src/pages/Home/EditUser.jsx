import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const { uid } = params;
		getUser(uid);
	}, []);

	function getUser(uid) {
		axios
			.get(`https://63553cf1da523ceadcfd4ca1.mockapi.io/api/v1/users/${uid}`)
			.then((res) => {
				setUser(res.data);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}

	function handleValueChange(e) {
		const { value, name } = e.target;
		const newUser = { ...user };
		newUser[name] = value;
		setUser(newUser);
	}

	function handleUpdate() {
		axios
			.put(
				`https://63553cf1da523ceadcfd4ca1.mockapi.io/api/v1/users/${params.uid}`,
				user
			)
			.then((res) => {
				navigate("/");
				toast.success("User updated successfully");
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}

	if (!user)
		return (
			<Box
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: 40,
				}}
			>
				<h1>Loading...</h1>
			</Box>
		);

	return (
		<Container
			style={{
				marginTop: 50,
			}}
		>
			<Typography variant="h6" gutterBottom>
				User Details
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						id="id"
						name="id"
						label="Id"
						fullWidth
						variant="outlined"
						disabled={true}
						value={user.id}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="userNmae"
						name="name"
						label="Full Name"
						fullWidth
						variant="outlined"
						value={user.name}
						onChange={handleValueChange}
					/>
				</Grid>
				<Grid item xs={12} sm={8}>
					<TextField
						id="email"
						name="email"
						label="Email"
						fullWidth
						variant="outlined"
						value={user.email}
						onChange={handleValueChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="contact"
						name="contact"
						label="Contact Number"
						fullWidth
						variant="outlined"
						value={user.contact}
						onChange={handleValueChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="password"
						name="password"
						label="Password"
						fullWidth
						variant="outlined"
						value={user.password}
						onChange={handleValueChange}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Button variant="contained" onClick={handleUpdate}>
						Update Details
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

export default EditUser;
