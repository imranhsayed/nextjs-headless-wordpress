import Header from "./header";
import Footer from "./footer";
import Head from 'next/head';
import Seo from "../seo";
import {isEmpty} from 'lodash';
import {sanitize} from "../../utils/miscellaneous";

const Layout = ({data, children}) => {
	if (isEmpty(data?.page)) {
		return null
	}

	const {page, header, footer, menus} = data || {};

	return (
		<div>
			<Seo seo={page?.seo} uri={page?.uri}/>
			<Head>
				<link rel="shortcut icon" href={ header?.favicon } />
				{page?.seo?.schemaDetails && (
					<script
						type='application/ld+json'
						className='yoast-schema-graph'
						key='yoastSchema'
						dangerouslySetInnerHTML={{ __html: sanitize(page.seo.schemaDetails) }}
					/>
				)}
			</Head>
			<Header header={header} headerMenus={menus?.headerMenus}/>
			<div className="h-almost-screen">
				{children}
			</div>
			<Footer footer={footer} footerMenus={ menus?.footerMenus }/>
		</div>
	)
}

export default Layout
