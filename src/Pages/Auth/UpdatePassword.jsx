
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
// import Swal from "sweetalert2";
// import { SetNewPass } from "../../ReduxSlices/Authentication/SetNewPassSlice";
// import { useDispatch } from "react-redux";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [newPassError, setNewPassError] = useState("");
    const [conPassError, setConPassError] = useState("");
    const [curPassError, setCurPassError] = useState("");
    const [err, setErr] = useState("");
    // const dispatch = useDispatch()
    // const onFinish = (values) => {
    //     const { password, confirmPassword } = values;
    //     if (confirmPassword !== password) {
    //         return Swal.fire({
    //             position: "center",
    //             icon: "error",
    //             title: "confirm password doesn't match",
    //             showConfirmButton: false,
    //             timer: 1500,
    //             imageWidth: 300,
    //             imageHeight: 400,
    //         })
    //     }
    //     dispatch(SetNewPass({ email: localStorage.getItem('resetEmail'), password: password, confirmPassword: confirmPassword }))
    //         .then((res) => {
    //             if (res.type === 'SetNewPass/fulfilled') {
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     text: "Your password has been updated, please change your password regularly to avoid this happening",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 }).then(() => {
    //                     navigate("/")
    //                 });
    //             } else {
    //                 Swal.fire({
    //                     icon: "error",
    //                     title: "Oops...",
    //                     text: "Something went wrong!",
    //                     timer: 1500,
    //                     showConfirmButton: false,
    //                     showCloseButton: false
    //                 });
    //             }
    //         })
    // };

    return (
        <div
            style={{
                width: "100%",
                background: "#BD8E05",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                style={{ width: "630px", background: "white", padding: "90px 57px" }}
                // onFinish={onFinish}
            >
                <h1 style={{ fontSize: "32px", color: "#38393E", marginBottom: "13px", textAlign: "center", fontWeight: "bold" }}>New Password</h1>
                <p style={{ width: "275px", color: "#7D7E8A", fontSize: "14px", fontWeight: 400, textAlign: "center", margin: "0 auto 0 auto" }}>
                    Create Your New Password.
                </p>

                <div style={{ margin: "45px 0 20px 0" }}>
                    <label style={{ display: "block", color: "#38393E", marginBottom: "5px" }} htmlFor="">New Password</label>
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
                            type="password"
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
                    {newPassError && <label style={{ display: "block", color: "red" }} htmlFor="error">{newPassError}</label>}
                </div>

                <div style={{ marginBottom: "40px" }}>
                    <label style={{ display: "block", color: "#38393E", marginBottom: "5px" }} htmlFor="email">Confirm Password</label>
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
                            type="password"
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
                    {conPassError && <label style={{ display: "block", color: "red" }} htmlFor="error">{conPassError}</label>}
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
                            marginTop: ""
                        }}
                    >

                        <Link
                            className="login-form-forgot "
                            style={{ color: "#FFF" }}
                            to="/"
                        >
                            Update
                        </Link>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdatePassword;
