import React from "react";
import "./App.css";
import Products from "./components/Products/Products";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ProductViewDetail from "./components/Products/ProductViewDetail/ProductViewDetail";
import RootLayout from "./components/Layout/Root";
import Cart from "./components/Cart/Cart";
import "@smastrom/react-rating/style.css";
import ErrorPage from "./pages/ErrorPage";

// navigate to home
const navigateToHome = () => {
	return <Navigate to="/products" />;
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ path: "/", element: navigateToHome() },
			{ path: "/products", element: <Products /> },
			{ path: "/products/:productId", element: <ProductViewDetail /> },
			{ path: "/cart", element: <Cart /> },
			{ path: "*", element: <ErrorPage /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
