import React from "react";
import Link from "next/link";
import Header from "../header";

const Layout = ({ menus, children }) => {

	return (
		<div>
			<Header menus={ menus }/>
			{/*@see https://tailwindcss.com/docs/container*/}
			<div className="container mx-auto px-4">
				{children}
			</div>
		</div>
	);
};

export default Layout;
