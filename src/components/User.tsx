import React, { useEffect } from 'react'
import { useGetUsersQuery } from '../app/services/users'
import { ColumnTable } from '../interfaces';
import { TableData } from './TableData';


function User() {

    const { data, isLoading, error } = useGetUsersQuery();
    useEffect(() => {
        console.log(data);
    }, [data]);

    const columns: ColumnTable[] = [
        { id: 'fName', label: 'First Name' },
        { id: 'lName', label: 'Last Name' },
        { id: 'cin', label: 'CIN' },
        { id: 'balance', label: 'Balance' }
    ]


    return (
        <div>
            <h1>users</h1>


            {data && <TableData data={data} columns={columns} />}

        </div>
    )
}

export { User }