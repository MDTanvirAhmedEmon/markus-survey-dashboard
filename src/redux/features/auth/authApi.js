import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        logInCompany: builder.mutation({
            query: (logInData) => {
                return {
                    url: `login`,
                    method: "POST",
                    body: logInData
                }
            }
        }),
        getProfile: builder.query({
            query: () => {
                return {
                    url: `profile`,
                    method: "GET",
                }
            }
        }),
        updateProfile: builder.mutation({
            query: ({ data }) => {
                return {
                    url: `update-profile`,
                    method: "POST",
                    body: data,
                }
            },
        }),
        updatePassword: builder.mutation({
            query: ({ data }) => {
                return {
                    url: `update-pass`,
                    method: "POST",
                    body: data,
                }
            },
        }),

    }),
})

export const { useLogInCompanyMutation, useGetProfileQuery, useUpdateProfileMutation,useUpdatePasswordMutation } = authApi;