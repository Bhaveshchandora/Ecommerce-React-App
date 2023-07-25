import { useSelector } from "react-redux";

const ProductSortBy = (props) => {
	const filter_products = useSelector((state) => state.filter.filter_products);
	const products = useSelector((state) => state.product.products);
	return (
		<div className="row">
			<div className="col mb-3" style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>
				<h2>Products</h2>
				<div className="my-3">
					<span style={{ fontSize: "20px", fontWeight: "500" }}>
						Showing {filter_products.length} of {products.length} products
					</span>
				</div>
				<div className="d-flex">
					<span style={{ fontWeight: "500", marginBlock: "auto", fontSize: "18px", padding: "8px 10px 4px 0" }}>Sort By</span>
					<div style={{ margin: "0 10px" }}>
						<button type="button" className="btn btn-dark" onClick={props.filterProductsLowToHigh}>
							Price -- Low to High
						</button>
					</div>
					<div>
						<button type="button" className="btn btn-dark" onClick={props.filterProductsHighToLow}>
							Price -- High to Low
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductSortBy;
