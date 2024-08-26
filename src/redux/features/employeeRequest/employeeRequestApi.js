import { baseApi } from "../../api/baseApi";


export const employeeRequestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeeRequest: builder.query({
            query: () => {
                return {
                    url: `show-request`,
                    method: "GET",
                }
            }
        }),
        acceptRequest: builder.mutation({
            query: (data) => {
                return {
                    url: `accept-request`,
                    method: "POST",
                    body: data,
                }
            }
        }),
    }),
})

export const { useGetEmployeeRequestQuery, useAcceptRequestMutation } = employeeRequestApi;