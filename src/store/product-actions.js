import { productActions } from "./product-slice";
import envData from "../pages/env/EnvConfig";

export const getProducts = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			dispatch(productActions.setLoading());
			const response = await fetch(envData.productApiUrl);

			if (!response.ok) {
				throw new Error("Fetching product data failed!");
			}

			const data = await response.json();
			return data;
		};
		try {
			const productData = await fetchData();
			let loadedProducts = [];

			for (const key in productData) {
				loadedProducts.push({
					id: key,
					name: productData[key].name,
					description: productData[key].description,
					price: productData[key].price,
					images: productData[key].images,
					brand: productData[key].brand,
					category: productData[key].category,
					reviews: productData[key].reviews,
					stars: productData[key].stars,
					quantity: productData[key].quantity,
				});
			}
			dispatch(productActions.setApiData(loadedProducts));
		} catch (error) {
			dispatch(productActions.apiError());
		}
	};
};

export const updateProductData = (productId, reviews) => {
	return async (dispatch) => {
		const updateProduct = async () => {
			dispatch(productActions.setLoading());
			const response = await fetch(`${envData.singleProductApiUrl}${productId}.json`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					reviews: reviews,
				}),
			});

			if (!response.ok) {
				throw new Error("Updating product data failed!");
			}

			const data = await response.json();
			return data;
		};
		try {
			const reviewData = await updateProduct();
			const updatedReviews = reviewData.reviews;
		} catch (error) {
			dispatch(productActions.apiError());
		}
	};
};
