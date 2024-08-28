import { baseApi } from "../../api/baseApi";


export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        generateQRCode: builder.mutation({
            query: (id) => {

                return {
                    url: `surveys/qrcode/${id}`,
                    method: "POST",
                }
            },
            invalidatesTags: ['Event'],
        }),
        deleteQRCode: builder.mutation({
            query: (id) => {
                return {
                    url: `delete-event?id=${id}`,
                    method: "GET",
                }
            },
            invalidatesTags: ['Event'],
        }),
        getEventWithCRCode: builder.query({
            query: ({ page, search = '' }) => {
                return {
                    url: `surveys-questions?page=${page}${search ? `&search=${search}` : ''}`,
                    method: "GET",
                };
            },
            providesTags: ['Event'],
        })
    }),
})


export const { useGenerateQRCodeMutation, useGetEventWithCRCodeQuery, useDeleteQRCodeMutation } = eventApi;