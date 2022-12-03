import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const initalState = {
	users: [],
	isLoading: false,
	error: null,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
	return axios
		.get("https://63553cf1da523ceadcfd4ca1.mockapi.io/api/v1/users")
		.then((d) => {
			return d.data;
		})
		.catch((err) => {
			return err.message;
		});
});

export const deleteUser = createAsyncThunk("user/deleteUser", (uid) => {
	return axios
		.delete(`https://63553cf1da523ceadcfd4ca1.mockapi.io/api/v1/users/${uid}`)
		.then((d) => {
			return d.data;
		})
		.catch((err) => {
			return err.message;
		});
});

export const userSlice = createSlice({
	name: "users",
	initialState: initalState,
	reducers: {
		sortUsersInAsc(state, action) {
			let users = [...state.users];
			users = users.sort(function (a, b) {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 1;
				}
				return 0;
			});
			state.users = users;
		},
		sortUsersInDesc(state, action) {
			let users = [...state.users];
			users = users.sort(function (a, b) {
				if (a.name > b.name) {
					return -1;
				}
				if (a.name < b.name) {
					return 1;
				}
				return 0;
			});
			state.users = users;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchUsers.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				let users = action.payload;
				users = users.sort(function (a, b) {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});
				state.users = users;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});

		builder
			.addCase(deleteUser.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				const deletedUserId = action.payload.id;
				state.users = state.users.filter((user) => user.id !== deletedUserId);
				state.isLoading = false;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const { sortUsersInAsc, sortUsersInDesc } = userSlice.actions;

export default userSlice.reducer;
