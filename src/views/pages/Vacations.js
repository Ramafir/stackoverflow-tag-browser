import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useMemo } from 'react';

import Pagination from '@/components/Pagination';
import LoggedLayout from '../layouts/LoggedLayout';
import VacationList from '@/components/VacationList';
import ConfirmDelete from '@/components/ConfirmDelete';
import CreateOrEditVacation from '@/components/CreateOrEditVacation';
import {
    index,
    destroy,
    approve,
    setPage
} from '@/store/vacation/vacationSlice';

const Vacations = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page } = useParams();

    const { vacations, vacationsPerPage, numberOfVacations, countPages } =
        useSelector(state => state.vacation);

    const [
        isCreateOrEditVacationDialogOpen,
        setIsCreateOrEditVacationDialogOpen
    ] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedVacation, setSelectedVacation] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(validatePage(page));
    }, [page]);

    useEffect(() => {
        dispatch(setPage(currentPage));

        onChange(page);
    }, []);

    const validatePage = number => {
        const page = parseInt(number) || 1;

        if (isNaN(page) || page <= 1) {
            navigate(`/vacations`);
        }

        return page;
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
        return Math.ceil(numberOfVacations / vacationsPerPage);
    });

    const create = () => {
        setIsCreateOrEditVacationDialogOpen(true);
    };

    const confirm = () => {
        dispatch(destroy(selectedVacation));
        setIsDeleteDialogOpen(false);
    };

    const approveVacation = vacation => {
        dispatch(approve(vacation));
    };

    const onChange = async pageNumber => {
        let page = pageNumber || 1;

        if (page !== 1 && vacations[page] === undefined) {
            await dispatch(index(page));
        }

        if (page === 1) {
            await dispatch(index(page));

            navigate(`/vacations`);
        }

        if (page < countPages || countPages === null) {
            await dispatch(index(page + 1));
        }

        dispatch(setPage(page));
    };

    return (
        <LoggedLayout>
            <div className="black">
                <div className="sm:flex sm:items-center mt-5 ml-10">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Vacations
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all employee vacations.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none mr-8">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            onClick={create}
                        >
                            Add vacation
                        </button>
                    </div>
                </div>
                <CreateOrEditVacation
                    isCreateOrEditVacationDialogOpen={
                        isCreateOrEditVacationDialogOpen
                    }
                    setIsCreateOrEditVacationDialogOpen={
                        setIsCreateOrEditVacationDialogOpen
                    }
                    selectedVacation={selectedVacation}
                    setSelectedVacation={setSelectedVacation}
                />
                <VacationList
                    vacations={vacations}
                    setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                    setSelectedVacation={setSelectedVacation}
                    setIsCreateOrEditVacationDialogOpen={
                        setIsCreateOrEditVacationDialogOpen
                    }
                    approveVacation={approveVacation}
                    page={currentPage}
                />
                <ConfirmDelete
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                    confirm={confirm}
                />
                <Pagination
                    total={numberOfVacations}
                    perPage={vacationsPerPage}
                    currentPage={currentPage}
                    setPreviousPage={setPreviousPage}
                    setNextPage={setNextPage}
                />
            </div>
        </LoggedLayout>
    );
};

export default Vacations;
