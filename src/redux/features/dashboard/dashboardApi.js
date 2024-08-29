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
            query: (id) => ({
                url: `delete-employee/${id}`,
                method: 'GET'
            })
        }),
        cancelEmployee: builder.mutation({
            query: (id) => ({
                url: `cancel-delete-employee/${id}`,
                method: 'GET'
            })
        }),
    }),
})

export const { useGetDashboardAnalyticsQuery, useDeleteEmployeeRequestQuery, useDeleteEmployeeMutation, useCancelEmployeeMutation } = dashboardApi;