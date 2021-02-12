import {loginUser} from "../../utils/api";

// http://localhost:3000/api/preview/?secret=my-secret&id=8
export default async function login(req, res) {
    const { username, password } = req?.body ?? '';
    console.log( 'req', req?.query );
    const data = await loginUser({username, password})
    res.status(200).json({ data });
}
