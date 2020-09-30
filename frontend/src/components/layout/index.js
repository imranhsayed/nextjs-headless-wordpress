import React from "react";
import Link from "next/link";
import Header from "../header";

const Layout = ({ menus, children }) => {

	return (
		<div>
			<Header menus={ menus }/>
			{children}
		</div>
	);
};

export default Layout;
