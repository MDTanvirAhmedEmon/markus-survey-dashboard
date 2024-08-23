import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { Form, Input, Pagination, Select } from "antd";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useGetProjectForManageCompanyQuery, useGetSurveyForManageCompanyQuery } from "../redux/features/questions/questionsApi";

const SurveyResult = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSurvey, setCurrentPageSurvey] = useState(1);
    const pageSize = 10;

    const { data: projects } = useGetProjectForManageCompanyQuery({
        page: currentPage
    });

    const options = projects?.data?.data?.map(project => ({
        value: project.id,
        label: project.project_name
    }));

    const { data: surveys } = useGetSurveyForManageCompanyQuery({
        page: currentPageSurvey
    });

    const surveyOptions = surveys?.data?.data?.map(survey => ({
        value: survey.id,
        label: survey.survey_name
    }));

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageChangeSurvey = (page) => {
        setCurrentPageSurvey(page);
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

    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <>
            <div className='between-center px-3 my-2 pt-5 '>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1}
                        className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link>
                    <p className='text-xl'>All Survey Result</p>
                </div>
                <div className='end-center gap-2'>
                    <Input className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />}
                        placeholder="Search" />
                </div>
            </div>

            <div className="w-[700px]">
                <Form onFinish={onFinish} className="flex gap-5 items-center">
                    <Form.Item
                        className="w-1/2"
                        name="projectId"
                        label="Project Id"
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
                        />
                    </Form.Item>
                    <Form.Item
                        className="w-1/2"
                        name="surveyId"
                        label="Survey Id"
                        rules={[
                            {
                                message: 'Survey Id is required',
                                required: true
                            }
                        ]}
                    >
                        <Select className='w-full h-[42px]'
                            placeholder="Select A Survey"
                            dropdownRender={CustomDropdownSurvey}
                            options={surveyOptions}
                        />
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default SurveyResult;
