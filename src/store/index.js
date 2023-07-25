import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import filterSlice from "./filter-slice";
import productSlice from "./product-slice";
import reviewSlice from "./review-slice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage: storage,
	version: 1,
};

const reducer = combineReducers({
	filter: filterSlice.reducer,
	cart: cartSlice.reducer,
	product: productSlice.reducer,
	review: reviewSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
