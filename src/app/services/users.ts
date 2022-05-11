import { api } from '../api';
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

const apiWithTags = api.enhanceEndpoints({ addTagTypes: ['Users'] });

export const userApi = apiWithTags.injectEndpoints({

    endpoints: (builder) => ({
        getUsers: builder.query<users, void>({
            query: () => ({ url: "/user" }),
            providesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        addUser: builder.mutation<User, Partial<User>>({
            query: (body) => ({
                url: '/user',
                method: 'POST',
                body
            })
        }),
        getUserById: builder.query<User, string>({
            query: (id) => ({
                url: `/user/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: 'Users', id }]
        }),

    })
});

export const { useGetUsersQuery, useAddUserMutation, useGetUserByIdQuery } = userApi;