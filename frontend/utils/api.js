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

export async function loginUser({username, password}) {

    const { data, errors } = await client.query({
        query: LOGIN,
        variables: {
            input: {
                clientMutationId: 'my-mutation', // Generate a unique id.,
                username: username || '',
                password: password || '',
            },
        },
    });

    return data || {};
}

