import { baseApi } from "../../api/baseApi";

export const manageCompanyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // createSurvey: builder.mutation({
        //     query: (surveyData) => ({
        //         url: `surveys`,
        //         method: "POST",
        //         body: surveyData,
        //     }),
        //     invalidatesTags: ['Survey'],
        // }),
        // deleteSurvey: builder.mutation({
        //     query: (id) => {
        //         console.log("form Api", id);
        //         return {
        //             url: `surveys/${id}`,
        //             method: "DELETE",
        //         };
        //     },
        //     invalidatesTags: ['Survey'],
        // }),
        getCompanySurvey: builder.query({

            query: ({ page, search }) => {
                const query = search ? `?search=${search}` : `?page=${page}`;
                return {
                    url: `questions${query}`,
                    method: "GET",
                }
            },
            // providesTags: ['Survey'],
        }),
        surveyReport: builder.query({
            query: (id) => {
                return {
                    url: `surveys/${id}`,
                    method: "GET",
                }
            },
            providesTags: ['Survey'],
        }),
        updateSurveyQuestion: builder.mutation({
            query: (data) => ({
                url: 'update-questions',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Survey'] 
        }),
        getProjectDetails: builder.query({
            query: ({id, search, page}) => {
                console.log(page)
                console.log(search)
                const searchParams = search ? `&search=${search}` : `?page=${page}`;

                return {
                    url: `/survey-based-user?survey_id=${id}${searchParams}`,
                    method: "GET"
                }
            },
            providesTags: ['GetSurveyUser']
        }),

        deleteSurveyUser: builder.mutation({
            query: (id) => {
                return {
                    url: `delete-survey-user?id=${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ['GetSurveyUser']
        }),
        getArchive : builder.query({
            query : ()=>{
                return {
                    url : 'archive-surveys',
                    method :'GET'
                }
            }
        })

    }),
});

export const { useGetCompanySurveyQuery, useSurveyReportQuery, useUpdateSurveyQuestionMutation, useGetProjectDetailsQuery, useDeleteSurveyUserMutation , useGetArchiveQuery} = manageCompanyApi;
