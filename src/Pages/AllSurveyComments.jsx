import { Input, Pagination } from 'antd';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { useGetAllSurveyCommentsQuery } from '../redux/features/survey/surveyApi';

const AllSurveyComments = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(null);
    const pageSize = 10;

    const { id } = useParams();
    const { data } = useGetAllSurveyCommentsQuery(id);
    console.log(data)



    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className='between-center px-3 my-2 pt-5 '>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1}
                        className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link>
                    <p className='text-xl'>All Survey Comments</p>
                </div>
                <div className='end-center gap-2'>
                    <Input onChange={(e) => setSearchTerm(e.target.value)} className='max-w-[400px] h-10' prefix={<CiSearch className='text-2xl' />}
                        placeholder="Search" />
                </div>
            </div>

            <div className='mx-4'>
                {/* table head */}
                <div className=' w-full flex gap-3 text-lg'>
                    <div className='w-[22%]'>SL no.</div>
                    <div className='w-[34%]'>Comment</div>
                    <div className='w-[22%]'>User</div>
                    <div className='w-[22%]'>Email</div>
                </div>


                {/* table body */}
                {
                    data?.data?.map((comment, index) => (

                        <div key={index} className=' w-full flex gap-3 mt-10'>
                            <div className='w-[22%]'>0{index + 1}</div>
                            <div className='w-[34%] pr-12'>{comment?.comment}</div>
                            <div className='w-[22%] flex gap-3 items-center'><img className='w-10 rounded' src={comment?.user?.image} /> {comment?.user?.name}</div>
                            <div className='w-[22%]'>{comment?.user?.email}</div>
                        </div>
                    ))
                }

            </div>
            <div className="mt-10 py-6">
                <Pagination
                    className="custom-pagination-all"
                    current={currentPage}
                    pageSize={pageSize}
                    total={data?.total}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AllSurveyComments;