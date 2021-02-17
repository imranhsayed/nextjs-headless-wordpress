import {loginUser} from "../../utils/api";
import cookie from 'cookie';

export default async function login(req, res) {
    const { username, password } = req?.body ?? {};
    const data = await loginUser({username, password})

    /**
     * Note when you run 'npm run start' locally, cookies won't be set, because locally process.env.NODE_ENV = 'production'
     * so secure will be true, but it will still be http and not https , when tested locally.
     * So when testing locally both in dev and prod, set the value of 'secure' to be false.
     */
    res.setHeader('Set-Cookie', cookie.serialize('auth', String(data?.login?.authToken ?? ''), {
        httpOnly: true,
        secure: 'development' !== process.env.NODE_ENV,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

    // Only sending a message that successful, because we dont want to send JWT to client.
    res.status(200).json({ success: Boolean(data?.login?.authToken)});
}
