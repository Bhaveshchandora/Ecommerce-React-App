import React, { useState } from "react";
import classes from "./ImageCarousel.module.css";

const ImageCarousel = ({ images = [{ image_url: "" }] }) => {
	const [mainImage, setMainImage] = useState(images[0].image_url);

	return (
		<>
			<div className="row">
				<div className={classes["main-screen"]}>
					<img src={mainImage} alt="Image Not Available" style={{ width: "800px", height: "500px" }} className="img-fluid img-thumbnail shadow" />
				</div>
			</div>
			<div className="row my-3 px-2">
				{images.map((curElm, index) => (
					<div className="col-3 px-2" key={index}>
						<figure className={classes["image-shadow"]} style={{ cursor: "pointer" }}>
							<img src={curElm.image_url} alt="Image Not Available" className="img-fluid img-thumbnail" onClick={() => setMainImage(curElm.image_url)} />
						</figure>
					</div>
				))}
			</div>
		</>
	);
};

export default ImageCarousel;
