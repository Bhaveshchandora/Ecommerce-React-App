import classes from "./ProductViewDetail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import FormatPrice from "../../../pages/FormatPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import ReviewPage from "../Review/ReviewPage";
import Star from "../../UI/Star";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { useEffect } from "react";
import { reviewActions } from "../../../store/review-slice";
import ImageCarousel from "../../UI/ImageCarousel";

function ProductViewDetail(props) {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.product.products);

	const location = useLocation();
	const navigate = useNavigate();
    const data = location.state || {};
    // const productId = props.match.params.productId;
    console.log("productId ====== ", props);

    const singleProduct = products.filter((product) => product.id === data.id);

    const { id, name, brand, price, description, category, images, reviews, stars, quantity } = singleProduct[0];
    console.log("id :::::: ", id);


    useEffect(() => {
        console.log("review :::::: ", reviews);
		dispatch(reviewActions.updateReviews(reviews));
	}, []);

	// add item in cart
	const addToItemHandler = () => {
		dispatch(
			cartActions.addItem({
				id: id,
				name: name,
				amount: 1,
				price: price,
				description: description,
				brand: brand,
				image: images[0].image_url,
				category: category,
				quantity: quantity,
			})
		);
		navigate("/cart");
	};

	return (
		<div className="container-fluid">
			<div className="row mx-0 py-2">
				<div className={`${classes["image-data-sticky"]} "col-sm-12 col-xs-12 col-md-6 text-center p-4 p-md-3 pb-xxl-0"`}>
					{/* product images */}
					<div className="col">
						<ImageCarousel images={images} />
					</div>
				</div>
				<div className="col p-4 p-md-3 p-xxl-0">
					<div className="row px-3">
						{/* product data  */}
						<div className="col-12" style={{ paddingLeft: "24px" }}>
							<h2 className="px-2 my-2">{name}</h2>
							<Star stars={stars} reviews={5} />
							<p className="px-2 my-3">{description}</p>

							<p className="font-weight-bold px-2 my-2">
								MRP:
								<del>
									<FormatPrice price={price * 2} />
								</del>
							</p>
							<p className={classes["deal-price"]}>
								Deal price: <FormatPrice price={price} />
							</p>
							{quantity > 0 && <p className="px-2 my-1">Quantity: {quantity}</p>}

							{!quantity > 0 && (
								<div className={classes["product-stock"]} style={{ border: "1px solid red", color: "red" }}>
									<p className="px-2 my-2">Item out of stock</p>
								</div>
							)}

							<p className="px-2 my-2">
								Brand :<span> {brand} </span>
							</p>

							<div className="row d-flex px-2 my-2">
								<div className="col col-md-12 col-sm-12 d-flex mt-md-2 mt-sm-2" style={{ marginRight: "15px" }}>
									<TbTruckDelivery className={classes["warranty-icon"]} />
									<p className="px-1">Free Delivery</p>
								</div>

								<div className="col col-md-12 col-sm-12 d-flex mt-md-2 mt-sm-3" style={{ marginRight: "15px" }}>
									<TbReplace className={classes["warranty-icon"]} />
									<p className="px-1">10 Days Replacement</p>
								</div>

								<div className="col d-flex mt-md-2 mt-sm-3" style={{ marginRight: "15px" }}>
									<MdSecurity className={classes["warranty-icon"]} />
									<p className="px-1">2 Year Warranty </p>
								</div>
							</div>
						</div>
						{/* add to cart button */}
						<div className="col d-flex justify-content-start mt-4 px-3 mx-3">
							<button className="btn btn-dark btn-md mb-3 mb-md-0" disabled={quantity === 0} style={{ marginRight: "20px" }} onClick={addToItemHandler}>
								ADD TO CART
							</button>
						</div>

						<div className="col-12">
							{/* Product review data */}
							<ReviewPage productId={id} reviews={reviews} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductViewDetail;
