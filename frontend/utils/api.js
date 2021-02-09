import client from "../src/apollo/client";
import {GET_PAGE_BY_ID} from "../src/queries/pages/get-page";

export async function getPreviewPage(id) {

    const { data, errors } = await client.query({
        query: GET_PAGE_BY_ID,
        variables: {
            id: Number(id),
        },
    });

    return data || {};
}
