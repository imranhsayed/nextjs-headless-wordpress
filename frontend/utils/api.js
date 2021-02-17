import client from "../src/apollo/client";
import {GET_PAGE_BY_ID} from "../src/queries/pages/get-page";
import LOGIN from "../src/mutations/login";
import { v4 } from "uuid";

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
                clientMutationId: v4(), // Generate a unique id
                username: username || '',
                password: password || '',
            },
        },
    });

    return data || {};
}

