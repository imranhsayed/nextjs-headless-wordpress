import {isEmpty} from 'lodash';
import Link from "next/link";
const Next = ({currentPageNo, pagesCount, postName}) => {

    if ( ! currentPageNo || ! pagesCount || isEmpty( postName ) ) {
        return null;
    }

    // If you are on the last page, dont show next link.
    if ( pagesCount < currentPageNo + 1 ) {
        return null;
    }

    const paginationLink = `/${postName}/page/${currentPageNo + 1}/`;

    return (
        <Link href={paginationLink}>
            <a className="border border-gray-300 px-3 py-2 ml-4 transition duration-500 ease-in-out hover:bg-gray-500 hover:text-white">Next</a>
        </Link>
    )
}

export default Next
