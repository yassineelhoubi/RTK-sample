import React, { useEffect } from 'react'
import { useGetUsersQuery } from '../app/services/users'


function User() {

    const { data, isLoading, error } = useGetUsersQuery();
    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <div>User</div>
    )
}

export { User }