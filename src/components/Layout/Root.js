import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

const RootLayout = () => {
	return (
		<Container fluid className="px-0">
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</Container>
	);
};

export default RootLayout;
