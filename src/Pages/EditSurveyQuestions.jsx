import React, { useState } from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { useGetSurveyBasedQuestionQuery } from '../redux/features/questions/questionsApi';
import { ConfigProvider, Spin, Input, Button, message } from 'antd';
import { MakeFormData } from '../utils/FormDataHooks';
import { useUpdateSurveyQuestionMutation } from '../redux/features/manageCompany/manageCompanyApi';

const EditSurveyQuestions = () => {
    const [updateQuestion] = useUpdateSurveyQuestionMutation()
    const { id } = useParams();
    const { data, isLoading , refetch } = useGetSurveyBasedQuestionQuery(id);
    // State to manage the edited questions


    console.log(data?.data[0]?.questions);
    const [editedQuestions, setEditedQuestions] = useState([]);

    // Function to handle input changes
    const handleInputChange = (index, value) => {
       
        const newQuestions = [...editedQuestions];
        newQuestions[index] = value;
        setEditedQuestions(newQuestions);
    };

    // Function to get all edited data
    const getEditedData = () => {
        const allEditedData = data?.data[0]?.questions.map((q, index) => ({
            id: q?.id, 
            question_en: editedQuestions[index] || q.question_en,
            comment: q?.comment,
        }));
    
        // Create FormData object
        const formData = new FormData();
        formData.append("project_id", data?.data[0]?.questions[0]?.project_id);
        formData.append("survey_id", data?.data[0]?.questions[0]?.survey_id);
        formData.append("questions", JSON.stringify(allEditedData)); 
    
        // Send the FormData to the API
        updateQuestion(formData).unwrap()
            .then((payload) => {
                message.success("Question Update Successfully!")
                refetch()
            })
            .catch((error) => console.error('rejected', error));
    };
    return (
        <div className='questions'>
            <div className='between-center my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1} className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'>
                        <IoArrowBackSharp />back
                    </Link>
                    <p className='text-xl'>Edit Questions</p>
                </div>
            </div>
            <div className='flex gap-8'>
                <div className='w-1/2 '>
                    <p className='mb-1'>Project Name</p>
                    <div className='h-14 rounded-md border-2 flex items-center pl-3'>
                        <p>{data?.data[0]?.project?.project_name}</p>
                    </div>
                </div>
                <div className='w-1/2 '>
                    <p className='mb-1'>Survey Name</p>
                    <div className='h-14 rounded-md border-2 flex items-center pl-3'>
                        <p>{data?.data[0]?.survey_name}</p>
                    </div>
                </div>
            </div>

            {isLoading ? (
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
            ) : (
                <div className='bg-[#ffffff75] h-auto pb-6 mt-6 rounded-md px-44 pt-8'>
                    {data?.data[0]?.questions?.map((q, index) => (
                        <div className='mt-4' key={q.id}>
                            <p className='mb-1'>Question no. {index + 1}</p>
                            <Input
                                className='h-16 rounded-md border flex items-center pl-3'
                                defaultValue={q?.question_en}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <div className='mt-6'>
                        <button type="primary"  className='bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap hover:bg-[var(--color-2)] ' onClick={getEditedData}>
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditSurveyQuestions;
