import React, { useState, useEffect } from 'react';
import { ConfigProvider, Form, Input, message, Modal, Pagination, Popconfirm, Spin, Table } from 'antd';
import { CiSearch } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useCreateProjectMutation, useDeleteProjectMutation, useGetProjectsQuery } from '../redux/projects/projectApi';
import moment from 'moment';

const CreateProject = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(null);
    const pageSize = 10;

    console.log(currentPage)

    // delete project
    const [ deleteProject, {isLoading:deleteLoading} ] = useDeleteProjectMutation();
    // Pop confirm
    const confirm = async (projectId) => {
        console.log(projectId)
        try {
            await deleteProject(projectId).unwrap();
            message.success('Survey deleted successfully');
        } catch (error) {
            message.error('Failed to delete the survey');
            console.error('Error deleting survey:', error);
        }
    };

    const cancel = () => {
        message.error('Survey deletion canceled');
    };

    // get all projects
    const { data: allProject, isLoading: getProjectLoading } = useGetProjectsQuery({
        page: currentPage,
        search: searchTerm,
    }, {
        refetchOnMountOrArgChange: true,
    });

    // create project 
    const [createProject, { data, isLoading, isSuccess }] = useCreateProjectMutation();

    useEffect(() => {
        if (isSuccess) {
            message.success("Project Created Successfully");
            setOpenAddModal(false);
        }
    }, [isSuccess]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Projects Name',
            dataIndex: 'project_name',
            key: 'project_name',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (_, record) => <p>{moment(record?.created_at).format("L")}</p>,
        },
        {
            title: 'Actions',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => (
                <div className='start-center text-2xl gap-1 text-red-600'>
                    <Popconfirm
                        title="Delete the survey"
                        description="Are you sure to delete this survey?"
                        onConfirm={() => {
                            // deleteSurvey(record?.id)
                            confirm(record?.id)
                        }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <MdOutlineDelete className='cursor-pointer' />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const onFinish = (value) => {
        const formData = new FormData();
        formData.append("project_name", value.project_name);
        createProject(formData);
    };

    return (
        <div className='bg-[var(--color-7)] rounded-md'>
            <div className='between-center px-3 my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1} className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'>
                        <IoArrowBackSharp />back
                    </Link>
                    <p className='text-xl'>Create Project</p>
                </div>
                <div className='end-center gap-2'>
                    <Input onChange={(e) => setSearchTerm(e.target.value)} className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" />
                    <button onClick={() => setOpenAddModal(true)} className='bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        Add New Project
                        <FaPlus />
                    </button>
                </div>
            </div>

            {getProjectLoading || isLoading || deleteLoading ? (
                <div className='h-[500px] flex items-center justify-center'>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#ECB206",
                            },
                        }}
                    >
                        <Spin size="large" />
                    </ConfigProvider>
                </div>
            ) : (
                <Table
                    className='all-custom-table-pagination custom-table'
                    dataSource={allProject?.data?.data}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                />
            )}

            <Modal
                open={openAddModal}
                centered
                footer={false}
                onCancel={() => setOpenAddModal(false)}
            >
                <div>
                    <p className='text-xl py-2 font-semibold'>Create new Project</p>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item
                            name='project_name'
                            label='Project Name'
                            rules={[
                                { message: 'Project Name is required', required: true },
                            ]}
                        >
                            <Input className='pb-8 pt-2 border outline-none' placeholder='Type survey name here...' />
                        </Form.Item>
                        <button className='w-full py-2 bg-[var(--color-2)] text-white font-semibold rounded-md'>
                            Save
                        </button>
                    </Form>
                </div>
            </Modal>
            <div className="py-6">
                <Pagination
                    className="custom-pagination-all"
                    current={currentPage}
                    pageSize={pageSize}
                    total={allProject?.data?.total}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default CreateProject;
