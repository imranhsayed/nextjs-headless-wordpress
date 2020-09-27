import Link from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { getPageNo } from "../../../utils/pagination";

const Pagination = ({ pagesCount, postName }) => {
	if (!pagesCount || !postName) {
		return null
	}

	const router = useRouter()
	let pageNo = getPageNo(router.query.slug)
	pageNo = pageNo || 1

	return (
		<div className='flex justify-center my-8'>
			{new Array(pagesCount).fill().map((_, index) => {
				// If its page no. one,
				const linkAs = index === 0 ? `/${postName}/` : `/${postName}/page/${index + 1}/`
				console.warn( 'linksAs', linkAs );
				return (
					<Link key={`id-${index}`} href="/blog/page/[page_no]" as={linkAs}>
						<a className={`border border-gray-300 px-3 py-2 ${(index + 1) === pageNo ? 'is-active bg-gray-300 text-white' : ''}`}>
							{index + 1}
						</a>
					</Link>
				)
			})}
		</div>
	)
}

Pagination.propTypes = {
	pagesCount: PropTypes.number,
	postName: PropTypes.string
}

Pagination.defaultProps = {
	pagesCount: 0,
	postName: 'reviews'
}

export default Pagination
