import { baseApi } from "../../api/baseApi";


export const surveyAPi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCompany: builder.mutation({
            query: (companyData) => {
                return {
                    url: `companies`,
                    method: "POST",
                    body: companyData,
                }
            },
            invalidatesTags: ['Company'],
        }),
        getCompanies: builder.query({
            query: ({ page, search }) => {
                return {
                    url: `companies?page=${page || 1}&search=${search || ""}`,
                    method: "GET",
                }
            },
            providesTags: ['Company'],
            refetchOnMountOrArgChange: true,
        }),
        getTrashCompany: builder.query({
            query: ({ page }) => ({
                url: `show-trash-users?per_page=${page}`,
                method: 'GET'

            }),
            providesTags : ['trashCompany']
        }),
        deletCompanyPermanently: builder.mutation({
            query: (id) => {
                return {
                    url: `/delete-user-permanently/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags : ['trashCompany']
        }),
        updateCompanies: builder.mutation({
            query: ({ data, id }) => {
                return {
                    url: `companies/${id}`,
                    method: "POST",
                    body: data,
                }
            },
            invalidatesTags: ['Company'],
        }),
        // Survey Mutation:
        postSurveyQn: builder.mutation({
            query: (data) => ({
                url: "/anonymous-surveys",
                method: "POST",
                body: data,
            }),
        }),
        getSurveyQN: builder.query({
            query: (barcode) => `/single-surveys-questions/${barcode}`,
        }),
        deleteCompanies: builder.mutation({
            query: (id) => {
                return {
                    url: `companies/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['Company'],
        }),

        getAllQnAns: builder.query({
            query: (survey_id) => `/anonymous-survey-report?survey_id=${survey_id}`,
        }),
        getSurveyBasedInfo: builder.query({
            query: (id) => {
                return {
                    url: `anonymous-survey-report?survey_id=${id}`,
                    method: "GET",
                }
            },
        }),

        getAdmin: builder.query({
            query: () => ({
                url: 'admins',
                method: 'GET'
            }),
            providesTags: ['admin']
        }),
        deletAdmin: builder.mutation({
            query: (id) => {
                return {
                    url: `/admins/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['admin']
        }),
        createAdmins: builder.mutation({
            query: (data) => {
                return {
                    url: '/admins',
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ['admin']
        }),



    }),
})

export const { useCreateCompanyMutation, useGetCompaniesQuery, useUpdateCompaniesMutation, useDeleteCompaniesMutation, useGetSurveyQNQuery, usePostSurveyQnMutation, useGetAllQnAnsQuery, useGetSurveyBasedInfoQuery, useGetAdminQuery, useDeletAdminMutation, useCreateAdminsMutation, useGetTrashCompanyQuery , useDeletCompanyPermanentlyMutation } = surveyAPi;