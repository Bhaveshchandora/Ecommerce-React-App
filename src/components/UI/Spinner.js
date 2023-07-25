import React from "react";
import ReactDOM from "react-dom";
import { BackDrop } from "./Modal";

const portalElement = document.getElementById("overlays");

const Spinner = (props) => {
	return (
		<React.Fragment>
			{ReactDOM.createPortal(<BackDrop onClick={props.onClose} />, portalElement)}
			<div className="col">
				<div className="spinner-border" style={{ color: "rgb(235 57 65)", width: "100px", height: "100px" }}>
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Spinner;
