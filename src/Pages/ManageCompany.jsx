import { ConfigProvider, Form, Input, Modal, Pagination, Select, Spin, Table, Tooltip } from 'antd';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaEdit, FaRegEye } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useGetCompanySurveyQuery } from '../redux/features/manageCompany/manageCompanyApi';

const ManageCompany = () => {

    const [searchTerm, setSearchTerm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { data, isLoading } = useGetCompanySurveyQuery({
        page: currentPage,
        search: searchTerm,
    }, {
        refetchOnMountOrArgChange: true
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const dataSource = data?.data?.map((item, index) => ({
        key: item.id,
        id: index + 1,
        project_name: item?.project?.project_name,
        survey_name: item?.survey_name,
        questions_count: item?.questions_count,
        end_date: item?.end_date,
        answers_count: item?.answers_count,
    })) || [];

    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'serial',
            key: 'serial',
            render: (text, record, index) => ((currentPage - 1) * pageSize) + index + 1
        },
        {
            title: 'Projects Name',
            dataIndex: 'project_name',
            key: 'project_name',
        },
        {
            title: 'Survey Name',
            dataIndex: 'survey_name',
            key: 'survey_name',
        },
        {
            title: 'Total Questions',
            dataIndex: 'questions_count',
            key: 'questions_count',
        },
        {
            title: 'Date',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: 'Total Surveys Done',
            dataIndex: 'answers_count',
            key: 'answers_count',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => {
                console.log(record?.answers_count);

                return (
                    <div className='start-center text-2xl gap-1'>
                        <Link to={`/survey-report/${record.key}`}>
                            <FaRegEye className='cursor-pointer' />
                        </Link>

                        {record?.answers_count >= 1 ? (
                            <Tooltip className='mr-5' title="You can't edit question after start survey!">
                                <span className="text-gray-400 cursor-not-allowed">
                                    <FaEdit />
                                </span>
                            </Tooltip>
                        ) : (
                            <Link to={`/edit-survey-question/${record.key}`}>
                                <FaEdit className='cursor-pointer' />
                            </Link>
                        )}
                    </div>
                )
            },
        },
    ];

    return (
        <div className='bg-[var(--color-7)] pb-6 rounded-md'>
            <div className='between-center px-3 my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1} className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'>
                        <IoArrowBackSharp />back
                    </Link>
                    <p className='text-xl'>Manage Surveys</p>
                </div>
                <div className='end-center gap-2'>
                    <Input onChange={(e) => setSearchTerm(e.target.value)} className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" />
                    <Link to={`/add-questions`} className='bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        Add New Question
                        <FaPlus />
                    </Link>
                </div>
            </div>

            {isLoading ? (
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
                <Table className='' pagination={false} dataSource={dataSource} columns={columns} />
            )}



            <Pagination
                className="custom-pagination-all my-6"
                current={currentPage}
                pageSize={pageSize}
                total={data?.total}
                onChange={handlePageChange}
            />
        </div>
    );
}

export default ManageCompany;
