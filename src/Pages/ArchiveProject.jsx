import { ConfigProvider, Input, Pagination, Spin, Table } from 'antd';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaEdit, FaRegEye } from 'react-icons/fa';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useGetArchiveQuery, useGetCompanySurveyQuery } from '../redux/features/manageCompany/manageCompanyApi';

const ArchiveProject = () => {

    const [searchTerm, setSearchTerm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const {data :  getArchive} = useGetArchiveQuery()
    console.log(getArchive?.data);

    const { data, isLoading } = useGetCompanySurveyQuery({
        page: currentPage,
        search: searchTerm,
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const dataSource = getArchive?.data?.map((item, index) => ({
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
            render: (_, record) => (
                <div className='start-center text-2xl gap-1'>
                    <Link to={`/survey-report/${record.key}`}>
                        <FaRegEye className='cursor-pointer' />
                    </Link>
                    {/* <Link to={`/edit-survey-question/${record.key}`}>
                        <FaEdit className='cursor-pointer' />
                    </Link> */}
                </div>
            ),
        },
    ];

    return (
        <div className='bg-[var(--color-7)] pb-6 rounded-md'>
            <div className='between-center px-3 my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1} className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'>
                        <IoArrowBackSharp />back
                    </Link>
                    <p className='text-xl'>Archive Project</p>
                </div>
                {/* <div className='end-center gap-2'>
                    <Input onChange={(e) => setSearchTerm(e.target.value)} className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" />
                </div> */}
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

export default ArchiveProject;
