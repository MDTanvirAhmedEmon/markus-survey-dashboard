
import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Form, Input, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { useGetProfileQuery, useUpdatePasswordMutation, useUpdateProfileMutation } from "../redux/features/auth/authApi";
import { MakeFormData } from "../utils/FormDataHooks";
import toast from "react-hot-toast";
import { imageUrl } from "../redux/api/baseApi";
import { FaRegUser } from "react-icons/fa6";
import { VscLightbulb } from "react-icons/vsc";
const admin = false;
const Profile = () => {
    const [image, setImage] = useState();
    const [form] = Form.useForm()
    const [tab, setTab] = useState(new URLSearchParams(window.location.search).get('tab') || "Profile");
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
    const [updatePassword, { isLoading: isUpdatingPass }] = useUpdatePasswordMutation()
    const { data, isLoading, } = useGetProfileQuery() || {};
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
            return toast.error('Your old password cannot be your new password')
        }
        if (values?.new_password !== values?.confirm_password) {
            return toast.error("Confirm password doesn't match")
        }
        const data = {
            current_password: values.current_password,
            new_password: values.new_password,
            confirm_password: values.confirm_password

        }
        const formData = MakeFormData(data)
        updatePassword({ data: formData }).unwrap().then((res) => {
            toast.success(res.message)
        }).catch((err) => {
            toast.error(err?.data?.message)
        })
    };
    const onEditProfile = (values) => {
        const data = {
            name: values?.name,
            phone_number: values?.phone_number,
            address: values?.address,
            _method: 'PUT'
        };
        if (image) {
            data.image = image;
        }
        const formData = MakeFormData(data);
        updateProfile({ data: formData }).unwrap().then((res) => {
            toast.success(res.message);
        }).catch((err) => {
            toast.error(err?.data?.name?.[0] || 'Please enter your name!');
        });
    }
    useEffect(() => {
        if (!data?.user) return
        form.setFieldsValue({
            name: data?.user?.name,
            phone_number: data?.user?.phone_number,
            email: data?.user?.email,
            address: data?.user?.address,
        })
    }, [form, data])

    /** loading indicator */
    const spinIcon = <LoadingOutlined style={{ fontSize: 24, color: '#ECB206' }} spin />;
    return (
        <div>
            {(admin &&
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1}
                        className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link>
                    <p className='text-xl'>Admin Profile</p>
                </div>
            )}
            <div className='container pb-16'>

                <div className='bg-base py-9 px-10 rounded flex items-center justify-center flex-col gap-6'>
                    <div className='relative w-[140px] h-[124px] mx-auto'>
                        <input type="file" onInput={handleChange} id='img' style={{ display: "none" }} />
                        <input type="file" onInput={handleChange} id='img' style={{ display: "none" }} />
                        <img
                        className="object-cover"
                            style={{ width: 140, height: 140, borderRadius: "100%" }}
                            src={image ? URL.createObjectURL(image) : data?.user?.image ? `${imageUrl}${data?.user?.image}` : <FaRegUser />}
                            alt=""
                        />

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
                                <CiEdit color='#929394' />
                            </label>
                        }

                    </div>
                    <div className='w-fit'>
                        <p className=' text-[#575757] text-[24px] leading-[32px] font-semibold  '>{data?.user?.name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6 my-6">
                    <p
                        onClick={() => handlePageChange("Profile")}
                        className={`
                        ${tab === "Profile" ? "border-[#ECB206] border-b-2 font-semibold text-[#ECB206]" : "border-b-2 border-transparent font-normal text-gray-600"}
                        pb-2 cursor-pointer text-[16px] leading-5  
                    `}
                    >
                        Edit Profile
                    </p>
                    <p
                        onClick={() => handlePageChange("Change Password")}
                        className={`
                        ${tab === "Change Password" ? "border-[#ECB206] border-b-2 font-semibold text-[#ECB206]" : "border-b-2 border-transparent font-normal  text-gray-600"}
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
                            <h1 className='text-center text-secondary leading-7 text-2xl font-medium mb-7'>Edit Profile</h1>
                            <Form
                                onFinish={onEditProfile}
                                layout="vertical"
                                form={form}
                            >
                                <Form.Item
                                    name="name"
                                    label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Name</p>}
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
                                        defaultValue={data?.user?.name}
                                        className='text-[16px] leading-5'
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
                                        defaultValue={data?.user?.email} className='text-[16px] leading-5'

                                    />
                                </Form.Item>

                                <Form.Item
                                    name="phone_number"
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
                                        defaultValue={data?.user?.phone_number}
                                        className='text-[16px] leading-5'

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
                                        defaultValue={data?.user?.address}
                                        className='text-[16px] leading-5'
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
                                        className='font-normal text-[16px] leading-6 bg-[#ECB206]'
                                    >
                                        {isUpdating ? <Spin indicator={spinIcon} /> :'Save Changes'}
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
                                        className='font-normal text-[16px] leading-6 bg-[#ECB206]'
                                    >
                                        Change Password
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