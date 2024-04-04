import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useMemo } from 'react';

import UserList from '@/components/UserList';
import Pagination from '@/components/Pagination';
import LoggedLayout from '../layouts/LoggedLayout';
import ConfirmDelete from '@/components/ConfirmDelete';
import CreateOrEditUser from '@/components/CreateOrEditUser';
import { index, destroy, setPage } from '@/store/user/userSlice';

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page } = useParams();
    const [isCreateOrEditUserDialogOpen, setIsCreateOrEditUserDialogOpen] =
        useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { users, countPages, numberOfUsers, usersPerPage } = useSelector(
        state => state.user
    );
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
            navigate(`/users`);
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
        return Math.ceil(numberOfUsers / usersPerPage);
    });

    const create = () => {
        setSelectedUser(null);
        setIsCreateOrEditUserDialogOpen(true);
    };

    const confirm = () => {
        dispatch(destroy(selectedUser.id));
        setIsDeleteDialogOpen(false);
    };

    const onChange = async pageNumber => {
        let page = pageNumber || 1;

        if (page !== 1 && users[page] === undefined) {
            await dispatch(index(page));
        }

        if (page === 1) {
            await dispatch(index(page));

            navigate(`/users`);
        }

        if (page < countPages || countPages === null) {
            await dispatch(index(page + 1));
        }

        dispatch(setPage(page));
    };

    return (
        <LoggedLayout>
            <div className="text-black">
                <div className="sm:flex sm:items-center mt-5 ml-10">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Employees
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your employees including
                            their name, email and vacation days.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none mr-8">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            onClick={create}
                        >
                            Add user
                        </button>
                    </div>
                </div>
                <UserList
                    users={users}
                    setSelectedUser={setSelectedUser}
                    setIsCreateOrEditUserDialogOpen={
                        setIsCreateOrEditUserDialogOpen
                    }
                    setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                    page={currentPage}
                />
                <CreateOrEditUser
                    isCreateOrEditUserDialogOpen={isCreateOrEditUserDialogOpen}
                    setIsCreateOrEditUserDialogOpen={
                        setIsCreateOrEditUserDialogOpen
                    }
                    selectedUser={selectedUser}
                />
                <ConfirmDelete
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                    confirm={confirm}
                />
                <Pagination
                    total={numberOfUsers}
                    perPage={usersPerPage}
                    currentPage={currentPage}
                    setNextPage={setNextPage}
                    setPreviousPage={setPreviousPage}
                />
            </div>
        </LoggedLayout>
    );
};

export default Users;
