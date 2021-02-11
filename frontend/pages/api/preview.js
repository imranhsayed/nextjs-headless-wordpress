import {getPreviewPage} from "../../utils/api";

// http://localhost:3000/api/preview/?secret=my-secret&id=8
export default async function preview(req, res) {
    const { secret, id } = req.query

    // Check the secret and next parameters
    // This secret should only be known by this API route
    if (
        !process.env.WORDPRESS_PREVIEW_SECRET ||
        secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
       !id
    ) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    // Fetch WordPress to check if the provided `id` or `slug` exists
    const data = await getPreviewPage(id)
    return res.status(401).json({ data })

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
    res.writeHead(307, { Location: `/${data?.page?.id}/` })
    res.end()
}
