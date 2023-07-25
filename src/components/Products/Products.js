import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import ProductFilter from "./ProductFilter/ProductFilter";
import ProductList from "./ProductList/ProductList";
import ProductSortBy from "./ProductSortBy/ProductSortBy";
import DataNotAvailablePage from "../../pages/DataNotAvailablePage";
import Spinner from "../UI/Spinner";
import classes from "./Products.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../store/filter-slice";
import { getProducts } from "../../store/product-actions";

function Products(props) {
	const dispatch = useDispatch();
	const filter_products = useSelector((state) => state.filter.filter_products);
	const sorting_value = useSelector((state) => state.filter.sorting_value);
	const filters = useSelector((state) => state.filter.filters);

	const products = useSelector((state) => state.product.products);
	const isLoading = useSelector((state) => state.product.isLoading);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	// to sort the product
	useEffect(() => {
		dispatch(filterActions.filterProducts());
		dispatch(filterActions.sortingProducts());
	}, [products, sorting_value, filters]);

	// to load all the products
	useEffect(() => {
		dispatch(filterActions.loadFilterProducts(products));
	}, [products]);

	if (isLoading) {
		return (
			<div className={classes["pos-center"]}>
				<Spinner />
			</div>
		);
	}

	// sort product -- low to high
	const sortProductsLowToHigh = () => {
		dispatch(filterActions.sorting("lowest"));
	};

	// sort product -- high to low
	const sortProductsHighToLow = () => {
		dispatch(filterActions.sorting("highest"));
	};

	return (
		<div className="container-fluid">
			<div className="row mx-0" style={{ padding: "16px" }}>
				{filter_products.length > 0 ? (
					<>
						<Col xs={3} lg={2} className="d-none d-md-block">
							{/* product filter */}
							<ProductFilter />
						</Col>
						<Col>
							{/* product sortBy */}
							<ProductSortBy filterProductsLowToHigh={sortProductsLowToHigh} filterProductsHighToLow={sortProductsHighToLow} />

							{/* product list */}
							<ProductList products={filter_products} />
						</Col>
					</>
				) : (
					<Col>
						{/* data not available page */}
						<DataNotAvailablePage />
					</Col>
				)}
			</div>
		</div>
	);
}

export default Products;
