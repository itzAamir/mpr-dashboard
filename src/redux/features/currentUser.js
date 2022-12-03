import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initalState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const loginUser = createAsyncThunk("user/loginUser", (payload) => {
	return axios
		.get("https://63553cf1da523ceadcfd4ca1.mockapi.io/api/v1/users")
		.then((d) => {
			const users = d.data;
			const user = users.find((user) => user.email === payload.email);
			return { user, enteredPassword: payload.password };
		})
		.catch((err) => {
			return err.message;
		});
});

export const currentUserSlice = createSlice({
	name: "currentUser",
	initialState: initalState,
	reducers: {
		logoutUser: (state) => {
			localStorage.removeItem("token");
			state.currentUser = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				if (
					action.payload.user &&
					action.payload.user.password === action.payload.enteredPassword
				) {
					localStorage.setItem(
						"token",
						window.btoa(JSON.stringify(action.payload.user))
					);

					state.currentUser = action.payload.user;
					state.error = null;
				} else {
					state.error = "Invalid email or password";
				}
				state.isLoading = false;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const { logoutUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
