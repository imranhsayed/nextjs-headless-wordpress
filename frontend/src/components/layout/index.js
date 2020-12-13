import Header from "./header";
import Footer from "./footer";
import Head from 'next/head';
import Seo from "../seo";
import {isEmpty} from 'lodash';

const Layout = ({data, children}) => {
	if (isEmpty(data?.page)) {
		return null
	}

	return (
		<div>
			<Seo seo={data?.page?.seo} uri={data?.page?.uri}/>
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
