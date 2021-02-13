
import cookie from 'cookie';

// http://localhost:3000/api/preview/?secret=my-secret&id=8
export default async function page(req, res) {
    console.log( 'req', req.cookies );
    res.status(200).json({ name: 'Imran' });
}
