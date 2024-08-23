
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom'
import { useGetSurveyBasedQuestionQuery } from '../redux/features/questions/questionsApi';
import { ConfigProvider, Spin } from 'antd';

const EditSurveyQuestions = () => {

    const { id } = useParams();
    const { data, isLoading } = useGetSurveyBasedQuestionQuery(id);
    console.log("questioins", data?.data[0]?.project?.project_name)
    console.log("questioins", data?.data[0].questions)


    return (
        <div className='questions'>
            <div className='between-center  my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1} className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link>
                    <p className='text-xl'>Edit Questions</p>
                </div>

            </div>
            <div className=' flex gap-8'>
                <div className='w-1/2 '>
                    <p className='mb-1'>Project Name</p>
                    <div className='h-14 rounded-md border-2 flex items-center pl-3'><p>{data?.data[0]?.project?.project_name}</p></div>
                </div>
                <div className='w-1/2 '>
                    <p className='mb-1'>Survey Name</p>
                    <div className='h-14 rounded-md border-2 flex items-center pl-3'><p>{data?.data[0]?.survey_name}</p></div>
                </div>
            </div>

            {
                isLoading ?
                    <div className='h-[500px] w-full flex justify-center items-center'>
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
                    :
                    <div className=' bg-[#ffffff75] h-auto pb-6 mt-6 rounded-md px-44 pt-8'>

                        {
                            data?.data[0].questions?.map((q, index) => <div className=' mt-4' key={index}>
                                <p className='mb-1'>Question no. {index + 1}</p>
                                <div className='h-16 rounded-md border flex items-center pl-3'><p>{q?.question_en}</p></div>
                            </div>)
                        }
                    </div>
            }





        </div>
    );
};

export default EditSurveyQuestions;