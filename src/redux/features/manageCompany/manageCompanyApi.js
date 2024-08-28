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
            
            query: ({page, search}) => {
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
                console.log('api slice form',id)
                return {
                    url: `surveys/${id}`,
                    method: "GET",
                }
            },
            providesTags: ['Survey'],
        }),
        updateSurveyQuestion :  builder.mutation({
            query :  (data)=>({
                url : 'update-questions',
                method : "POST",
                body : data
            }),
            invalidatesTags : ['Survey']
        }),
        getProjectDetails : builder.query({
            query : (id)=>({
                url : `/survey-based-user?survey_id=${id}`,
                method : "GET"
            }),
            providesTags : ['GetSurveyUser']
        }),
        
        deleteSurveyUser : builder.mutation({
            query : (id) => ({
                url : `delete-survey-user?id=${id}`,
                method : "DELETE"
            }),
            invalidatesTags : ['GetSurveyUser']
        })

    }),
});

export const { useGetCompanySurveyQuery, useSurveyReportQuery, useUpdateSurveyQuestionMutation, useGetProjectDetailsQuery, useDeleteSurveyUserMutation } = manageCompanyApi;
