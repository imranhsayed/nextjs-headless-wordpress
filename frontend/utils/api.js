import client from "../src/apollo/client";
import {GET_PAGE_BY_ID} from "../src/queries/pages/get-page";
import LOGIN from "../src/mutations/login";

export async function getPreviewPage(id) {

    const { data, errors } = await client.query({
        query: GET_PAGE_BY_ID,
        variables: {
            id: Number(id),
        },
    });

    return data || {};
}

export async function loginUser() {

    const { data, errors } = await client.query({
        query: LOGIN,
        variables: {
            input: {
                clientMutationId: 'my-mutation', // Generate a unique id.,
                username: 'root',
                password: 'root',
            },
        },
    });

    console.log( 'errors', errors );

    return data || {};
}

