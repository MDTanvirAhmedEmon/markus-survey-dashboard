import { baseApi } from "../../api/baseApi";


export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        getAllNotification: builder.query({
            query: () => {
                return {
                    url: `company-notifications`,
                    method: "GET",
                }
            },
            providesTags: ['Notification'],
        }),
        readNotification: builder.query({
            query: (id) => {
                return {
                    url: `read-notification/${id}`,
                    method: "GET",
                }
            },
            invalidatesTags: ['Notification'],
        }),
    }),
})

export const { useGetAllNotificationQuery, useReadNotificationQuery } = notificationApi;