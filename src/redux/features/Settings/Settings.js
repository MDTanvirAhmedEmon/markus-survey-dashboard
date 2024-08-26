import { baseApi } from "../../api/baseApi";

export const settingsApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        createSetting: builder.mutation({
            query: (data) => {
                return {
                    url: `update-apt`,
                    method: "POST",
                    body: data,
                }
            },
            invalidatesTags: ['Settings'],
        }),
        getPrivacyPolicy: builder.query({
            query: () => {
                return {
                    url: `privacy-policy`,
                    method: "GET",
                }
            },
            providesTags: ['Settings'],
        }),
        getTerms: builder.query({
            query: () => {
                return {
                    url: `terms-condition`,
                    method: "GET",
                }
            },
            providesTags: ['Settings'],
        }),
        getOverview: builder.query({
            query: () => {
                return {
                    url: `admin-dashboard`,
                    method: "GET",
                }
            },
            providesTags: ['admin-dashboard'],
        }),
    })
})

export const { useCreateSettingMutation, useGetPrivacyPolicyQuery, useGetTermsQuery, useGetOverviewQuery } = settingsApi