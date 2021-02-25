/**
 * Create Fixed Block Pagination Links Array.
 *
 * Example: [1, "...", 521, 522, 523, 524, 525, "...", 529]
 *
 * @param {int} currentPage Current page no.
 * @param {int} totalPages Count of total no of pages.
 * @return {Array} Array containing the indexes to be looped through to create pagination
 */
export const createFixedBlockPaginationLinks = (currentPage, totalPages) => {
    const paginationArray = []
    let countOfDotItems = 0

    // If there is only one page, return an empty array.
    if (!totalPages && totalPages <= 1) {
        return paginationArray
    }

    /**
     * Push the two index items before the current page.
     */
    if (currentPage - 2 > 0) {
        paginationArray.push(currentPage - 2)
    }

    if (currentPage - 1 > 0) {
        paginationArray.push(currentPage - 1)
    }

    // Push the current page index item.
    paginationArray.push(currentPage)

    /**
     * Push the two index items after the current page.
     */
    if (totalPages >= currentPage + 1) {
        paginationArray.push(currentPage + 1)
    }

    if (totalPages >= currentPage + 2) {
        paginationArray.push(currentPage + 2)
    }

    /**
     * Push the '...' at the beginning of the array
     * only if the difference of between the 1st and 2nd index item is greater than 1.
     */
    if (paginationArray[0] - 1 > 1) {
        paginationArray.unshift('...')
        countOfDotItems += 1
    }

    /**
     * Push the '...' at the end of the array.
     * only if the difference of between the last and 2nd last item is greater than 2.
     * We remove the count of dot items from the array to get the actual indexes, while checking the condition.
     */
    if (totalPages - paginationArray[paginationArray.length - (2 - countOfDotItems)] > 2) {
        paginationArray.push('...')
    }

    // Push first index item in the array if it does not already exists.
    if (paginationArray.indexOf(1) === -1) {
        paginationArray.unshift(1)
    }

    // Push last index item in the array if it does not already exists.
    if (paginationArray.indexOf(totalPages) === -1) {
        paginationArray.push(totalPages)
    }

    return paginationArray
}
