import { useDispatch, useSelector } from "react-redux";
import FormatPrice from "../../../pages/FormatPrice";
import classes from "./ProductFilter.module.css";
import { filterActions } from "../../../store/filter-slice";

function ProductFilter() {
	const dispatch = useDispatch();
	const all_products = useSelector((state) => state.filter.all_products);
	const filters = useSelector((state) => state.filter.filters);

	// get the unique values of each property
	const getUniqueData = (data, attr) => {
		let newVal = data.map((curElem) => {
			return curElem[attr];
		});

		return (newVal = ["All", ...new Set(newVal)]);
	};

	// we need to have the individual data of each in an array format
	const categoryData = getUniqueData(all_products, "category");
	const companyData = getUniqueData(all_products, "brand");

	// update filter handler
	const updateFilterHandler = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		dispatch(filterActions.updateFilterValue({ name, value }));
	};

	// clear filter handler
	const clearFilterHandler = () => {
		dispatch(filterActions.clearFilters());
	};

	return (
		<div className={`${classes["card-data-sticky"]} "row"`}>
			<div className="col">
				<div className="card rounded-0">
					<div className="card-body">
						<span className={classes["filter-text"]}>Filters</span>
						<section className={classes["sidebar"]}>
							<div className={classes["filter-category"]}>
								<h3>Category</h3>
								<form>
									<select name="category" id="category" style={{ width: "100px" }} onClick={updateFilterHandler}>
										{categoryData.map((curElem, index) => {
											return (
												<option key={index} value={curElem} name="category">
													{curElem}
												</option>
											);
										})}
									</select>
								</form>
							</div>

							<div>
								<h3>Brand</h3>

								<form>
									<select name="brand" id="brand" style={{ width: "100px" }} onClick={updateFilterHandler}>
										{companyData.map((curElem, index) => {
											return (
												<option key={index} value={curElem} name="brand">
													{curElem}
												</option>
											);
										})}
									</select>
								</form>
							</div>

							<div className={classes["filter_price"]}>
								<h3>Price</h3>
								<p className="p-0">
									<FormatPrice price={filters.price} />
								</p>
								<input type="range" name="price" min={filters.minPrice} max={filters.maxPrice} value={filters.price} onChange={updateFilterHandler} style={{ width: "100%", boxSizing: "border-box" }} />
							</div>

							<div className={classes["filter-clear"]}>
								<button className="btn btn-dark" onClick={clearFilterHandler}>
									Clear Filters
								</button>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductFilter;
