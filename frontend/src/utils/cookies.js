import cookie from "cookie"

export function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie : '')
}

export function getAuthToken(req) {
    const cookies = parseCookies(req);
    return cookies['auth'] || '' ;
}
