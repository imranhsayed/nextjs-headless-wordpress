
import Link from "next/link";
import Image from "../../image";
import {sanitize} from "../../../utils/miscellaneous";

const Post = ({post}) => {

    return (
        <div className="mb-8">
            <figure className="overflow-hidden mb-4">
                <Image { ...post?.featuredImage?.node } width="400" height="225" layout="fill" containerClassNames="w-96 sm:-w-600px md:w-400px h-56 sm:h-338px md:h-225px" title={post?.title ?? ''}/>
            </figure>
            <Link href={`/blog/${post?.slug}/`}>
                <a>
                    <h2 dangerouslySetInnerHTML={{__html: sanitize( post?.title ?? '' )}}/>
                </a>
            </Link>
            <div dangerouslySetInnerHTML={{__html: sanitize( post?.excerpt ?? '' )}}/>
        </div>
    );
}

export default Post
