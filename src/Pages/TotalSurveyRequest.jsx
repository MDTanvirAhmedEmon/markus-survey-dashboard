import React, { useState } from 'react';
import { ConfigProvider, Input, Pagination, Table } from 'antd';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for better navigation handling
import { IoArrowBackSharp } from 'react-icons/io5';

const TotalSurveyRequest = () => {
    const navigate = useNavigate(); // For navigation handling

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
            phone: 324189454648487,
            rating: 4.5,
            email: 'gmail@gmail.com',
            regNo: '225.555.0118'
        },
        {
            key: '2',
            name: 'John',
            img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
            phone: 324189454648487,
            rating: 4.5,
            email: 'john@gmail.com',
            regNo: '225.555.0119'
        },
        {
            key: '3',
            name: 'Alex',
            img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
            phone: 324189454648487,
            rating: 4.5,
            email: 'alex@gmail.com',
            regNo: '225.555.0120'
        },
        {
            key: '4',
            name: 'Sarah',
            img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
            phone: 324189454648487,
            rating: 4.5,
            email: 'sarah@gmail.com',
            regNo: '225.555.0121'
        },
        {
            key: '5',
            name: 'Emma',
            img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
            phone: 324189454648487,
            rating: 4.5,
            email: 'emma@gmail.com',
            regNo: '225.555.0122'
        },
    ];

    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <div className='start-center gap-2'>
                    <img src={record?.img} className='w-[40px] h-[40px] rounded-sm' alt="" />
                    <p className='font-medium'>{record?.name}</p>
                </div>
            ),
        },
        {
            title: 'Request',
            dataIndex: 'key',
            align: "right",
            key: 'request',
            render: (_, record) => (
                <div className='start-center gap-1'>
                    <button onClick={() => setOpenAllowModal(true)} className='px-4 py-2 rounded-3xl text-white font-semibold bg-green-600'>Allow</button>
                    <button className='px-4 py-2 rounded-3xl text-white font-semibold bg-red-600'>Cancel</button>
                </div>
            ),
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = 50;
    const pageSize = 10;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(`Current page: ${page}`);
    };

    return (
        <div>
            <div className='bg-white pb-10'>
                <div className='between-center px-3 my-2 pt-5'>
                    <div className='start-center gap-2 mb-3 p-5'>
                        <Link to="#" onClick={() => navigate(-1)} className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'>
                            <IoArrowBackSharp />back
                        </Link>
                        <p className='text-xl'>Survey Request</p>
                    </div>
                    <Input className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" />
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                borderColor: "transparent",
                            },
                        },
                    }}
                >
                    <Table bordered={false} pagination={false} className='dashboard-custom-table all-custom-table-pagination' dataSource={dataSource} columns={columns} />
                </ConfigProvider>

                <Pagination
                    className='custom-pagination mt-8'
                    total={totalItems}
                    align="center"
                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`}
                    current={currentPage}
                    pageSize={pageSize}
                    onChange={handlePageChange} // Ensure this function receives the correct parameter
                />
            </div>
        </div>
    );
};

export default TotalSurveyRequest;
