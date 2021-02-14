import {getPreviewPage, loginUser} from "../../utils/api";
import {getAuthToken} from "../../src/utils/cookies";
import {isEmpty} from 'lodash';

// http://localhost:3000/api/preview/?postType=page&postId=30
export default async function preview(req, res) {
    const { postType, postId } = req.query

    const authToken = getAuthToken(req)
    console.log( 'authtokemddd', authToken );

    if ( isEmpty( authToken ) ) {
        res.writeHead(307, { Location: `/login/?postType=${postType}&previewPostId=${postId ?? ''}` })
    }

    // Check the secret and next parameters
    // This secret should only be known by this API route
    // if (
    //     !process.env.WORDPRESS_PREVIEW_SECRET ||
    //     secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
    //    !id
    // ) {
    //     return res.status(401).json({ message: 'Invalid token' })
    // }

    // Fetch WordPress to check if the provided `id` or `slug` exists
    const data = await getPreviewPage(postId)
    // const data = await loginUser()
    //
    //
    return res.status(401).json({ hey: 'hello' })

    // If the post doesn't exist prevent preview mode from being enabled
    if (!data) {
        return res.status(401).json({ message: 'Post not found' })
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({
        post: {
            id: data?.page?.databaseId,
            slug: data?.page?.slug,
            status: data?.page?.status,
        },
    })

    // Redirect to the path from the fetched post
    // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
    res.writeHead(307, { Location: `/${data?.page?.id ?? ''}/` })
    res.end()
}
