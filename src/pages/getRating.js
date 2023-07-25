export function getRating(rating) {
	switch (rating) {
		case 0:
			return "";
		case 1:
			return "Poor";
		case 2:
			return "Nothing special";
		case 3:
			return "Average";
		case 4:
			return "Very good";
		case 5:
			return "Excellent";
		default:
			return "None";
	}
}
