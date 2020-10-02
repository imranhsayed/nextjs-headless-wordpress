import {DiscussionEmbed} from "disqus-react"

const DisqusComment = ({ post }) => {
	const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;
	const disqusConfig = {
		url: `${process.env.NEXT_PUBLIC_NEXTJS_SITE_URL}/blog/${post?.slug}`,
		identifier: post.id,
		title: post.title
	}

	return (
		<div>
			<DiscussionEmbed
				shortname={disqusShortname}
				config={disqusConfig}
			/>
		</div>
	)
}

export default DisqusComment;
