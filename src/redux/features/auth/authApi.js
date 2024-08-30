import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        logInCompany: builder.mutation({
            query: (logInData) => {
                return {
                    url: `login`,
                    method: "POST",
                    body: logInData
                }
            }
        }),
        getProfile: builder.query({
            query: () => {
                return {
                    url: `profile`,
                    method: "GET",
                }
            }
        }),
        updateProfile: builder.mutation({
            query: ({ data }) => {
                return {
                    url: `update-profile`,
                    method: "POST",
                    body: data,
                }
            },
        }),
        updatePassword: builder.mutation({
            query: ({ data }) => {
                return {
                    url: `update-pass`,
                    method: "POST",
                    body: data,
                }
            },
        }),
        setForgetPass: builder.mutation({
            query: (values) => ({
                url: "/forget-pass",
                method: "POST",
                body: values,
            }),
        }),
        setResendCode: builder.mutation({
            query: (resendOtp) => ({
                url: "/resend-otp",
                method: "POST",
                body: resendOtp,
            }),
        }),
        setvarificationCode: builder.mutation({
            query: (otp) => ({
                url: "/email-verified",
                method: "POST",
                body: otp,
            }),
        }),
        setResetPass: builder.mutation({
            query: (values) => ({
                url: "/reset-pass",
                method: "POST",
                body: values,
            }),
        }),

    }),
})

export const { useLogInCompanyMutation, useGetProfileQuery, useUpdateProfileMutation, useUpdatePasswordMutation, useSetForgetPassMutation, useSetResendCodeMutation, useSetvarificationCodeMutation, useSetResetPassMutation } = authApi;