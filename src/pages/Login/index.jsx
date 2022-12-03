import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/currentUser";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	const state = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!email || !password) {
			return toast.error(`Please enter all the fields properly.`);
		}
		dispatch(loginUser({ email, password })).then(({ payload }) => {
			if (payload.user) {
				navigate("/");
			}
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					{state.error && (
						<Alert variant="outlined" severity="error">
							Error - {state.error}
						</Alert>
					)}
					<TextField
						margin="normal"
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						margin="normal"
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={state.isLoading}
					>
						Sign In
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
