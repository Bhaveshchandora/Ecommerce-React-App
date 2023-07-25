import { Card, Col } from "react-bootstrap";
import FormatPrice from "../../pages/FormatPrice";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import EmptyCartPage from "../../pages/EmptyCartPage";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../UI/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import envData from "../../pages/env/EnvConfig";

const Cart = (props) => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const totalPrice = useSelector((state) => state.cart.total_price);

	const dispatch = useDispatch();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// submit order handler
	const submitOrderHandler = async () => {
		toast("Order Submitting...");
		setIsSubmitting(true);
		await fetch(envData.orderApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				orderedItems: cartItems,
			}),
		});
		setIsSubmitting(false);
		toast("Successfully Send The Order!");
		dispatch(cartActions.clearCart());
	};

	// clear cart handler
	const clearCartHandler = () => {
		dispatch(cartActions.clearCart());
	};

	// spinner
	if (isSubmitting) {
		return (
			<div className="spinner-pos">
				<Spinner />
			</div>
		);
	}

	return (
		<>
			<div className="container-fluid">
				<div className="row my-4">
					{cartItems.length > 0 ? (
						<>
							<div className="col-sm-12 col-md-12 col-lg-8">
								{/* clear cart button */}
								<div className="row">
									<div className="d-flex justify-content-end px-4">
										<button type="button" className="btn btn-dark px-5 mx-2" onClick={clearCartHandler}>
											Clear Cart
										</button>
									</div>
								</div>
								{/* cart items */}
								<div className="row mt-3 mx-2">
									{cartItems.map((product, index) => (
										<CartItem key={index} product={product} />
									))}
								</div>
							</div>
							{/* price details section */}
							<div className="col">
								<div className="row-12">
									<Card border="secondary" className="w-auto rounded-0 m-10 my-5 shadow">
										<Card.Header className={classes["card-header"]}>PRICE DETAILS</Card.Header>
										<Card.Body>
											<div className="d-flex my-2 justify-content-between">
												<p className="m-0">
													Price ({cartItems.length} {`${cartItems.length > 1 ? "products" : "product"}`})
												</p>
												<span className="mx-5">
													<FormatPrice price={totalPrice} />
												</span>
											</div>
											<div className="d-flex my-3 justify-content-between">
												<p className="m-0">Delivery Charges</p>
												<span className="mx-5"> Free</span>
											</div>
											<div className="d-flex my-3 justify-content-between" style={{ borderTop: "1px dashed #e0e0e0", fontWeight: 500, fontSize: "18px" }}>
												<p className="m-0">Total Amount</p>
												<span className="mx-5">
													<FormatPrice price={totalPrice} />
												</span>
											</div>
										</Card.Body>
									</Card>
								</div>
								<div className="row mx-5 px-5">
									<button type="button" className="btn btn-dark" onClick={submitOrderHandler}>
										Order Place
									</button>
								</div>
							</div>
						</>
					) : (
						<Col>
							{/* Empty cart page */}
							<EmptyCartPage />
						</Col>
					)}

					<ToastContainer />
				</div>
			</div>
		</>
	);
};

export default Cart;
