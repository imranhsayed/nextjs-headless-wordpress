import {loginUser} from "../../utils/api";
import cookie from 'cookie';

// http://localhost:3000/api/preview/?secret=my-secret&id=8
export default async function login(req, res) {
    const { username, password } = req?.body ?? '';
    const data = await loginUser({username, password})
    console.log( 'data?.login?.authToken', data?.login?.authToken );
    res.setHeader('Set-Cookie', cookie.serialize('auth', String(data?.login?.authToken ?? ''), {
        httpOnly: true,
        secure: 'development' !== process.env.NODE_ENV,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

    // @TODO Remove sending data, only send a message that successful, because we dont want to send JWT to client.
    res.status(200).json({ data });
}
