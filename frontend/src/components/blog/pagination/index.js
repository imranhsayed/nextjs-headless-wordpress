import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

const Pagination = ({ pagesCount, postName }) => {
    if (!pagesCount || !postName) {
        return null;
    }

    const router = useRouter();
    let pageNo = parseInt( router.query.pageNo );
    pageNo = pageNo || 1;

    return (
        <div className="flex justify-center my-8">
            {new Array(pagesCount).fill(null).map((_, index) => {
                //! Will need to handle this on page itself
                // index === 0 ? `/${postName}/` :

                const paginationLink = `/${postName}/page/${index + 1}`;

                return (
                    <Link key={`id-${index}`} href={paginationLink}>
                        <a
                            className={`border border-gray-300 px-3 py-2 ${
                                index + 1 === pageNo ? "is-active bg-gray-300 text-white" : ""
                            }`}
                        >
                            {index + 1}
                        </a>
                    </Link>
                );
            })}
        </div>
    );
};

Pagination.propTypes = {
    pagesCount: PropTypes.number,
    postName: PropTypes.string,
};

Pagination.defaultProps = {
    pagesCount: 0,
    postName: "blog",
};

export default Pagination;
