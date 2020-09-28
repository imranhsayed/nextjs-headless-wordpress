import Disqus from "disqus-react"

const DisqusComment = ({ postId }) => {
	const disqusShortname = "imranhsayed"
	const disqusConfig = {
		url: "http://localhost:3000",
		identifier: postId,
		title: "Title of Your Article"
	}

	return (
		<div className="article-container">

			<h1>Page Title</h1>

			<p>Page content.</p>

			<Disqus.DiscussionEmbed
				shortname={disqusShortname}
				config={disqusConfig}
			/>
		</div>
	)
}

export default DisqusComment;
