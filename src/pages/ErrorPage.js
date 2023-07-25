import ErrorPageImage from "../assets/error-page-image.png";

const ErrorPage = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12-12">
					<div className="col mx-lg-5 px-lg-5 d-flex justify-content-center">
						<img src={ErrorPageImage} alt="404 Error Found" className="img-fluid" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
