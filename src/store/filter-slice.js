import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
	name: "filter",
	initialState: {
		filter_products: [],
		all_products: [],
		sorting_value: "lowest",
		filters: {
			search: "",
			category: "All",
			brand: "All",
			maxPrice: 0,
			price: 0,
			minPrice: 0,
		},
	},

	reducers: {
		sorting(state, action) {
			state.sorting_value = action.payload;
		},

		updateFilterValue(state, action) {
			const { name, value } = action.payload;
			state.filters = {
				...state.filters,
				[name]: value,
			};
		},

		sortingProducts(state) {
			let newSortData;
			const { filter_products, sorting_value } = state;
			let tempSortProduct = [...filter_products];

			const sortProducts = (a, b) => {
				if (sorting_value === "lowest") {
					return a.price - b.price;
				}
				if (sorting_value === "highest") {
					return b.price - a.price;
				}
			};

			newSortData = tempSortProduct.sort(sortProducts);

			state.filter_products = newSortData;
		},

		loadFilterProducts(state, action) {
			let priceData = action.payload.map((product) => product.price);
			let maxPrice = Math.max(...priceData);
			state.filter_products = [...action.payload];
			state.all_products = [...action.payload];
			state.filters = { ...state.filters, maxPrice, price: maxPrice };
		},

		filterProducts(state) {
			let { all_products } = state;
			let bufferedFilterProduct = [...all_products];

			const { search, category, brand, price } = state.filters;
			const searchInputValue = search.toLowerCase().trim();
			if (searchInputValue) {
				bufferedFilterProduct = bufferedFilterProduct.filter((product) => {
					return product.name.toLowerCase().includes(searchInputValue) || product.description.toLowerCase().includes(searchInputValue) || product.brand.toLowerCase().includes(searchInputValue);
				});
			}

			if (category !== "All") {
				bufferedFilterProduct = bufferedFilterProduct.filter((product) => product.category === category);
			}

			if (brand !== "All") {
				bufferedFilterProduct = bufferedFilterProduct.filter((product) => product.brand.toLowerCase() === brand.toLowerCase());
			}

			if (price === 0) {
				bufferedFilterProduct = bufferedFilterProduct.filter((product) => product.price === price);
			} else {
				bufferedFilterProduct = bufferedFilterProduct.filter((product) => product.price <= price);
			}

			state.filter_products = bufferedFilterProduct;
		},

		clearFilters(state) {
			state.filters = {
				...state.filters,
				category: "All",
				brand: "All",
				maxPrice: 0,
				price: state.filters.maxPrice,
				minPrice: state.filters.minPrice,
			};
		},
	},
});

export const filterActions = filterSlice.actions;

export default filterSlice;
