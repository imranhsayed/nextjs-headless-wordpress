export const PER_PAGE_FIRST = 1;
export const PER_PAGE_REST = 2;

/**
 *
 * @param {String} slug Slug.
 * @returns {string|number}
 */
export const getPageNo = (slug) => {
	if ((slug || []).length < 2) {
		return ''
	}
	let pageNo = 0
	// If the second item in slug is "page" and third item is an integer then we are pulling the page no
	if ((slug?.[1] ?? '') === 'page' && typeof parseInt(slug?.[2] ?? '') === 'number') {
		pageNo = parseInt(slug[2]) || 1
	}

	return pageNo
}

export const getPageOffset = (pageNo) => {
	let offset = 0

	if (pageNo === 1) offset = 0
	else if (pageNo === 2) offset = PER_PAGE_FIRST
	else {
		offset = PER_PAGE_FIRST + (Number(pageNo) - 2) * PER_PAGE_REST
	}
	return offset
}

export const totalPagesCount = (totalPostsCount) => {
	return Math.ceil((totalPostsCount - PER_PAGE_FIRST) / PER_PAGE_REST + 1)
}

