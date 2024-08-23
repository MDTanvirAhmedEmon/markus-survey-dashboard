import { RiEditLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Button, Form, Input } from "antd";
import { CiEdit } from "react-icons/ci";
import {Link} from "react-router-dom";
import {IoArrowBackSharp} from "react-icons/io5";
// import Swal from "sweetalert2";

const admin = false;
const Profile = () => {
    const [image, setImage] = useState();
    const [form] = Form.useForm()
    const [tab, setTab] = useState(new URLSearchParams(window.location.search).get('tab') || "Profile");
    const [passError, setPassError] = useState('')
    const handlePageChange = (tab) => {
        setTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(file)

    }
    const onFinish = (values) => {
        if (values?.new_password === values.current_password) {
            return setPassError('your old password cannot be your new password')
        }
        if (values?.new_password !== values?.confirm_password) {
            return setPassError("Confirm password doesn't match")
        } else {
            setPassError('')
        }
    };
    const onEditProfile = (values) => {
        const data = {
            profile_image: image,
            name: values.fullName,
            contact: values.mobileNumber,
            address: values.address
        }
    }
//   useEffect(() => {
//     const data = {
//       fullName: user.name,
//       mobileNumber: user.phone_number,
//       address: user.address
//     }
//     form.setFieldsValue(data)
//   }, [user])
    return (
        <div>
            {(admin &&
            <div className='start-center gap-2 mb-3 p-5'>
                <Link to={-1}
                      className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp/>back</Link>
                <p className='text-xl'>Admin Profile</p>
            </div>
            )}
            <div className='container pb-16'>

                <div className='bg-base py-9 px-10 rounded flex items-center justify-center flex-col gap-6'>
                    <div className='relative w-[140px] h-[124px] mx-auto'>
                        <input type="file" onInput={handleChange} id='img' style={{display: "none"}}/>
                        <img
                            style={{width: 140, height: 140, borderRadius: "100%"}}
                            src={`https://dcassetcdn.com/design_img/2531172/542774/542774_13559578_2531172_d07764e6_image.png`}
                            alt=""
                        />
                        {/* <img
              style={{ width: 140, height: 140, borderRadius: "100%" }}
              src={`${image ? URL.createObjectURL(image) : user?.profile_image?.includes('http') ? 'https://i.ibb.co/d4RSbKx/Ellipse-980.png' : `${ServerUrl}${user.profile_image}`}`}
              alt=""
            /> */}
                        {
                            tab === "Profile" && <label
                                htmlFor="img"
                                className='
                            absolute top-1/2 -right-2
                            bg-white
                            rounded-full
                            w-6 h-6
                            flex items-center justify-center
                            cursor-pointer
                        '
                            >
                                <CiEdit color='#929394'/>
                            </label>
                        }

                    </div>
                    <div className='w-fit'>
                        <p className=' text-[#575757] text-[24px] leading-[32px] font-semibold  '>{`XYZ Company`}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6 my-6">
                    <p
                        onClick={() => handlePageChange("Profile")}
                        className={`
                        ${tab === "Profile" ? "border-[#F27405] border-b-2 font-semibold text-[#F27405]" : "border-b-2 border-transparent font-normal text-gray-600"}
                        pb-2 cursor-pointer text-[16px] leading-5  
                    `}
                    >
                        Edit Profile
                    </p>
                    <p
                        onClick={() => handlePageChange("Change Password")}
                        className={`
                        ${tab === "Change Password" ? "border-[#F27405] border-b-2 font-semibold text-[#F27405]" : "border-b-2 border-transparent font-normal  text-gray-600"}
                        pb-2 cursor-pointer text-base leading-[18px]  
                    `}
                    >
                        Change Password
                    </p>
                </div>
                {
                    tab === "Profile"
                        ?
                        <div
                            className='max-w-[481px] mx-auto rounded-lg p-6'
                            style={{
                                boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"
                            }}
                        >
                            <h1 className='text-center text-secondary leading-7 text-2xl font-medium mb-7'>Edit Company
                                Profile</h1>
                            <Form
                                onFinish={onEditProfile}
                                layout="vertical"
                                form={form}
                            >
                                <Form.Item
                                    name="fullName"
                                    label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Company
                                        Name</p>}
                                >
                                    <Input
                                        style={{
                                            width: "100%",
                                            height: 48,
                                            border: "1px solid #DCDDDE",
                                            borderRadius: "8px",
                                            color: "#919191",
                                            outline: "none"
                                        }}
                                        className='text-[16px] leading-5'
                                        placeholder="XYZ Company"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Email</p>}
                                >
                                    <Input
                                        disabled
                                        style={{
                                            width: "100%",
                                            height: 48,
                                            border: "1px solid #DCDDDE",
                                            borderRadius: "8px",
                                            color: "#919191",
                                            outline: "none"
                                        }}
                                        className='text-[16px] leading-5'
                                        placeholder={`user email`}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="mobileNumber"
                                    label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Contact
                                        Number</p>}
                                >
                                    <Input
                                        style={{
                                            width: "100%",
                                            height: 48,
                                            border: "1px solid #DCDDDE",
                                            borderRadius: "8px",
                                            color: "#919191",
                                            outline: "none"
                                        }}
                                        className='text-[16px] leading-5'
                                        placeholder="Enter Contact Number"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Address</p>}
                                >
                                    <Input
                                        style={{
                                            width: "100%",
                                            height: 48,
                                            border: "1px solid #DCDDDE",
                                            borderRadius: "8px",
                                            color: "#919191",
                                            outline: "none"
                                        }}
                                        className='text-[16px] leading-5'
                                        placeholder="Enter Address"
                                    />
                                </Form.Item>

                                <Form.Item
                                    style={{
                                        marginBottom: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        style={{
                                            width: 197,
                                            height: 48,
                                            color: "#FCFCFC",
                                            background: '#F27405'
                                        }}
                                        className='font-normal text-[16px] leading-6 bg-primary'
                                    >
                                        Save Changes
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        :
                        <div
                            className='max-w-[481px] mx-auto rounded-lg p-6'
                            style={{
                                boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"
                            }}
                        >
                            <h1 className='text-center text-secondary leading-7 text-2xl font-medium mb-7'>Change
                                Password</h1>
                            <Form
                                layout='vertical'
                                onFinish={onFinish}
                                form={form}
                            >
                                <Form.Item
                                    name="current_password"
                                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Current
                                        Password</p>}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Current Password!"
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        style={{
                                            width: "100%",
                                            height: "42px",
                                            border: "1px solid #DCDDDE",
                                            borderRadius: "8px",
                                            color: "black",
                                            outline: "none",

                                        }}
                                        type="text"
                                        placeholder="***************"
                                    />
                                </Form.Item>


                                <Form.Item
                                    name="new_password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter New Password!"
                                        }
                                    ]}
                                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">New
                                        Password</p>}
                                >
                                    <Input.Password
                                        style={{
                                            width: "100%",
                                            height: "42px",
                                            border: "1px solid #DCDDDE",
                                            borderRadius: "8px",
                                            color: "black",
                                            outline: "none",

                                        }}
                                        type="text"
                                        placeholder="************"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Confirm
                                        Password</p>}
                                    name="confirm_password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Confirm Password!"
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        style={{
                                            width: "100%",
                                            height: "42px",
                                            border: "1px solid #DCDDDE",
                                            borderRadius: "8px",
                                            color: "black",
                                            outline: "none",

                                        }}
                                        type="text"
                                        placeholder="***************"
                                    />
                                </Form.Item>
                                {passError && <p className="text-red-600 -mt-4 mb-2">{passError}</p>}
                                <Form.Item
                                    style={{
                                        marginBottom: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        style={{
                                            width: 197,
                                            height: 48,
                                            color: "#FCFCFC",
                                            background: '#F27405'
                                        }}
                                        className='font-normal text-[16px] leading-6 bg-primary'
                                    >
                                        Save Changes
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                }
            </div>
        </div>
    );
};

export default Profile;