import { Button, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSetResetPassMutation } from "../../redux/features/auth/authApi";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [newPassError, setNewPassError] = useState("");
    const [confirmPassError, setConfirmPassError] = useState("");

    const [setNewPass, { data: newPass, isLoading }] = useSetResetPassMutation();

    console.log(newPass);

    const onFinish = async (values) => {
        const { password, confirmPassword } = values;
        const storedEmail = localStorage.getItem("myEmail");

        if (password !== confirmPassword) {
            setConfirmPassError("Passwords do not match");
            return;
        }

       

        try {
            const formData = new FormData();
            formData.append("email", storedEmail);
            formData.append("password", password);
            formData.append("password_confirmation", confirmPassword);

            const result = await setNewPass(formData).unwrap();
            console.log("Result:", result);
            if (result) {
                localStorage.removeItem("myEmail")
                Swal.fire({
                    title: "Success!",
                    text: "Your Password has been successfully changed.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                navigate("/");
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Error!",
                text:
                    error.data?.password?.[0] ||
                    "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    if (isLoading) {
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
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                style={{ width: "630px", background: "white", padding: "90px 57px" }}
                onFinish={onFinish}
            >
                <h1
                    style={{
                        fontSize: "32px",
                        color: "#38393E",
                        marginBottom: "13px",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    New Password
                </h1>
                <p
                    style={{
                        width: "275px",
                        color: "#7D7E8A",
                        fontSize: "14px",
                        fontWeight: 400,
                        textAlign: "center",
                        margin: "0 auto 0 auto",
                    }}
                >
                    Create Your New Password.
                </p>

                <div style={{ margin: "45px 0 20px 0" }}>
                    <label
                        style={{ display: "block", color: "#38393E", marginBottom: "5px" }}
                        htmlFor=""
                    >
                        New Password
                    </label>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your new Password!",
                            },
                        ]}
                        style={{ marginBottom: 0 }}
                    >
                        <Input.Password
                            placeholder="Enter New password"
                            style={{
                                border: "1px solid #E0E4EC",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                            }}
                        />
                    </Form.Item>
                    {newPassError && (
                        <label style={{ display: "block", color: "red" }} htmlFor="error">
                            {newPassError}
                        </label>
                    )}
                </div>

                <div style={{ marginBottom: "40px" }}>
                    <label
                        style={{ display: "block", color: "#38393E", marginBottom: "5px" }}
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <Form.Item
                        style={{ marginBottom: 0 }}
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Confirm Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter Confirm password"
                            style={{
                                border: "1px solid #E0E4EC",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                            }}
                        />
                    </Form.Item>
                    {confirmPassError && (
                        <label style={{ display: "block", color: "red" }} htmlFor="error">
                            {confirmPassError}
                        </label>
                    )}
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                            border: "none",
                            height: "51px",
                            background: "#ECB206",
                            color: "white",
                            borderRadius: "8px",
                            outline: "none",
                        }}
                    >
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdatePassword;