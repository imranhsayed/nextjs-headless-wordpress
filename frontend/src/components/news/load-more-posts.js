import {useState} from 'react';
import Posts from "../blog/posts";
import {PER_PAGE_FIRST, totalPagesCount} from "../../utils/pagination";
import { useLazyQuery } from "@apollo/client";
import {GET_LOAD_MORE_NEWS} from "../../queries/news/get-load-more-news";

const LoadMorePosts = ({posts}) => {
    console.log( 'posts', posts );
    const pagesCount = totalPagesCount(posts?.pageInfo?.offsetPagination?.total ?? 0);
    const [postsData, setPostsData] = useState(posts?.edges)
    const [error, setError] = useState(null)
    const [pageInfo, setPageInfo] = useState(posts?.pageInfo)

    const [fetchPosts, { loading }] = useLazyQuery( GET_LOAD_MORE_NEWS, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setPosts(posts)
        },
        onError: (error) => {
            setError(error?.graphQLErrors ?? '')
        }
    })

    /**
     * Set posts.
     *
     * @param {Object} posts Posts.
     *
     * @return {void}
     */
    const setPosts = (posts) => {
        if (!posts || !posts.edges || !posts.pageInfo) {
            return
        }
        const newPosts = postsData.concat(posts.edges)
        setPostsData(newPosts)
        setPageInfo({ ...posts.pageInfo })
    }

    const loadMoreItems = (endCursor = null) => {

        fetchPosts({
            variables: {
                first: PER_PAGE_FIRST,
                after: endCursor,
            }
        });
    }

    const { endCursor, hasNextPage } = pageInfo || {}

    console.log( 'pageInfo', pageInfo );

    return (
        <>
            <Posts posts={posts}/>
            {hasNextPage ? (
                <div className='w-full flex justify-center lg:my-8'>
                    {loading ? (
                        <div className='w-full border border-white px-3 py-2 flex justify-center my-8'>
                            Loading...
                        </div>
                    ) : (
                        <button
                            className='flex items-center bg-gray-100 hover:bg-gray-200 transition-colors duration-500 rounded-l-full rounded-r-full px-4 py-3 font-poppins font-semibold'
                            onClick={() => loadMoreItems(endCursor)}
                        >
                            See more +
                        </button>
                    )}
                </div>
            ) : null}
            {error && <div className='w-full flex justify-center my-8'>No articles available</div>}
        </>
    )
}

export default LoadMorePosts;
