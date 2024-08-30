import { Button, ConfigProvider, Form, Input, Spin } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSetForgetPassMutation } from "../../redux/features/auth/authApi";


const ForgotPassword = () => {
    const navigate = useNavigate();

    const [
        setForgetPass,
        { data: forgetPassData, isLoading },
    ] = useSetForgetPassMutation();
    console.log(forgetPassData);

    const onFinish = async (values) => {
        console.log("this is forgot password", values);
        localStorage.setItem('myEmail', values.email);
        try {
            const formData = new FormData();
            formData.append("email", values.email);
            const result = await setForgetPass(formData).unwrap();
            console.log("Result:", result); // Check the API response here
            if (result) {
                Swal.fire({
                    title: "Success!",
                    text: "A reset code has been sent to your email.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                navigate("/auth/otp");
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Spin
                    style={{
                        Spin: {
                            dotSize: 100,
                        },
                    }}
                ></Spin>
            </div>
        );
    }

    return (
        <div
            className="bg-white flex justify-center items-center gap-0 "
            style={{
                width: "100%",
                background: "#BD8E05",
                height: "100vh",
            }}
        >
            <ConfigProvider
                theme={{
                    token: {},
                    components: {
                        Spin: {
                            dotSize: 200,
                        },
                    },
                }}
            >
                <div className=" bg-white flex justify-center items-center">
                    <Form
                        name="normal_login"
                        className="password-form"
                        initialValues={{
                            remember: true,
                        }}
                        style={{
                            width: "630px",
                            background: "white",
                            borderRadius: "12px",
                            padding: "90px 57px",
                        }}
                        onFinish={onFinish}
                    >
                        <h1
                            style={{
                                fontSize: "32px",
                                marginBottom: "54px",
                                color: "#494949",
                                textAlign: "center",
                            }}
                        >
                            Forgot Password
                        </h1>

                        <div style={{ marginBottom: "24px" }}>
                            <label
                                htmlFor="email"
                                style={{ display: "block", marginBottom: "5px" }}
                            >
                                {" "}
                                Email Address
                            </label>
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name="email"
                                id="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter your email address"
                                    type="email"
                                    style={{
                                        border: "1px solid #E0E4EC",
                                        height: "52px",
                                        background: "white",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                block
                                style={{
                                    height: "45px",
                                    fontWeight: "400px",
                                    fontSize: "18px",
                                    background: "#ECB206",
                                    color: "white",
                                    alignSelf: "bottom",
                                    marginTop: "30px",
                                }}
                            >
                                Send a Code
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </ConfigProvider>
        </div>
    );
};

export default ForgotPassword;