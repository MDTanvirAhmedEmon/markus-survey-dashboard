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
        getAllQuestions: builder.query({
            query: (id) => {
                return {
                    url: `/survey-based-questions?survey_id=${id}`,
                    method: "GET",
                }
            }
        }),
        getQuestionStatistics : builder.query({
            query : ({surveyId , questionId})=>{
                return {
                    url : `/surveys/${surveyId}?question_id=${questionId}`,
                    method  : 'GET'
                }
            }
        })
    })
})

export const { useCreateSettingMutation, useGetPrivacyPolicyQuery, useGetTermsQuery, useGetOverviewQuery  , useGetAllQuestionsQuery , useGetQuestionStatisticsQuery} = settingsApi