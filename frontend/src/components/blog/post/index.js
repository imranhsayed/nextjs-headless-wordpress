import { sanitize } from "../../../utils/functions";
import Link from "next/link";
import Image from "../../image";

const Post = ({post}) => {
    return (
        <div>
            <figure className="overflow-hidden">
                <Image { ...post?.mediumLarge?.node } placeholder={ post?.thumbnail?.node } />
            </figure>
            <Link href="/blog/[slug]" as={`/blog/${post?.slug}`}>
                <a>
                    <h2 dangerouslySetInnerHTML={{__html: sanitize( post?.title )}}/>
                </a>
            </Link>
            <div dangerouslySetInnerHTML={{__html: sanitize( post?.excerpt )}}/>
        </div>
    );
}

export default Post
