import { baseApi } from "../../api/baseApi";


export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllNotification: builder.query({
            query: (id) => {
                return {
                    url: `company-notifications`,
                    method: "GET",
                }
            }
        }),
        readNotification: builder.query({
            query: (id) => {
                return {
                    url: `read-notification/${id}`,
                    method: "GET",
                }
            }
        }),
    }),
})

export const { useGetAllNotificationQuery, useReadNotificationQuery } = notificationApi;