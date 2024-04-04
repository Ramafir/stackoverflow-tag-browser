import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Pagination from '@/components/Pagination';
import LoggedLayout from '../layouts/LoggedLayout';
import ContractsList from '@/components/ContractList';
import ConfirmDelete from '@/components/ConfirmDelete';
import { index, destroy, setPage } from '@/store/contract/tagsSlice';
import CreateOrEditContract from '@/components/CreateOrEditContract';
const Contracts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { contracts, countPages, numberOfContracts, contractsPerPage } =
        useSelector(state => state.contract);
    const { page } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedContract, setSelectedContract] = useState(null);
    const [
        isCreateOrEditContractDialogOpen,
        setIsCreateOrEditContractDialogOpen
    ] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
            navigate(`/contracts`);
        }

        return page;
    };

    const onChange = async pageNumber => {
        let page = pageNumber || 1;

        if (page !== 1 && contracts[page] === undefined) {
            await dispatch(index(page));
        }

        if (page === 1) {
            await dispatch(index(page));

            navigate(`/contracts`);
        }

        if (page < countPages || countPages === null) {
            await dispatch(index(page + 1));
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
        return Math.ceil(numberOfContracts / contractsPerPage);
    });

    const create = () => {
        setSelectedContract(null);
        setIsCreateOrEditContractDialogOpen(true);
    };

    const confirm = () => {
        dispatch(destroy(selectedContract));
        setIsDeleteDialogOpen(false);
    };

    return (
        <LoggedLayout>
            <div className="text-black">
                <div className="sm:flex sm:items-center mt-5 ml-10">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Contracts
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all employee contracts.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none mr-8">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            onClick={create}
                        >
                            Add contract
                        </button>
                    </div>
                </div>
                <ContractsList
                    contracts={contracts}
                    setSelectedContract={setSelectedContract}
                    setIsCreateOrEditContractDialogOpen={
                        setIsCreateOrEditContractDialogOpen
                    }
                    setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                    page={currentPage}
                />
                <CreateOrEditContract
                    isCreateOrEditContractDialogOpen={
                        isCreateOrEditContractDialogOpen
                    }
                    setIsCreateOrEditContractDialogOpen={
                        setIsCreateOrEditContractDialogOpen
                    }
                    selectedContract={selectedContract}
                    setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                />
                <ConfirmDelete
                    confirm={confirm}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                />
                <Pagination
                    total={numberOfContracts}
                    perPage={contractsPerPage}
                    currentPage={currentPage}
                    setNextPage={setNextPage}
                    setPreviousPage={setPreviousPage}
                />
            </div>
        </LoggedLayout>
    );
};

export default Contracts;
