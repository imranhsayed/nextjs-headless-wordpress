import Posts from "../blog/posts";
import {totalPagesCount} from "../../utils/pagination";

const LoadMorePosts = ({posts}) => {
    const pagesCount = totalPagesCount(posts?.pageInfo?.offsetPagination?.total ?? 0);
    return (
        <>
            <Posts posts={posts}/>
        </>
    )
}

export default LoadMorePosts;
