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

    }),
})

export const { useLogInCompanyMutation, useGetProfileQuery } = authApi;