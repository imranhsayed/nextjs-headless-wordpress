import React, { useState } from "react";
import { isEmpty } from 'lodash';
import { useMutation } from "@apollo/client";
import { v4 } from "uuid";
import LOGIN from "../src/mutations/login";
import validateAndSanitizeLoginForm from "../utils/validator/login";
import axios from "axios";
import {sanitize} from "../src/utils/miscellaneous";

const Login = ({ setLoggedIn }) => {
    const [loginFields, setLoginFields] = useState({
        username: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState(null);

    // Login Mutation.
    // const [login, { loading: loginLoading, error: loginError }] = useMutation(
    //     LOGIN,
    //     {
    //         variables: {
    //             input: {
    //                 clientMutationId: v4(), // Generate a unique id.,
    //                 username: loginFields?.username ?? '',
    //                 password: loginFields?.password ?? '',
    //             },
    //         },
    //         onCompleted: (data) => {
    //             // If error.
    //             if (!isEmpty(loginError)) {
    //                 setErrorMessage(loginError?.graphQLErrors?.[0]?.message ?? '');
    //             }
    //
    //             const { login } = data || {};
    //             const authData = {
    //                 authToken: login?.authToken ?? '',
    //                 user: login?.user ?? '',
    //             };
    //
    //             console.log( 'authData', authData );
    //
    //             setLoggedIn(true);
    //         },
    //         onError: (error) => {
    //             if (error) {
    //                 if (!isEmpty(error)) {
    //                     setErrorMessage(error.graphQLErrors[0].message);
    //                 }
    //             }
    //         },
    //     }
    // );

    const onFormSubmit = (event) => {
        event.preventDefault();
        setErrorMessage(null);

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
                url: '/api/login'
            })
                .then((data) => {
                    console.log( 'data', data?.data );
                    return data?.data?.success ?? ''
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
        <div className="login-form bg-gray-100 rounded-lg p-8 md:ml-auto mt-10 md:mt-0 w-5/12 m-auto">
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
    );
};
export default Login;
