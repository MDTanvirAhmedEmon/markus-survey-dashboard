import { Button, Checkbox, Form, Input, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfileQuery, useLogInCompanyMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/features/auth/authSlice";


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { refetch } = useGetProfileQuery();

    const [logInCompany, { data, isLoading }] = useLogInCompanyMutation();


    // console.log('login', data)
    const onFinish = async (values) => {
        const formData = {
            email: values.email,
            password: values.password
        }
        logInCompany(formData).unwrap()
            .then((payload) => {
                message.success("Successfully Logged In")
                dispatch(setToken(payload?.access_token))
                navigate('/')
                refetch();
            })
            .catch((error) => message.error(error?.data?.message ? error?.data?.message : "Something went wrong!!"));

    };



    return (
        <div
            className="gap-0 flex-col flex justify-center items-center"
            style={{
                width: "100%",
                background: "#BD8E05",
                height: "100vh",
            }}
        >

            <div className="bg-white flex justify-center items-center">
                <Form
                    name="normal_login"
                    className="login-form"
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
                        style={{ fontSize: "32px", color: "#38393E", textAlign: "center" }}
                    >
                        Login to Account
                    </h1>

                    <p
                        style={{ color: "#7D7E8A", textAlign: "center" }}
                    >
                        Please Sign In to Login Your Account
                    </p>
                    <div style={{ marginBottom: "24px" }}>
                        <label
                            htmlFor="email"
                            style={{ display: "block", marginBottom: "5px" }}
                        >
                            {" "}
                            Email address:{" "}
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

                    <div style={{ marginBottom: "24px" }}>
                        <label
                            style={{ display: "block", marginBottom: "5px" }}
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                        >
                            <Input.Password
                                type="password"
                                placeholder="Enter your password"
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

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox style={{ color: "#6A6D7C" }}>Remember me</Checkbox>
                        </Form.Item>
                        <Link
                            className="login-form-forgot "
                            style={{ color: "#B47000" }}
                            to="/auth/forgot-password"
                        >
                            Forgot Password
                        </Link>
                    </div>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button

                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                            style={{
                                height: "52px",
                                fontWeight: "400px",
                                fontSize: "18px",
                                background: "#ECB206",
                                marginTop: "56px",
                            }}
                        >
                            <Link
                                className="login-form-forgot "
                                style={{ color: "white" }}
                                to="#"
                            >
                                {isLoading ? "Loading..." : "Sign In"}
                            </Link>
                            {/*Sign In*/}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;