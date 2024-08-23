import { baseApi } from "../api/baseApi";

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProject: builder.mutation({
            query: (projectData) => {
                return {
                    url: `projects`,
                    method: "POST",
                    body: projectData,
                }
            },
            invalidatesTags: ['Project'], 
        }),
        deleteProject: builder.mutation({
            query: (projectId) => {
                return {
                    url: `projects/${projectId}`,
                    method: "DELETE",
                    // headers: {
                    //     authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    // }
                }
            },
            invalidatesTags: ['Project'], 
        }),

        getProjects: builder.query({
            query: ({page, search}) => {
                
                const query = search ? `?search=${search}` : `?page=${page}`;
                return {
                    url: `projects${query}`,
                    method: "GET",
                }
            },
            providesTags: ['Project'], 
        }),
    }),
})

export const { useCreateProjectMutation, useGetProjectsQuery, useDeleteProjectMutation } = projectApi;