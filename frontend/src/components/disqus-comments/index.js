import Disqus from "disqus-react"

const DisqusComment = ({ post }) => {
	const disqusShortname = "imranhsayed"
	const disqusConfig = {
		url: "http://localhost:3000",
		identifier: post.id,
		title: post.title
	}

	return (
		<div>
			<Disqus.DiscussionEmbed
				shortname={disqusShortname}
				config={disqusConfig}
			/>
		</div>
	)
}

export default DisqusComment;
