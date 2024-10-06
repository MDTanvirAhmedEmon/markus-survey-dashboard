import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, Spin } from "antd";
import Swal from "sweetalert2";
import { useSetResendCodeMutation, useSetvarificationCodeMutation } from "../../redux/features/auth/authApi";


const Otp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const storedEmail = localStorage.getItem("myEmail");

    const [setVerificationCode, { isLoading: isVerifying }] =
        useSetvarificationCodeMutation();
    const [setResendOtp, { isLoading: isResending }] = useSetResendCodeMutation();

    const handleVerifyOtp = async () => {
        try {
            const response = await setVerificationCode({ otp }).unwrap();
            console.log("Verification successful:", response);

            Swal.fire({
                title: "Success!",
                text: "OTP verification successful.",
                icon: "success",
                confirmButtonText: "OK",
            });

            if (response) {
                navigate("/auth/update-password");
            }
        } catch (error) {
            console.error("Verification failed:", error);
            Swal.fire({
                title: "Error!",
                text: "OTP verification failed. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleResendOtp = async () => {
        try {
            const formData = new FormData();
            formData.append("email", storedEmail);
            const response = await setResendOtp(formData).unwrap();
            console.log("OTP resent successfully:", response);

            Swal.fire({
                title: "Success!",
                text: "OTP has been resent successfully.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#ECB206",
            });
        } catch (error) {
            
            Swal.fire({
                title: "Error!",
                text:
                    error.data?.message ||
                    "An unexpected error occurred. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#ECB206",

            });
        }
    };

    if (isVerifying || isResending) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div
            style={{
                width: "100%",
                background: "#BD8E05",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{ width: "630px", background: "white", padding: "90px 57px" }}
            >
                <h1
                    style={{
                        fontSize: "32px",
                        color: "#6A6D7C",
                        marginBottom: "13px",
                        textAlign: "center",
                    }}
                >
                    Check your email
                </h1>
                <p
                    style={{ width: "380px", color: "#B8B8B8", margin: "0 auto 0 auto" }}
                >
                    We sent a reset link to{" "}
                    <span style={{ color: "#545454" }}>{storedEmail}</span>. Enter the
                    6-digit code mentioned in the email.
                </p>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "30px",
                    }}
                    className="py-7"
                >
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputStyle={{
                            height: "44px",
                            width: "44px",
                            borderRadius: "8px",
                            marginRight: "16px",
                            fontSize: "20px",
                            border: "1px solid #A9A9A9",
                            color: "#2B2A2A",
                            outline: "none",
                        }}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
                <Button
                    onClick={handleVerifyOtp}
                    block
                    htmlType="submit"
                    style={{
                        height: "52px",
                        fontWeight: "400px",
                        fontSize: "18px",
                        color: "white",
                        background: "#ECB206",
                        marginTop: "30px",
                        border: "none",
                        outline: "none",
                        marginBottom: "20px",
                    }}
                >
                    Verify
                </Button>
                <p
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    Didn’t receive code?
                    <span
                        style={{
                            color: "#B47000",
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                        onClick={handleResendOtp}
                    >
                        Resend
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Otp;