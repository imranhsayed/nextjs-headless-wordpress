import {GET_PAGES} from "../src/queries/pages/get-pages";
import client from "../src/apollo/client";
import { isEmpty } from 'lodash';

const Pages = () => {
    return 'Pages'
}

export default Pages;

export async function getStaticPaths () {
    const { data } = await client.query({
        query: GET_PAGES
    })

    const pathsData = [];

    data?.pages?.nodes && data?.pages?.nodes.map( page => {

        if ( ! isEmpty( page?.slug ) && !customPagesSlugs.includes(page?.slug) ) {

        }

    } );


    return {
        paths: pathsData,
        fallback: true
    }
}
