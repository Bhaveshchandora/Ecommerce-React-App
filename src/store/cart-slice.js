import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: [],
		total_price: 0,
	},
	reducers: {
		addItem(state, action) {
			const updatedTotalPrice = state.total_price + action.payload.price * action.payload.amount;
			const existingProductIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
			const existingProduct = state.cartItems[existingProductIndex];

			let updatedCarts = [...state.cartItems];

			if (existingProduct) {
				updatedCarts[existingProductIndex].amount += action.payload.amount;
			} else {
				updatedCarts = state.cartItems.concat(action.payload);
			}
			state.cartItems = updatedCarts;
			state.total_price = updatedTotalPrice;
		},
		removeItem(state, action) {
			const existingCartProductIndex = state.cartItems.findIndex((item) => item.id === action.payload);
			const existingCartProduct = state.cartItems[existingCartProductIndex];

			const updatedTotalAmount = state.total_price - existingCartProduct.price;
			let updatedCartItems;
			if (existingCartProduct.amount === 1) {
				updatedCartItems = state.cartItems.filter((item) => item.id !== action.id);
			} else {
				const updatedItem = { ...existingCartProduct, amount: existingCartProduct.amount - 1 };
				updatedCartItems = [...state.cartItems];
				updatedCartItems[existingCartProductIndex] = updatedItem;
			}

			state.cartItems = updatedCartItems;
			state.total_price = updatedTotalAmount;
		},
		removeItems(state, action) {
			const removeItem = state.cartItems.filter((item) => item.id === action.payload);
			const updatedTotalCartAmount = state.total_price - removeItem[0].price * removeItem[0].amount;

			let updatedCart = state.cartItems.filter((cartItem) => cartItem.id !== action.payload);

			state.cartItems = updatedCart;
			state.total_price = updatedTotalCartAmount;
		},
		clearCart(state) {
			state.cartItems = [];
			state.total_price = 0;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
