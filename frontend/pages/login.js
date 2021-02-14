import { useState } from "react";
import { isEmpty } from 'lodash';
import validateAndSanitizeLoginForm from "../utils/validator/login";
import axios from "axios";
import {sanitize} from "../src/utils/miscellaneous";
import client from "../src/apollo/client";
import {GET_PAGE} from "../src/queries/pages/get-page";
import {handleRedirectsAndReturnData} from "../src/utils/slug";
import Layout from "../src/components/layout";
import {useRouter} from "next/router";
import {getPreviewRedirectUrl} from "../src/utils/redirects";

const Login = ({ data }) => {
    const router = useRouter();
    console.log( 'router', router );
    const [loginFields, setLoginFields] = useState({
        username: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const onFormSubmit = (event) => {
        event.preventDefault();
        setErrorMessage(null);
        const {postType, previewPostId} = router?.query ?? {};

        // Validation and Sanitization.
        const validationResult = validateAndSanitizeLoginForm({
            username: loginFields?.username ?? '',
            password: loginFields?.password ?? '',
        });

        if (validationResult.isValid) {
            return axios({
                data: {
                    username: validationResult?.sanitizedData?.username ?? '',
                    password: validationResult?.sanitizedData?.password ?? '',
                },
                method: 'post',
                url: `/api/login${queryParams}`
            })
                .then((data) => {
                    const {success} = data?.data ?? {};
                    console.log( 'success', success );

                    // If its a preview request
                    if ( success && postType && previewPostId ) {
                        const previewUrl = getPreviewRedirectUrl(postType, previewPostId);
                        router.push(previewUrl)
                    }
                    return data?.data?.success;
                })
                .catch(() => {
                    return false
                })
        } else {
            setClientSideError(validationResult);
        }
    };

    /**
     * Sets client side error.
     *
     * Sets error data to result received from our client side validation function,
     * and statusbar to true so that its visible to show the error.
     *
     * @param {Object} validationResult Validation Data result.
     */
    const setClientSideError = (validationResult) => {
        if (validationResult.errors.password) {
            setErrorMessage(validationResult.errors.password);
        }

        if (validationResult.errors.username) {
            setErrorMessage(validationResult.errors.username);
        }
    };

    const handleOnChange = (event) => {
        setLoginFields({ ...loginFields, [event.target.name]: event.target.value });
    };

    const { username, password } = loginFields;
    return (
        <Layout data={data}>
        <div className="login-form bg-gray-100 rounded-lg p-8 md:ml-auto mt-10 md:mt-12 w-5/12 m-auto">
            <h4 className="text-gray-900 text-lg font-medium title-font mb-5 block">Login</h4>
            {!isEmpty(errorMessage) && (
                <div
                    className="alert alert-danger"
                    dangerouslySetInnerHTML={{ __html: sanitize( errorMessage ) }}
                />
            )}
            <form onSubmit={onFormSubmit} className="mb-4">
                <label className="leading-7 text-sm text-gray-600">
                    Username:
                    <input
                        type="text"
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        name="username"
                        value={username}
                        onChange={handleOnChange}
                    />
                </label>
                <br />
                <label className="leading-7 text-sm text-gray-600">
                    Password:
                    <input
                        type="password"
                        className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                    />
                </label>
                <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="submit">
                    Login
                </button>
                {/*{loginLoading ? <p>Loading...</p> : null  }*/}
            </form>
        </div>
        </Layout>
    );
};
export default Login;

export async function getStaticProps(context) {

    const { data, errors } = await client.query({
        query: GET_PAGE,
        variables: {
            uri: "/",
        },
    });

    const defaultProps = {
        props: {
            data:  data || {}
        },
        /**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */
        revalidate: 1,
    };

    return handleRedirectsAndReturnData( defaultProps, data, errors, 'page' );
}
