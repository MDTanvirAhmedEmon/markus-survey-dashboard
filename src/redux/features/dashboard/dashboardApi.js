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
    }),
})

export const { useGetDashboardAnalyticsQuery } = dashboardApi;