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
        deleteEmployeeRequest :  builder.query({
            query : ()=> ({
                url : "delete-employee-request",
                method : 'GET'
            })
        }),
        deleteEmployee :  builder.query({
            query : (id)=> ({
                url : `delete-employee-request/${id}`,
                method : 'GET'
            })
        })
    }),
})

export const { useGetDashboardAnalyticsQuery , useDeleteEmployeeRequestQuery, useDeleteEmployeeQuery } = dashboardApi;