import { useMemo } from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
    total,
    currentPage,
    perPage,
    setNextPage,
    setPreviousPage
}) => {
    const recordsFrom = useMemo(() => {
        return currentPage * perPage - perPage + 1;
    });

    const recordsTo = useMemo(() => {
        let to = currentPage * perPage;

        if (to > total) {
            to = total;
        }

        return to;
    });

    return (
        <div
            className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mr-8 ml-8 rounded"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{recordsFrom}</span>{' '}
                    to <span className="font-medium">{recordsTo}</span> of{' '}
                    <span className="font-medium">{total}</span> results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                <button
                    onClick={setPreviousPage}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Previous
                </button>
                <button
                    onClick={setNextPage}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    perPage: PropTypes.number,
    total: PropTypes.number,
    setNextPage: PropTypes.func,
    setPreviousPage: PropTypes.func
};

export default Pagination;
