import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
	name: "product",
	initialState: { isLoading: false, isError: false, products: [] },
	reducers: {
		setLoading(state) {
			state.isLoading = true;
		},

		setApiData(state, action) {
			state.isLoading = false;
			state.products = action.payload;
		},

		apiError(state) {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

export const productActions = productSlice.actions;

export default productSlice;
