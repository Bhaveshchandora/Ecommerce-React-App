import React, { useState } from "react";
import FormatPrice from "../../pages/FormatPrice";
import { Card, Col } from "react-bootstrap";
import classes from "./CartItem.module.css";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
	const dispatch = useDispatch();
	const { id, name, price, description, image, amount, quantity } = props.product;
	const [isOpenModal, setIsOpenModal] = useState(false);

	// remove cart item using confirmation modal
	const removeCardItemHandler = () => {
		setIsOpenModal(true);
		dispatch(cartActions.removeItems(id));
		setIsOpenModal(false);
	};

	// add item in cart
	const addItemHandler = (item) => {
		const cartItem = { ...item, amount: 1 };
		dispatch(cartActions.addItem(cartItem));
	};

	// remove item from cart
	const removeItemHandler = (id) => {
		dispatch(cartActions.removeItem(id));
	};

	// remove cart item confirmation modal
	const removeCartItemConfirmation = (
		<Card border="light" className="shadow">
			<Card.Body>
				<Card.Title>Remove Item</Card.Title>
				<Card.Text className="my-3 px-0">Are you sure you want to remove this item?</Card.Text>
			</Card.Body>
			<Card.Footer className={classes["card-footer"]}>
				<button className="btn btn-dark mx-4" onClick={() => setIsOpenModal(false)}>
					cancel
				</button>
				<button className="btn btn-dark mx-4" onClick={removeCardItemHandler}>
					Remove
				</button>
			</Card.Footer>
		</Card>
	);
	return (
		<>
			<Card className="mb-4 px-2 shadow">
				<li className="d-flex my-1" key={id}>
					<Col sm={3} className="my-auto text-center pb-4 pb-md-0">
						<div className="row">
							{/* product Images  */}
							<div className="my-1">
								<img src={image} alt="Image Not Available" className="img-fluid img-thumbnail" style={{ width: "100px", height: "100px" }} />
							</div>
						</div>
						<div className="row">
							<div className="col d-flex justify-content-center my-2">
								<button className="btn btn-light border-secondary rounded-circle" disabled={amount <= 1} onClick={removeItemHandler.bind(null, id)}>
									−
								</button>
								<span className={classes.amount}>{amount}</span>
								<button className="btn btn-light border-secondary rounded-circle" disabled={amount >= quantity} onClick={addItemHandler.bind(null, props.product)}>
									+
								</button>
							</div>
						</div>
					</Col>
					<Col className="ps-1 ps-md-3 ps-xxl-0 m-2">
						{/* product data  */}
						<div className={classes["product-data"]}>
							<h3 className="mb-0">{name}</h3>
							<p className="p-0">{description}</p>
							<div className={classes.summary}>
								<span className={classes.price}>
									MRP: <FormatPrice price={price} />
								</span>
							</div>

							<div className="my-2">
								<button className="btn btn-light border-secondary m-auto" onClick={() => setIsOpenModal(true)}>
									Remove
								</button>
							</div>
						</div>
					</Col>
				</li>
			</Card>

			{/* open confirmation modal */}
			{isOpenModal && (
				<Modal className="p-0 rounded" onClick={props.onClose}>
					{removeCartItemConfirmation}
				</Modal>
			)}
		</>
	);
};

export default CartItem;
