import Link from "next/link";
import client from "../src/apollo/client";
import Header from "../src/components/layout/header";
import Footer from "../src/components/layout/footer";
import {GET_MENUS} from "../src/queries/get-menus";

function Error404({data}) {
    const {header, footer, headerMenus, footerMenus} = data || {};
    return (
        <>
            <Header header={header} headerMenus={headerMenus?.edges}/>
            <div className="h-almost-screen">
                <section className="text-gray-600 body-font">
                    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                        <div
                            className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                                Sorry No result found
                            </h1>
                            <div className="flex justify-center">
                                <Link href="/">
                                    <a
                                        className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Back
                                        to Home
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                            <img className="object-cover object-center rounded" alt="hero"
                                 src="https://dummyimage.com/620x400"/>
                        </div>
                    </div>
                </section>
            </div>
            <Footer footer={footer} footerMenus={footerMenus?.edges}/>
        </>


    )
}

export default Error404

export async function getStaticProps() {

    const {data} = await client.query({
        query: GET_MENUS,
    });

    return {
        props: {
            data: data || {}
        },
    };
}
