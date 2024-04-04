import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';

import TagsList from '@/components/TagsList';
import Pagination from '@/components/Pagination';
import SortControls from '@/components/SortControl';
import { setPage, index, setOrderBy, setSortBy } from '@/store/tags/tagsSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        tags,
        countPages,
        numberOfTags,
        tagsPerPage,
        orderBy,
        sortBy
    } = useSelector(state => state.tags);
    const { page } = useParams();

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(validatePage(page));
    }, [page]);

    useEffect(() => {
        dispatch(setPage(currentPage));

        onChange(page, tagsPerPage, orderBy, sortBy);
    }, [orderBy, sortBy]);

    const validatePage = number => {
        const page = parseInt(number) || 1;

        if (isNaN(page) || page <= 1) {
            navigate(`/`);
        }

        return page;
    };

    const onChange = async (pageNumber, tagsPerPage, orderBy, sortBy) => {
        let page = pageNumber || 1;

        if (page !== 1 && tags[page] === undefined) {
            await dispatch(index({ page, tagsPerPage, orderBy, sortBy }));
        }

        if (page === 1) {
            await dispatch(index({ page, tagsPerPage, orderBy, sortBy }));

            navigate(`/`);
        }

        if (page < countPages || countPages === null) {
            await dispatch(
                index({ page: page + 1, tagsPerPage, orderBy, sortBy })
            );
        }

        dispatch(setPage(page));
    };

    const setNextPage = () => {
        let page = currentPage;

        if (currentPage > 0 && currentPage < lastPage) {
            page = page + 1;

            setCurrentPage(validatePage(page));

            onChange(page);
        }
    };

    const setPreviousPage = () => {
        let page = currentPage;

        if (currentPage > 0 && currentPage <= lastPage) {
            page = page - 1;

            setCurrentPage(validatePage(page));

            onChange(page);
        }
    };

    const lastPage = useMemo(() => {
        return Math.ceil(numberOfTags / tagsPerPage);
    });

    return (
        <div className="text-black">
            <div className="sm:flex sm:items-center mt-5 ml-10">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Tags
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all tags.
                    </p>
                </div>
            </div>
            <SortControls
                orderBy={orderBy}
                sortBy={sortBy}
                setOrderBy={(value) => dispatch(setOrderBy(value))}
                setSortBy={(value) => dispatch(setSortBy(value))}
            />
            <TagsList
                tags={tags}
                page={currentPage}
                orderBy={orderBy}
                sortBy={sortBy}
            />
            <Pagination
                total={numberOfTags}
                perPage={tagsPerPage}
                currentPage={currentPage}
                setNextPage={setNextPage}
                setPreviousPage={setPreviousPage}
            />
        </div>
    );
};

export default Dashboard;
