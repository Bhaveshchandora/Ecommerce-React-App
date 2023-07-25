import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
	name: "review",
	initialState: { isLoading: false, isError: false, reviews: [] },
	reducers: {
		setLoading(state) {
			state.isLoading = true;
		},

		updateReviews(state, action) {
			console.log("action ", action);
			state.isLoading = false;
			state.reviews = action.payload;
		},

		apiError(state) {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

export const reviewActions = reviewSlice.actions;

export default reviewSlice;
