import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
// import {User} from '../../interfaces';
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
        }),
        addUser: build.mutation<User, Partial<User>>({
            query: (body) => ({
                url: '/user',
                method: 'POST',
                body
            })
        }),

    })
});

export const { useGetUsersQuery, useAddUserMutation } = userApi;