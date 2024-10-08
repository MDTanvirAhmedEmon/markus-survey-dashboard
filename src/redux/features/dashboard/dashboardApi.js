import { baseApi } from "../../api/baseApi"

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getDashboardAnalytics: builder.query({
            query: () => {
                return {
                    url: `company-dashboard`,
                    method: "GET",
                }
            }
        }),
        deleteEmployeeRequest: builder.query({
            query: () => ({
                url: "delete-employee-request",
                method: 'GET'
            })
        }),
        deleteEmployee: builder.mutation({

            query: (id) => {

                return {
                    url: `delete-employee/${id}`,
                    method: "GET",
                }
            },
        }),
        cancelEmployee: builder.mutation({
            query: (id) => {
                return {
                    url: `cancel-delete-employee/${id}`,
                    method: "GET",
                }
            },
        }),
        getSuperAdminAnalytics :  builder.query({
            query : ()=>{
                return {
                    url : 'admin-dashboard',
                    method : 'GET'
                }
            }
        })
    }),
})

export const {useGetSuperAdminAnalyticsQuery, useGetDashboardAnalyticsQuery, useDeleteEmployeeRequestQuery, useDeleteEmployeeMutation, useCancelEmployeeMutation } = dashboardApi;