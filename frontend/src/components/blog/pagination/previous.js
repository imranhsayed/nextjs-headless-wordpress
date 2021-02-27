import {isEmpty} from 'lodash';
import Link from 'next/link';

const Previous = ( {currentPageNo, postName} ) => {

	if ( ! currentPageNo || isEmpty( postName ) ) {
		return null;
	}

	// If you are on the first page, dont show previous link.
	if ( 0 === currentPageNo - 1 ) {
		return null;
	}

	const paginationLink = `/${postName}/page/${currentPageNo - 1}/`;

	return (
		<Link href={paginationLink}>
			<a className="border border-gray-300 px-3 py-2 mr-4 transition duration-500 ease-in-out hover:bg-gray-500 hover:text-white">Previous</a>
		</Link>
	);
};

export default Previous;
