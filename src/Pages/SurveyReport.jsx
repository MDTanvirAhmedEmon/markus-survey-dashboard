import React, { useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ConfigProvider, Input, Select, Spin } from "antd";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import Chart from "./Chart.jsx"
import { useSurveyReportQuery } from '../redux/features/manageCompany/manageCompanyApi.js';


const SurveyReport = () => {

    const { id } = useParams();
    console.log(id)

    const { data: report, isLoading } = useSurveyReportQuery(id);


    const data = ['https://i.ibb.co/0sF5Fk3/images-19.jpg', 'https://i.ibb.co/YpR8Mbw/Ellipse-307.png', 'https://i.ibb.co/JFZhZ7m/Ellipse-311.png', 'https://i.ibb.co/5cXN4Bw/Ellipse-310.png', 'https://i.ibb.co/gz2CbVj/1-intro-photo-final.jpg', 'https://i.ibb.co/7xc44sq/profile-picture-smiling-young-african-260nw-1873784920.webp', 'https://i.ibb.co/sQPHfnR/images-20.jpg']
    const navigate = useNavigate()

    if (isLoading) {
        return (
            <div className='h-[600px] w-full flex justify-center items-center'>
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
        )
    }


    return (
        <div className='bg-[var(--color-7)] p-4 rounded-md'>
            <div className='between-center px-3 my-2 pt-5 pb-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1}
                        className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link>
                    <p className='text-xl'>Survey Report</p>
                </div>
                <div className='end-center gap-2'>
                    <Input className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />}
                        placeholder="Search" />
                    <Link to={`/add-project`}
                        className='bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        Add New Project
                        <FaPlus />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div>
                    <h1 className='text-2xl font-semibold text-[#6B6B6B]'>Project Name</h1>
                    <p className='text-[#71717C] text-lg'>{report?.project?.project_name}</p>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold text-[#6B6B6B]'>Survey Name</h1>
                    <p className='text-[#71717C] text-lg'>{report?.survey_name}</p>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold text-[#6B6B6B]'>Total Question</h1>
                    <p className='text-[#71717C] text-lg'>{report?.questions_count}</p>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold text-[#6B6B6B]'>Total Survey Do</h1>
                    <p className='text-[#71717C] text-lg'>{report?.answers_count}</p>
                </div>
            </div>
            <Chart answer_counts={report?.answer_counts} />

            <div className='flex justify-center items-center mb-8 mt-6'>
                {
                    data.map(item => <img className='w-20 h-20 rounded-full -ml-8' key={item} src={item} alt="" />)
                }
                <div onClick={() => {
                    navigate(`/project-users/${id}`)
                }} className='h-20 w-20 rounded-full bg-black bg-opacity-60 -ml-20 flex justify-center items-center text-white cursor-pointer select-none
                '>
                    65+
                </div>
            </div>
        </div>
    )
}
export default SurveyReport
