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
            // providesTags: ['Survey'],
        }),
    }),
});

export const { useGetCompanySurveyQuery, useSurveyReportQuery } = manageCompanyApi;
