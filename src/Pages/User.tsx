
import { useGetUsersQuery } from '../app/services/users'
import { ColumnTable } from '../interfaces';
import { TableData } from '../components';
import React, { useEffect, useState } from 'react';


import { Button } from '@mui/material';
import CreateUserContainer from '../components/CreateUser';
import { useAppDispatch } from '../app/hooks';
import { setUsers } from '../app/features/userSlice';


function User() {

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const refetch = () => {
        console.log("refetch")
    };
    const { data, isLoading, error } = useGetUsersQuery();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (data) {
            // dispatch(setUsers(data))
            console.log(data)
        }
    }, [error, data])

    const columns: ColumnTable[] = [
        { id: 'fName', label: 'First Name' },
        { id: 'lName', label: 'Last Name' },
        { id: 'cin', label: 'CIN' },
        { id: 'balance', label: 'Balance' }
    ]

    return (
        <div>
            <Button onClick={() => setShowModal(true)} variant="contained" color="primary">
                New User
            </Button>
            <h1>users</h1>

            <CreateUserContainer showModal={showModal} handleCloseModal={handleCloseModal} refetch={refetch} />
            {data && <TableData data={data} columns={columns} />}

        </div>
    )
}

export { User }