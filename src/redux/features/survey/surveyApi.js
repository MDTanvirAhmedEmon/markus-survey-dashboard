import { baseApi } from "../../api/baseApi";

export const surveyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSurvey: builder.mutation({
            query: (surveyData) => ({
                url: `surveys`,
                method: "POST",
                body: surveyData,
            }),
            invalidatesTags: ['Survey'],
        }),
        deleteSurvey: builder.mutation({
            query: (id) => {
                console.log("form Api", id);
                return {
                    url: `surveys/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ['Survey'],
        }),
        getSurvey: builder.query({
            query: ({ page }) => {
                return {
                    url: `surveys?page=${page}`,
                    method: "GET",
                }
            },
            providesTags: ['Survey'],
        }),
        getSurveyResultReport: builder.query({
            query: ({ project_id, survey_id }) => {
                return {
                    url: `question-based-report?survey_id=${survey_id}&project_id=${project_id}`,
                    method: "GET",
                }
            },
        }),
        getAllSurveyComments: builder.query({
            query: (id) => {
                return {
                    url: `question-based-user?question_id=${id}`,
                    method: "GET",
                }
            },
        }),
    }),
});

export const { useCreateSurveyMutation, useGetSurveyQuery, useDeleteSurveyMutation, useGetSurveyResultReportQuery, useGetAllSurveyCommentsQuery } = surveyApi;
