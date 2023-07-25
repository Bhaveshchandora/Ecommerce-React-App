import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormatPrice from "../../../pages/FormatPrice";
import classes from "./ProductList.module.css";

function ProductList(props) {
	return (
		<div className="row">
			{props.products &&
				props.products.map((product) => (
					<Col xs={12} md={6} lg={4} className="my-2" key={product.id}>
						<Link to={`/products/${product.id}`} state={product} className="text-decoration-none text-dark">
							<div className={`${classes["card-shadow"]} "card h-100 "`}>
								<div className="h-300">
									<img variant="top" className="img-fluid img-thumbnail" style={{ width: "100%", objectFit: "cover", height: "300px" }} src={product.images[0].image_url} alt="Product Not Available" />
								</div>
								<div className="card-body p-2">
									<p style={{ color: "#878787", fontSize: "18px", fontWeight: "500", marginBottom: "4px" }}>{product.brand}</p>
									<p className="mb-2">{product.description}</p>
									<p className="font-weight-bold mb-2">
										MRP:
										<del>
											<FormatPrice price={product.price * 2} />
										</del>
									</p>
									<p style={{ color: "rgb(98 84 243)", fontWeight: "bold" }}>Deal price:{<FormatPrice price={product.price} />}</p>
								</div>
							</div>
						</Link>
					</Col>
				))}
		</div>
	);
}

export default ProductList;
