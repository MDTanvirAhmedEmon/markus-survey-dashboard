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
            query: ({page}) => {
                return {
                    url: `surveys?page=${page}`,
                    method: "GET",
                }
            },
            providesTags: ['Survey'],
        }),
    }),
});

export const { useCreateSurveyMutation, useGetSurveyQuery, useDeleteSurveyMutation } = surveyApi;
