export const PER_PAGE_FIRST = 1; // No of posts to be shown on first page.
export const PER_PAGE_REST = 2; // No of posts to be shown following page and after.

export const getPageOffset = (pageNo) => {

	/**
	 * Offset is how many posts are already shown ( meaning, after how many posts should we start qurying ).
	 * @type {number}
	 */
    let offset = 0;
    pageNo = Number(pageNo);
    if (pageNo === 1) offset = 0;
    else if (pageNo === 2) offset = PER_PAGE_FIRST;
    else {
        offset =  PER_PAGE_FIRST + ( ( pageNo -  2 )  * PER_PAGE_REST );
    }
    return offset;
};

export const totalPagesCount = (totalPostsCount) => {
    return Math.ceil((totalPostsCount - PER_PAGE_FIRST) / PER_PAGE_REST + 1);
};
