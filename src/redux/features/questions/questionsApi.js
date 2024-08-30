import { baseApi } from "../../api/baseApi";


export const surveyAPi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createQuestions: builder.mutation({
            query: (questinsData) => {
                return {
                    url: `questions`,
                    method: "POST",
                    body: questinsData,
                }
            }
        }),
        getSurveyBasedQuestion: builder.query({
            query: (id) => {
                return {
                    url: `questions/${id}`,
                    method: "GET",
                }
            }
        }),
        getProjectForManageCompany: builder.query({
            query: ({ page }) => {
                return {
                    url: `projects?page=${page}`,
                    method: "GET",
                }
            }
        }),
        getSurveyForManageCompany: builder.query({
            query: ({ project_id,page }) => {
                return {
                    url: `surveys?project_id=${project_id}&page=${page}`,
                    method: "GET",
                }
            }
        }),

    }),
})

export const { useCreateQuestionsMutation, useGetSurveyBasedQuestionQuery, useGetProjectForManageCompanyQuery, useGetSurveyForManageCompanyQuery } = surveyAPi;