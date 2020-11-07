import Header from "./header";

const Layout = ( { data, children } ) => {
	{/*@see https://tailwindcss.com/docs/container*/}
	
	console.warn( 'data', data );
	return (
		<div>
			<Header headerMenus={ data?.menus?.headerMenus }/>
			{ children }
		</div>
	)
}

export default Layout
