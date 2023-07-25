import { useSelector } from "react-redux";
import CartIcon from "../../Icon/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
	const cart = useSelector((state) => state.cart.cartItems);

	let numberOfCartItems = 0;
	if (cart) {
		numberOfCartItems = cart.length;
	}

	return (
		<div className="d-flex" onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
				{cart && cart.length > 0 && <span className={classes["cart-basket"]}>{numberOfCartItems}</span>}
			</span>
			<span>Cart</span>
		</div>
	);
};

export default HeaderCartButton;
