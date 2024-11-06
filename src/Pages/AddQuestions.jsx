import  { useEffect, useState } from 'react';
import { Button, Form, Input, message, Pagination, Select, Space } from 'antd';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateQuestionsMutation, useGetProjectForManageCompanyQuery, useGetSurveyForManageCompanyQuery } from '../redux/features/questions/questionsApi';

const AddQuestions = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSurvey, setCurrentPageSurvey] = useState(1);
    const [selectedProjectId, setSelectedProjectId] = useState(null); // Track the selected project ID
    const pageSize = 10;
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageChangeSurvey = (page) => {
        setCurrentPageSurvey(page);
    };

    const { data: projects } = useGetProjectForManageCompanyQuery({
        page: currentPage,
    });

    const { data: surveys } = useGetSurveyForManageCompanyQuery({
        page: currentPageSurvey,
        project_id: selectedProjectId, // Pass selected project ID to survey query
    });

    const projectOptions = projects?.data?.data?.map((project) => ({
        value: project.id,
        label: project.project_name,
    }));

    const surveyOptions = surveys?.data?.data?.map((survey) => ({
        value: survey.id,
        label: survey.survey_name,
    }));

    const [createQuestions, { isSuccess, isError }] = useCreateQuestionsMutation();

    useEffect(() => {
        if (isSuccess) {
            message.success('Questions Created Successfully');
            navigate('/manage-company');
        }
        if (isError) {
            message.error('Questions Creation Failed');
        }
    }, [isSuccess, isError]);

    const onFinish = (values) => {
        const formData = new FormData();
        const questions = values.questions.map((question) => ({
            question_en: question.englishQuestions,
            comment: question.comment === 'enable',
        }));

        formData.append('questions', JSON.stringify(questions));
        formData.append('project_id', values.projectId);
        formData.append('survey_id', values.surveyId);

        createQuestions(formData);
    };

    const handleProjectChange = (value) => {
        
        setSelectedProjectId(value); // Update selected project ID when a project is selected
        setCurrentPageSurvey(1); // Reset survey pagination when project changes
    };

    const CustomDropdown = (menu) => (
        <div>
            {menu}
            <Pagination
                className="custom-pagination-all py-4"
                current={currentPage}
                pageSize={pageSize}
                total={projects?.data?.total}
                onChange={handlePageChange}
                style={{ textAlign: 'center', marginTop: 10 }}
            />
        </div>
    );

    const CustomDropdownSurvey = (menu) => (
        <div>
            {menu}
            <Pagination
                className="custom-pagination-all py-4"
                current={currentPageSurvey}
                pageSize={pageSize}
                total={surveys?.data?.total}
                onChange={handlePageChangeSurvey}
                style={{ textAlign: 'center', marginTop: 10 }}
            />
        </div>
    );

    return (
        <div className="questions">
            <div className="between-center px-3 my-2 pt-5">
                <div className="start-center gap-2 mb-3 p-5">
                    <Link to={-1} className="bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white">
                        <IoArrowBackSharp />
                        back
                    </Link>
                    <p className="text-xl">Company Manage</p>
                </div>
            </div>
            <Form
                layout="vertical"
                onFinish={onFinish}
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="projectId"
                        label="Project Name"
                        rules={[{ required: true, message: 'Project Name is required' }]}
                    >
                        <Select
                            className="w-full h-[42px]"
                            placeholder="Select A Projects"
                            dropdownRender={CustomDropdown}
                            options={projectOptions}
                            onChange={handleProjectChange} // Handle project selection
                        />
                    </Form.Item>
                    <Form.Item
                        name="surveyId"
                        label="Survey"
                        rules={[{ required: true, message: 'Survey Name is required' }]}
                    >
                        <Select
                            className="w-full h-[42px]"
                            placeholder="Select A Survey"
                            dropdownRender={CustomDropdownSurvey}
                            options={surveyOptions}
                        />
                    </Form.Item>
                </div>
                <div className="w-full bg-white p-2 rounded-md">
                    <div className="w-fit mx-auto">
                        <p className="text-center py-4 pt-10 text-xl font-semibold uppercase">Add Questions</p>
                        <Form.List name="questions">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space
                                            key={key}
                                            style={{ display: 'flex', marginBottom: 8 }}
                                        >
                                            <Form.Item
                                                label={`Question no. ${key + 1}-(English)`}
                                                {...restField}
                                                name={[name, 'englishQuestions']}
                                                rules={[{ required: true, message: 'Please input question or delete this field' }]}
                                            >
                                                <Input
                                                    style={{ width: '400px' }}
                                                    className="h-[42px]"
                                                    placeholder="Question in English"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label={key === 0 ? 'Add Comment' : ' '}
                                                {...restField}
                                                name={[name, 'comment']}
                                                rules={[{ required: false }]}
                                            >
                                                <Select
                                                    className="min-w-32 w-32 h-[42px]"
                                                    defaultValue="disable"
                                                    options={[
                                                        { value: 'enable', label: 'Enable' },
                                                        { value: 'disable', label: 'Disable' },
                                                    ]}
                                                />
                                            </Form.Item>
                                            <CiCircleMinus className="cursor-pointer" onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="none"
                                            onClick={() => add()}
                                            className="text-[#ECB206] text-5xl ml-auto"
                                            icon={<CiCirclePlus />}
                                        />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </div>
                    <div className="text-center mb-10">
                        <button
                            htmlType="submit"
                            className="px-10 py-2 bg-[var(--color-2)] text-white font-semibold rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default AddQuestions;
