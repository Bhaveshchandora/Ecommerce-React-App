import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./MainNavigation.module.css";
import AppLogoIcon from "../../assets/app-logo-icon.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../store/filter-slice";

function MainNavigation(props) {
	const dispatch = useDispatch();
	const filters = useSelector((state) => state.filter.filters);

	// search input handler
	const searchInputHandler = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		dispatch(filterActions.updateFilterValue({ name, value }));
	};

	return (
		// Navigation
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
			{/* App Logo  */}
			<nav className="navbar navbar-dark">
				<Link className="navbar-brand px-4 mx-4 py-0 font-family-kalam d-flex align-items-end" to="/products">
					<img src={AppLogoIcon} alt="E-commerce App" />
					Online shop
				</Link>
			</nav>
			<button className="navbar-toggler mx-4" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse justify-content-around" id="navbarSupportedContent">
				<div className="col-sm-1 col-md-0 col-lg-4"></div>
				{/* Input SearchBar */}
				<div className={`${classes["input-display"]} "col d-flex justify-content-start"`}>
					<form className={`${classes["input-searchbar"]} "d-flex mx-5 my-2 my-lg-0"`}>
						<input
							className="form-control mr-sm-2"
							type="text"
							name="search"
							placeholder="Search for products, brands and more"
							aria-label="Search"
							value={filters.search}
							onChange={searchInputHandler}
							onKeyPress={(e) => {
								e.key === "Enter" && e.preventDefault();
							}}
						/>
					</form>
				</div>
				{/* Cart Button */}
				<div className={`${classes["cart-button"]} "col"`}>
					<ul className="navbar-nav mr-auto my-2 my-lg-0 mx-5 navbar-nav-scroll" style={{ maxHeight: "100px" }}>
						<li className="nav-item">
							<Link to="/cart" className="nav-link">
								<HeaderCartButton />
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default MainNavigation;
