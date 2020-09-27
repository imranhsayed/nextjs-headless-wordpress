import React from "react";
import Navbar from "./navbar";

const Header = ({ menus }) => {
	return (
		<header>
			<Navbar menus={ menus } />
		</header>
	)
}

export default Header;
