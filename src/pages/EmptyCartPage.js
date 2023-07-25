import { useNavigate } from "react-router-dom";
import EmptyCartImage from "../assets/empty-cart.jpg";

const EmptyCartPage = () => {
	const navigate = useNavigate();
	return (
		<div className="row">
			<div className="col-12-12">
				<div className="col my-2 py-2 mx-lg-5 px-lg-5 d-flex justify-content-center flex-column text-center">
					<img src={EmptyCartImage} alt="Your Cart is empty" className="img-fluid" />
					<div className="mt-4">
						<button className="btn btn-dark" onClick={() => navigate("/products")}>
							Go To Products Page
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmptyCartPage;
