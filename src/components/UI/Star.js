import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import classes from "./Star.module.css";

const Star = ({ stars, reviews }) => {
	const ratingStar = Array.from({ length: 5 }, (elem, index) => {
		let number = index + 0.5;
		return <span key={index}>{stars >= index + 1 ? <FaStar className={classes.icon} /> : stars >= number ? <FaStarHalfAlt className={classes.icon} /> : <AiOutlineStar className={classes.icon} />}</span>;
	});

	return (
		<div className={classes["icon-style"]}>
			{ratingStar}
			<p>({reviews} customer reviews)</p>
		</div>
	);
};

export default Star;
