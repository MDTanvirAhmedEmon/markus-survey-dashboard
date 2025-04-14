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
        updateSurveyDate : builder.mutation({
            query : ({id,formData})=>{
                console.log(formData);
                return {
                    url : `/surveys/${id}`,
                    method : "POST",
                    body :  formData,
                }
            },
            invalidatesTags: ['Survey'],
        }),
        deleteSurvey: builder.mutation({
            query: (id) => {
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
            query: ({ project_id, survey_id, page }) => {
                return {
                    url: `question-based-report?survey_id=${survey_id}&project_id=${project_id}&page=${page}`,
                    method: "GET",
                }
            },
        }),
        getCsvReport: builder.query({
            query: ({ project_id, survey_id }) => {
                return {
                    url: `/export-survey?survey_id=${survey_id}&project_id=${project_id}`,
                    method: "GET",
                }
            },
        }),
        getAllSurveyComments: builder.query({
            query: ({ id, page, search }) => {

                const url = `question-based-user?question_id=${id}${page ? `&page=${page}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
                return {
                    url: url,
                    method: 'GET',
                };
            },
        }),
        
    }),
});

export const { useCreateSurveyMutation, useGetSurveyQuery, useDeleteSurveyMutation, useGetSurveyResultReportQuery, useGetAllSurveyCommentsQuery, useUpdateSurveyDateMutation  , useGetCsvReportQuery} = surveyApi;
