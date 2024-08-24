import { baseApi } from "../../api/baseApi";


export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        generateQRCode: builder.mutation({
            query: (id) => {
                console.log(id)
                return {
                    url: `surveys/qrcode/${id}`,
                    method: "POST",
                }
            }
        }),
        // getSurveyBasedQuestion: builder.query({
        //     query: (id) => {
        //         return {
        //             url: `questions/${id}`,
        //             method: "GET",
        //         }
        //     }
        // }),


    }),
})

export const { useGenerateQRCodeMutation } = eventApi;