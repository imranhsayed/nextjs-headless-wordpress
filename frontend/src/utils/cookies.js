import cookie from "cookie"

export function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export function getAuthToken(req) {
    const cookies = parseCookies(req);
    return cookies['auth'] || '' ;
}
