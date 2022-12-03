import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/userSlice";
import userReducer from "./features/currentUser";

const store = configureStore({
	reducer: {
		users: usersReducer,
		user: userReducer,
	},
});

export default store;
