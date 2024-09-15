import { baseApi } from "../../api/baseApi";


export const employeeRequestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeeRequest: builder.query({
            query: () => {
                return {
                    url: `show-request`,
                    method: "GET",
                }
            },
            providesTags : ['employeeRequest']
        }),
        getProjectsForSurveyRequest: builder.query({
            query: ({ page }) => ({
                url: `projects`,
                method: "GET",
                params: {
                    page,
                    per_page: 9
                },
            }),
        }),
        acceptRequest: builder.mutation({
            query: (data) => {
                return {
                    url: `accept-request`,
                    method: "POST",
                    body: data,
                }
            },
            invalidatesTags : ['employeeRequest']
        }),
        editUserRequest : builder.query({
            query : (id)=>{
                return {
                    url : `show-assign-projects/${id}`,
                    method : 'GET'
                }
            }
        }) ,
        assignProject : builder.mutation({
            query : (data)=>{
                return {
                    url : 'assign-projects',
                    method : 'POST',
                    body : data
                }
            }
        })
    }),
})

export const { useGetEmployeeRequestQuery, useAcceptRequestMutation, useGetProjectsForSurveyRequestQuery, useEditUserRequestQuery , useAssignProjectMutation } = employeeRequestApi;