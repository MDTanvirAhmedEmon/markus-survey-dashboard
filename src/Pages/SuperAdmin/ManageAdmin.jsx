import { ConfigProvider, Form, Input, Modal, Table, Select } from 'antd'; // Import Select
import React, { useState } from 'react';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { useCreateAdminsMutation, useDeletAdminMutation, useGetAdminQuery } from '../../redux/features/company/company';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { CiSearch } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MakeFormData } from '../../utils/FormDataHooks';

const { Option } = Select;

const ManageAdmin = () => {
    const [form] = Form.useForm();
    const [openAddModal, setOpenAddModal] = useState(false);
    const { data: getAdmind, isLoading } = useGetAdminQuery();
    const [deleteAdmin] = useDeletAdminMutation();
    const [createAdmin] = useCreateAdminsMutation()
    const formattedTableData = getAdmind?.data?.map((admin, i) => (
        {
            id: admin?.id,
            key: i + 1,
            name: admin?.name,
            email: admin?.email
        }
    ));

    const columns = [
        {
            title: "SL No.",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Admin Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Admin Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Actions",
            dataIndex: "key",
            key: "key",
            render: (_, record) => {
                return (
                    <div className="start-center text-2xl gap-1 ">
                        {/* <MdEdit className="cursor-pointer" /> */}
                        <MdOutlineDelete onClick={() => {
                            Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#ECB206",
                                cancelButtonColor: "#1E3042",
                                confirmButtonText: "delete",
                                cancelButtonText: "cancel",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    deleteAdmin(record.id).unwrap()
                                    .then((res) => toast.success(res.message))
                                    .catch((err) => toast.error(err?.data?.message));
                                }
                            });
                        }} className="cursor-pointer" />
                    </div>
                );
            },
        },
    ];

    const onFinish = (values) => {
        const formData = MakeFormData(values)
        createAdmin(formData).unwrap()
            .then((payload) => {
                toast.success(payload?.message)
                setOpenAddModal(false)
            })
            .catch((error) => {
                toast.error('admin not create successfully!')
                setOpenAddModal(false)
            });
        // You can access the selected role using values.role
    };

    return (
        <div>
            <div className="between-center  my-2 pt-5">
                <div className="start-center gap-2 mb-3 p-5">
                    <Link
                        to={-1}
                        className="bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white"
                    >
                        <IoArrowBackSharp />
                        back
                    </Link>
                    <p className="text-xl">Manage Admin</p>
                </div>
                <div className="end-center gap-2">
                    <button
                        onClick={() => {
                            setOpenAddModal(true);
                            form.resetFields();
                        }}
                        className="bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap"
                    >
                        Add New Admin
                        <FaPlus />
                    </button>
                </div>
            </div>

            <Table
                className="super-admin-pagination"
                pagination={{}}
                dataSource={formattedTableData}
                columns={columns}
            />

            <Modal
                open={openAddModal}
                centered
                footer={false}
                onCancel={() => setOpenAddModal(false)}
            >
                <div>
                    <p className="text-xl py-2 font-bold text-center my-10">
                        Add New Admin
                    </p>

                    <ConfigProvider
                        theme={{
                            components: {
                                Form: {
                                    itemMarginBottom: 20,
                                },
                                Input: {
                                    borderRadius: 0,
                                },
                            },
                        }}
                    >
                        <Form
                            name="basic"
                            labelCol={{
                                xs: 24,
                                sm: 24,
                                md: 24,
                            }}
                            wrapperCol={{
                                xs: 24,
                                sm: 24,
                                md: 24,
                            }}
                            style={{
                                maxWidth: "100%",
                                width: "800px",
                                margin: "0 auto",
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input admin name!",
                                    },
                                ]}
                            >
                                <Input className="p-2 rounded-md" placeholder="Admin Name" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input admin email!",
                                    },
                                ]}
                            >
                                <Input className="p-2 rounded-md" placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input a password!",
                                    },
                                ]}
                            >
                                <Input.Password className="p-2 rounded-md" placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                name="password_confirmation"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please confirm your password!",
                                    },
                                ]}
                            >
                                <Input.Password className="p-2 rounded-md" placeholder="Confirm Password" />
                            </Form.Item>

                            <Form.Item
                                name="role_type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a role!",
                                    },
                                ]}
                            >
                                <Select placeholder="Select Role">
                                    <Option value="ADMIN">ADMIN</Option>
                                    {/* <Option value="SUPER ADMIN">SUPER ADMIN</Option> */}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    span: 16,
                                }}
                                className="flex justify-center items-center"
                            >
                                <button className="bg-[#ecb206] w-96 py-3 mt-5 mx-auto block rounded ">
                                    Add Admin
                                </button>
                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
            </Modal>
        </div>
    );
};

export default ManageAdmin;
