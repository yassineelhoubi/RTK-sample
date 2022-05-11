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
        updateUser: builder.mutation<User, Pick<User, '_id'> & Partial<User>>({
            query: ({ _id, ...body }) => ({
                url: `/user/${_id}`,
                method: 'PATCH',
                body
            }),
            async onQueryStarted({ _id, ...body }, { dispatch, queryFulfilled }) {
                const getUserByIdPatch = dispatch(
                    userApi.util.updateQueryData('getUserById', _id, (user) => ({ ...user, ...body }))

                )
                const getAllUsersPatch = dispatch(
                    userApi.util.updateQueryData('getUsers', undefined, (users) => {
                        const index = users.findIndex((user) => user._id === _id);
                        if (index > -1) {
                            users[index] = { ...users[index], ...body };
                        }
                        return users;
                    }
                    )
                )

                try {
                    await queryFulfilled;
                } catch (e) {
                    console.log(e);
                    getUserByIdPatch.undo();
                    getAllUsersPatch.undo();
                }
            }

        }),


    })
});

export const { useGetUsersQuery, useAddUserMutation, useGetUserByIdQuery, useUpdateUserMutation } = userApi;