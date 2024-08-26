import { ConfigProvider, Button, DatePicker, Form, Input, message, Modal, Popconfirm, Radio, Select, Table, Spin, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import dayjs from 'dayjs';
import { useGetSurveyQuery, useDeleteSurveyMutation, useCreateSurveyMutation } from '../redux/features/survey/surveyApi';
import { useGetProjectForManageCompanyQuery } from '../redux/features/questions/questionsApi';

const CreateSurvey = () => {
    const [isPeriodically, setIsPeriodically] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectCurrentPage, setprojectCurrentPage] = useState(1);
    const pageSize = 10;


    // delete survey
    const [deleteSurvey, { isLoading: deleteLoading }] = useDeleteSurveyMutation();

    // Pop confirm
    const confirm = async (surveyId) => {
        console.log(surveyId)
        try {
            await deleteSurvey(surveyId).unwrap();
            message.success('Survey deleted successfully');
        } catch (error) {
            message.error('Failed to delete the survey');
            console.error('Error deleting survey:', error);
        }
    };

    const cancel = () => {
        message.error('Survey deletion canceled');
    };

    const { data: allSurver, isLoading } = useGetSurveyQuery({
        page: currentPage,
    }, {
        refetchOnMountOrArgChange: true,
    });



    const { data: projects } = useGetProjectForManageCompanyQuery({
        page: projectCurrentPage
    });


    const options = projects?.data?.data?.map(project => ({
        value: project.id,
        label: project.project_name
    }));


    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'serial',
            key: 'serial',
            render: (text, record, index) => ((currentPage - 1) * pageSize) + index + 1
        },
        {
            title: 'Survey Name',
            dataIndex: 'survey_name',
            key: 'survey_name',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: 'Status',
            dataIndex: 'archive_status',
            key: 'archive_status',
        },
        {
            title: 'Actions',
            key: 'actions',
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

    const [createSurvey, { isSuccess, isError, error }] = useCreateSurveyMutation();
    console.log(isError)
    console.log(error)


    useEffect(() => {
        if (isSuccess) {
            message.success("Project Created Successfully");
            setOpenAddModal(false);
        }
        if (isError) {
            message.error("Project Creation Failed");
            setOpenAddModal(false);
        }
    }, [isSuccess, isError]);

    const onFinish = (value) => {
        console.log("Form values:", value);

        let period = "once";
        if (value.period) {
            period = value.period;
        }

        const formData = new FormData();
        formData.append("project_id", value.projectId);
        formData.append("survey_name", value.surveyName);
        formData.append("emoji_or_star", value.emojiOrStar);
        formData.append("repeat_status", period);
        formData.append("start_date", dayjs(value.startDate).format('YYYY-MM-DD'));
        formData.append("end_date", dayjs(value.endDate).format('YYYY-MM-DD'));

        // Log FormData entries
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        createSurvey(formData);
    };



    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const handlePageChangeProject = (page) => {
        setprojectCurrentPage(page);
    };

    const CustomDropdown = (menu) => (
        <div>
            {menu}
            <Pagination
                className="custom-pagination-all py-4"
                current={projectCurrentPage}
                pageSize={pageSize}
                total={projects?.data?.total}
                onChange={handlePageChangeProject}
                style={{ textAlign: 'center', marginTop: 10 }}
            />
        </div>
    );

    return (
        <div className='bg-[var(--color-7)] rounded-md'>
            <div className='between-center px-3 my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1} className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'>
                        <IoArrowBackSharp />back
                    </Link>
                    <p className='text-xl'>Create Survey</p>
                </div>
                <div className='end-center gap-2'>
                    <button onClick={() => setOpenAddModal(true)} className='bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        Add New Survey
                        <FaPlus />
                    </button>
                </div>
            </div>

            {
                deleteLoading || isLoading ? <div className=' h-[500px] flex items-center justify-center'>
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
                    : <Table
                        pagination={false}
                        className='all-custom-table-pagination custom-table'
                        dataSource={allSurver?.data?.data}
                        columns={columns}
                    />
            }

            <Modal
                open={openAddModal}
                centered
                footer={false}
                onCancel={() => setOpenAddModal(false)}
            >
                <div>
                    <p className='text-xl py-2 font-bold'>Create New Survey</p>
                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        {/* Toggle Choice Option */}
                        <Form.Item
                            name="emojiOrStar"
                            label=""
                            rules={[
                                {
                                    message: 'Rating type is required',
                                    required: true
                                }
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="emoji">Emoji</Radio>
                                <Radio value="star">Star</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name={`surveyName`}
                            label={`Survey Name`}
                            rules={[
                                {
                                    message: 'Survey Name is required',
                                    required: true
                                }
                            ]}
                        >
                            <Input className='pb-3 pt-2 border outline-none' placeholder='Type survey name here...' />
                        </Form.Item>

                        <Form.Item
                            name={`projectId`}
                            label={`Project Id`}
                            rules={[
                                {
                                    message: 'Project Id is required',
                                    required: true
                                }
                            ]}
                        >
                            <Select className='w-full h-[42px]'
                                placeholder="Select A Project"
                                dropdownRender={CustomDropdown}
                                options={options}

                            >

                            </Select>
                        </Form.Item>

                        {/* Toggle Button for Once and Periodically */}
                        <Form.Item
                            name="status"
                            label="Repeat Status"
                        >
                            <Button.Group className=''>
                                <Button className='mr-2'
                                    value="once"
                                    onClick={() => setIsPeriodically(false)}
                                >
                                    Once
                                </Button>
                                <p className='font-bold pr-3 mt-2'>Or</p>
                                <Button className='ml-2'
                                    value="periodically"
                                    onClick={() => setIsPeriodically(true)}
                                >
                                    Periodically
                                </Button>
                            </Button.Group>
                            {isPeriodically && (
                                <Form.Item
                                    name="period"
                                    label=""
                                    rules={[
                                        {
                                            message: 'Period is required',
                                            required: true
                                        }
                                    ]}
                                >
                                    <Radio.Group className='pt-5'>
                                        <Radio value="daily">Daily</Radio>
                                        <Radio value="weekly">Weekly</Radio>
                                        <Radio value="monthly">Monthly</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            )}
                        </Form.Item>

                        <div className='flex justify-between'>
                            <Form.Item
                                name="startDate"
                                label="Start Date"
                                rules={[
                                    {
                                        message: 'Start Date is required',
                                        required: true
                                    }
                                ]}
                                style={{ width: '48%' }}
                            >
                                <DatePicker
                                    className='w-full pb-6 pt-2 border outline-none'
                                    format='DD-MM-YYYY'
                                    placeholder='Select Start Date'
                                />
                            </Form.Item>

                            <Form.Item
                                name="endDate"
                                label="End Date"
                                rules={[
                                    {
                                        message: 'End Date is required',
                                        required: true
                                    }
                                ]}
                                style={{ width: '48%' }}
                            >
                                <DatePicker
                                    className='w-full pb-6 pt-2 border outline-none'
                                    format='DD-MM-YYYY'
                                    placeholder='Select End Date'
                                />
                            </Form.Item>
                        </div>

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
                    total={allSurver?.data?.total}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default CreateSurvey;
