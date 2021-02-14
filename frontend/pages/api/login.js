import {loginUser} from "../../utils/api";
import cookie from 'cookie';
import {getPreviewRedirectUrl} from "../../src/utils/redirects";

export default async function login(req, res) {
    const { username, password } = req?.body ?? {};
    const data = await loginUser({username, password})
    // console.log( 'data?.login?.authToken', data?.login?.authToken );
    // console.log( 'req.query', req.query );
    res.setHeader('Set-Cookie', cookie.serialize('auth', String(data?.login?.authToken ?? ''), {
        httpOnly: true,
        secure: 'development' !== process.env.NODE_ENV,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

    // Only sending a message that successful, because we dont want to send JWT to client.
    res.status(200).json({ success: Boolean(data?.login?.authToken)});
}
