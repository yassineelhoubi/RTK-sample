import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3030',

}) as any;

export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({})
});