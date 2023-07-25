import React, { useEffect, useState } from "react";
import classes from "./ReviewPage.module.css";
import { Controller, useForm } from "react-hook-form";
import { Card } from "react-bootstrap";
import Modal from "../../UI/Modal";
import { Rating } from "@smastrom/react-rating";
import StarIcon from "../../../Icon/StarIcon";
import TickCheckIcon from "../../../Icon/TickCheckIcon";
import Spinner from "../../UI/Spinner";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateProductData } from "../../../store/product-actions";
import { getRating } from "../../../pages/getRating";
import { reviewActions } from "../../../store/review-slice";

const ReviewPage = (props) => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.review.isLoading);
	const reviews = useSelector((state) => state.review.reviews);

	const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
	const [hoveredRating, setHoveredRating] = useState(0);
	const [reviewList, setReviewList] = useState(reviews);
	const [initial, setInitial] = useState(false);

	const date = new Date().toLocaleDateString("en-us", { year: "numeric", month: "short" });
	const avgRating = reviewList  ? reviewList.reduce((total, next) => total + next.rating, 0) / reviewList.length : 0;
	const totalReviews = reviewList ? reviewList.length : 0;

	const individualReview = reviewList.map((data) => data.rating);
	console.log("reviewList ::::::::: ", reviewList);
	console.log("individualReview ----- ", individualReview);

	const reviewCount = {};

	individualReview.forEach((element) => {
		reviewCount[element] = (reviewCount[element] || 0) + 1;
	});

	console.log("count :::::: ", reviewCount);

	// use form control
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState,
		formState: { errors, isSubmitSuccessful },
	} = useForm({
		mode: "onBlur",
		defaultValues: {
			name: "",
			comment: "",
			rating: 0,
		},
	});

	useEffect(() => {
		dispatch(reviewActions.updateReviews(reviewList));
		if (initial) {
			dispatch(updateProductData(props.productId, reviewList));
		}
	}, [reviewList, dispatch]);

	// form submit handler
	const onSubmit = async (data) => {
		const newReview = JSON.parse(JSON.stringify(data));
		setReviewList((current) => [...current, newReview]);
		// await updateProduct();
		setIsOpenReviewModal(false);
		setInitial(true);
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({ name: "", comment: "", rating: 0 });
		}
	}, [formState, reset, isSubmitSuccessful]);

	const productReviewHandler = (
		<Card border="light">
			<Card.Body>
				<Card.Title>Rating & Review</Card.Title>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="name">
						Your name:
						<input type="text" id="name" {...register("name", { required: true })} />
					</label>
					{errors.name && <div style={{ color: "red" }}>Name is required.</div>}

					<label htmlFor="comment" className="my-2">
						Comment:
						<input type="text" id="comment" {...register("comment", { required: true })} />
					</label>
					{errors.comment && <div style={{ color: "red" }}>comment is required.</div>}

					<div>
						<div id="rating_label">Rating:</div>
						<Controller
							control={control}
							name="rating"
							rules={{
								validate: (rating) => rating > 0,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<>
									<div style={{ display: "inline-flex", justifyContent: "space-around" }}>
										<Rating
											style={{
												width: "200px",
												padding: "15px 20px",
											}}
											value={value}
											isRequired
											onChange={onChange}
											onHoverChange={setHoveredRating}
											visibleLabelId="rating_label"
											onBlur={onBlur}
										/>
										{value !== "None" && <div style={{ padding: "15px 0" }}>{hoveredRating ? <div>{getRating(hoveredRating)}</div> : <div>{getRating(value)}</div>} </div>}
									</div>
								</>
							)}
						/>
						{errors.rating && <div style={{ color: "red" }}>Rating is required.</div>}
					</div>

					<div style={{ alignItems: "flex-start", display: "flex" }}>
						<button className="btn btn-dark" onClick={() => setIsOpenReviewModal(false)}>
							Cancel
						</button>
						<button className="btn btn-dark mx-4" type="submit">
							Submit Review
						</button>
					</div>
				</form>
			</Card.Body>
		</Card>
	);

	if (isLoading) {
		return (
			<div className="spinner-pos">
				<Spinner />
			</div>
		);
	}

	return (
		<>
			<div className="row">
				<div className={classes["review-container"]}>
					<div className={classes["review-header"]}>
						<div className={classes["header-text"]}>Ratings &amp; Reviews</div>
						<div className={classes["rate-product"]}>
							<button className="btn btn-dark btn-md mx-3 mb-md-0 rate-product-btn" type="submit" onClick={() => setIsOpenReviewModal(true)}>
								Rate Product
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row" style={{ border: "1px solid lightgrey", padding: "24px" }}>
				<div className={classes["review-box"]}>
					<div className="row d-flex">
						<div className={`${classes["review-block"]} "col-3"`}>
							<div className="col align-top">
								<div className="row">
									<div className="col-12 m-auto w-auto">
										<div className={classes["rating-no"]}>{avgRating.toFixed(1)}</div>
										<div className={classes["star-icon"]}>★</div>
									</div>
								</div>
								<div className="row w-100 d-flex">
									<div className="col-12 w-100 text-center p-0">
										<span>{totalReviews} Reviews</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col" style={{ paddingLeft: "12px" }}>
							<div className="row">
								<div className="col-2">
									<ul className="p-0">
										<li className={classes["list-view"]}>
											<div>
												<span>5</span>
												<span>★</span>
											</div>
										</li>
										<li className={classes["list-view"]}>
											<div>
												<span>4</span>
												<span>★</span>
											</div>
										</li>
										<li className={classes["list-view"]}>
											<div>
												<span>3</span>
												<span>★</span>
											</div>
										</li>
										<li className={classes["list-view"]}>
											<div>
												<span>2</span>
												<span>★</span>
											</div>
										</li>
										<li className={classes["list-view"]}>
											<div>
												<span>1</span>
												<span>★</span>
											</div>
										</li>
									</ul>
								</div>
								<div className="col">
									<ul className="p-0">
										<li className={classes["list-view"]}>
											<div className="progress my-2" style={{ height: "40%" }}>
												<div className="progress-bar bg-success" role="progressbar" style={{ width: `${reviewCount[5]}%` }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
										</li>
										<li className={classes["list-view"]}>
											<div className="progress my-2" style={{ height: "40%" }}>
												<div className="progress-bar bg-info" role="progressbar" style={{ width: `${reviewCount[4]}%` }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
										</li>
										<li className={classes["list-view"]}>
											<div className="progress my-2" style={{ height: "40%" }}>
												<div className="progress-bar bg-warning" role="progressbar" style={{ width: `${reviewCount[3]}%` }} aria-valuenow="16" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
										</li>
										<li className={classes["list-view"]}>
											<div className="progress my-2" style={{ height: "40%" }}>
												<div className="progress-bar bg-danger" role="progressbar" style={{ width: `${reviewCount[2]}%` }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
										</li>
										<li className={classes["list-view"]}>
											<div className="progress my-2" style={{ height: "40%" }}>
												<div className="progress-bar bg-primary" role="progressbar" style={{ width: `${reviewCount[1]}%` }} aria-valuenow="4" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
										</li>
									</ul>
								</div>
								<div className="col-2">
									<ul className="p-1">
										{reviewCount && (
											<>
												<li className={classes["list-view"]}>{reviewCount[5]}</li>
												<li className={classes["list-view"]}>{reviewCount[4]}</li>
												<li className={classes["list-view"]}>{reviewCount[3]}</li>
												<li className={classes["list-view"]}>{reviewCount[2]}</li>
												<li className={classes["list-view"]}>{reviewCount[1]}</li>
											</>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{reviewList &&
				reviewList.length > 0 &&
				reviewList.map((review, index) => (
					<div className="row" key={index} style={{ border: "1px solid lightgrey" }}>
						<div className="col">
							<div className="row my-3 mx-2 w-5 d-flex">
								<>
									{review.rating >= 3 && (
										<div className={classes["review-star-single"]} style={{ backgroundColor: "#388e3c" }}>
											{review.rating} <StarIcon />
										</div>
									)}
									{review.rating === 2 && (
										<div className={classes["review-star-single"]} style={{ backgroundColor: "#ff9f00" }}>
											{review.rating} <StarIcon />
										</div>
									)}
									{review.rating === 1 && (
										<div className={classes["review-star-single"]} style={{ backgroundColor: "#ff6161" }}>
											{review.rating} <StarIcon />
										</div>
									)}
								</>
								<p className={classes["review-title"]}>{getRating(review.rating)}</p>
							</div>
							<div className="row my-3 mx-2">{review.comment}</div>
							<div className="row my-2 mx-2 blockquote-footer" style={{ color: "#878787", fontWeight: 500, fontSize: "18px" }}>
								{review.name}, <TickCheckIcon /> Certified Buyer, India, {date}
							</div>
						</div>
					</div>
				))}
			{isOpenReviewModal && <Modal onClick={props.onClose}>{productReviewHandler}</Modal>}
			<ToastContainer />
		</>
	);
};

export default ReviewPage;
