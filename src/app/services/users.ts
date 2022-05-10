import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

interface User {
    _id: string;
    fName: string;
    lName: string;
    email: string;
    cin: string;
    phone: string;
    accountNumber: number;
    PIN: number;
    ccn: number;
    balance: number;
}

type users = User[];


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3030',

}) as any;

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery,
    tagTypes: ['Users'],
    endpoints: (build) => ({
        // getUsers:build('/users'),
        getUsers: build.query<users, void>({
            query: () => ({ url: "/user" }),
        })
    })
});

export const { useGetUsersQuery } = userApi;