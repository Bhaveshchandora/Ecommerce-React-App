import NoProductFoundImage from "../assets/no-product-found.png";

const DataNotAvailablePage = () => {
	return (
		<div className="row">
			<div className="col-12-12">
				<div className="col my-5 py-5 mx-lg-5 px-lg-5 d-flex justify-content-center">
					<img src={NoProductFoundImage} alt="No Product Found" className="img-fluid" />
				</div>
			</div>
		</div>
	);
};

export default DataNotAvailablePage;
