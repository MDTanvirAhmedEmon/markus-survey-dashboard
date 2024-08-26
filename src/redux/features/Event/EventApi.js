import { baseApi } from "../../api/baseApi";


export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        generateQRCode: builder.mutation({
            query: (id) => {
                console.log("form api",id)
                return {
                    url: `surveys/qrcode/${id}`,
                    method: "POST",
                }
            }
        }),
        getEventWithCRCode: builder.query({
            query: ({page}) => {
                return {
                    url: `surveys-questions?page=${page}`,
                    method: "GET",
                }
            }
        }),
    }),
})


export const { useGenerateQRCodeMutation, useGetEventWithCRCodeQuery } = eventApi;