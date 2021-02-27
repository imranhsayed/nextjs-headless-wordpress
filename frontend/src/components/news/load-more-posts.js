import {useState} from 'react';
import Posts from "../blog/posts";
import {PER_PAGE_FIRST} from "../../utils/pagination";
import { useLazyQuery } from "@apollo/client";
import {GET_LOAD_MORE_NEWS} from "../../queries/news/get-load-more-news";

const LoadMorePosts = ({posts}) => {

    /**
     * First set the posts data and pageInfo received from server side,
     * as initial postsData and pageInfo, so that
     * it sever side posts can be fetched, and the new endcursor( contained in pageInfo )
     * can be sent to get the next set of posts.
     */
    const [postsData, setPostsData] = useState(posts?.edges)
    const [pageInfo, setPageInfo] = useState(posts?.pageInfo)

    const [error, setError] = useState(null)

    /**
     * Set posts.
     *
     * @param {Object} posts Posts.
     *
     * @return {void}
     */
    const setPosts = (posts) => {
        if (!posts || !posts?.edges || !posts?.pageInfo) {
            return
        }

        /**
         * Concat the newly received post from client request to the existing posts, using setPostsData()
         * and also set the new pageInfo that contains the new endcursor, so that
         * when user clicks on loadmore again, next set of posts can be fetched again.
         * Same process if repeated to it gets concatenated everytime to the existing posts array.
         */
        const newPosts = postsData.concat(posts?.edges)
        setPostsData(newPosts)
        setPageInfo({ ...posts?.pageInfo })
    }

    const [fetchPosts, { loading }] = useLazyQuery( GET_LOAD_MORE_NEWS, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {

            /**
             * Call setPosts to concat the new set of posts to existing one and update pageInfo
             * that contains the cursor and the information about whether we have the next page.
             */
            setPosts(data?.posts ?? [])
        },
        onError: (error) => {
            setError(error?.graphQLErrors ?? '')
        }
    })

    /**
     * Calls fetchPosts
     *
     * fetchPosts() makes a client side request with the new endcursor info,
     * to get next set of posts.
     *
     * @param {String} endCursor Endcursor used to fetch the next set of posts.
     */
    const loadMoreItems = (endCursor = null) => {

        fetchPosts({
            variables: {
                first: PER_PAGE_FIRST,
                after: endCursor,
            }
        });
    }

    /**
     * Pull the endcursor and hasNextPage values from pageInfo
     *
     * Please note that pageInfo gets updated with new endCursor and hasNextPage
     * values everytime a new client side request is made using setPageInfo()
     */
    const { endCursor, hasNextPage } = pageInfo || {}

    return (
        <>
            <Posts posts={postsData}/>
            {hasNextPage ? (
                <div className='w-full flex justify-center lg:my-10'>
                    {loading ? (
                        <div className='flex justify-center w-full border border-white px-3 py-2 my-8'>
                            Loading...
                        </div>
                    ) : (
                        <button
                            className='flex items-center bg-gray-100 hover:bg-gray-600 hover:text-white transition-colors duration-500 border border-gray-500 px-4 py-3'
                            onClick={() => loadMoreItems(endCursor)}
                        >
                            Load more
                        </button>
                    )}
                </div>
            ) : null}
            {error && <div className='w-full flex justify-center my-10'>No articles available</div>}
        </>
    )
}

export default LoadMorePosts;
