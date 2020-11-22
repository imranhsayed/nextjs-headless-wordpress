import Header from "./header";
import Footer from "./footer";
import Head from 'next/head';

const Layout = ({data, children}) => {
	return (
		<div>
			<Head>
				<link rel="shortcut icon" href={ data?.header?.favicon } />
			</Head>
			<Header header={data?.header} headerMenus={data?.menus?.headerMenus}/>
			{children}
			<Footer footer={data?.footer} footerMenus={ data?.menus?.footerMenus }/>
		</div>
	)
}

export default Layout
