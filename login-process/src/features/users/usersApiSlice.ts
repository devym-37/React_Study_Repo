import { apiSlice } from "../../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetUsersQuery } = usersApiSlice;
