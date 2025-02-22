import { Avatar, Input, Pagination } from 'antd';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { useGetAllSurveyCommentsQuery } from '../redux/features/survey/surveyApi';
import { imageUrl } from '../redux/api/baseApi';
import { useGetProfileQuery } from '../redux/features/auth/authApi';

const AllSurveyComments = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(null);
    const { data: getUser } = useGetProfileQuery() || {};
    // console.log(getUser?.user?.anonymous);

    const pageSize = 10;

    const { id } = useParams();
    const { data } = useGetAllSurveyCommentsQuery({
        id,
        page: currentPage,
        search: searchTerm,
    });



    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className='between-center px-3 my-2'>
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

            <div className='mx-4 bg-white py-8 rounded-md'>
                {/* table head */}
                <div className=' w-full flex items-center justify-center gap-3 text-lg'>
                    <div className='w-[22%]'>SL no.</div>
                    <div className='w-[34%]'>Comment</div>
                    {
                       !getUser?.user?.anonymous && <>
                            <div className='w-[22%]'>User</div>
                            <div className='w-[22%]'>Email</div>
                        </>
                    }
                </div>


                {/* table body */}
                {
                    data?.data?.map((comment, index) => (

                        <div key={index} className=' w-full flex  justify-center items-center gap-3 mt-10'>
                            <div className='w-[22%]'>0{index + 1}</div>
                            <div className='w-[34%] pr-12'>{comment?.comment}</div>
                            {
                                !getUser?.user?.anonymous && <> <div className='w-[22%] flex gap-3 items-center'><Avatar size={45} shape="circle" className=' shadow' src={`${imageUrl}${comment?.user?.image}`} /> {comment?.user?.name}</div>
                                    <div className='w-[22%]'>{comment?.user?.email}</div></>
                            }

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