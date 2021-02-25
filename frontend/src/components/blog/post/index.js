
import Link from "next/link";
import Image from "../../image";
import {sanitize} from "../../../utils/miscellaneous";

const Post = ({post}) => {
    return (
        <div className="mb-8">
            <figure className="overflow-hidden mb-4">
                <Image { ...post?.mediumLarge?.node } placeholder={ post?.thumbnail?.node } />
            </figure>
            <Link href={`/blog/${post?.slug}/`}>
                <a>
                    <h2 dangerouslySetInnerHTML={{__html: sanitize( post?.title )}}/>
                </a>
            </Link>
            <div dangerouslySetInnerHTML={{__html: sanitize( post?.excerpt )}}/>
        </div>
    );
}

export default Post
