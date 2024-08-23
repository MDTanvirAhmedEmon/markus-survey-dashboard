import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { Form, Input, Pagination, Select, Tag } from "antd";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useGetProjectForManageCompanyQuery, useGetSurveyForManageCompanyQuery } from "../redux/features/questions/questionsApi";

const SurveyResult = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentSurveyPage, setCurrentSurveyPage] = useState(1);


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
    const handleCurrentSurveyPage = (page) => {
        setCurrentSurveyPage(page);
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
    const data = ['https://i.ibb.co/0sF5Fk3/images-19.jpg', 'https://i.ibb.co/YpR8Mbw/Ellipse-307.png', 'https://i.ibb.co/JFZhZ7m/Ellipse-311.png', 'https://i.ibb.co/5cXN4Bw/Ellipse-310.png', 'https://i.ibb.co/gz2CbVj/1-intro-photo-final.jpg', 'https://i.ibb.co/7xc44sq/profile-picture-smiling-young-african-260nw-1873784920.webp', 'https://i.ibb.co/sQPHfnR/images-20.jpg']

    return (
        <>
            <div className='between-center px-3 my-2 pt-5 '>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1}
                        className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link>
                    <p className='text-xl'>All Survey Result</p>
                </div>
                <div className='end-center gap-2'>
                    <Input className='max-w-[400px] h-10' prefix={<CiSearch className='text-2xl' />}
                        placeholder="Search" />
                </div>
            </div>


            <div className=" px-4">
                <div className="w-[800px]">
                    <Form onFinish={onFinish} className="flex gap-5">
                        <Form.Item
                            className="w-full"
                            name="projectId"
                            label="Project Name"
                            labelCol={{ span: 24 }} // Set label to occupy full width
                            wrapperCol={{ span: 24 }} // Set wrapper to occupy full width
                            rules={[
                                {
                                    message: 'Project Id is required',
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                className="w-full h-[42px]"
                                placeholder="Select A Project"
                                dropdownRender={CustomDropdown}
                                options={options}
                            />
                        </Form.Item>
                        <Form.Item
                            className="w-full"
                            name="surveyId"
                            label="Survey Name"
                            labelCol={{ span: 24 }} // Set label to occupy full width
                            wrapperCol={{ span: 24 }} // Set wrapper to occupy full width
                            rules={[
                                {
                                    message: 'Survey Id is required',
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                className="w-full h-[42px]"
                                placeholder="Select A Survey"
                                dropdownRender={CustomDropdownSurvey}
                                options={surveyOptions}
                            />
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <div className=" flex justify-between mb-6">
                        <p>All Survey Questions (1-10)</p>
                        <div className=" flex items-center gap-5">
                            <div>
                                <Tag className=" h-4" color="#ECB206"></Tag>
                                Very Satisfied
                            </div>
                            <div>
                                <Tag className=" h-4" color="#1E3042"></Tag>
                                Satisfied
                            </div>
                            <div>
                                <Tag className=" h-4" color="#F9E7B2"></Tag>
                                Good
                            </div>
                            <div>
                                <Tag className=" h-4" color="#85714D"></Tag>
                                Bad
                            </div>
                            <div>
                                <Tag className=" h-4" color="#533E02"></Tag>
                                Angry
                            </div>
                        </div>
                    </div>
                    <div className=" flex">
                        <div className=" w-[40%]">1.How satisfied are you with your current work environment?</div>
                        <div className=" w-[60%]">
                            <div>
                                <div className="h-12 bg-slate-400 flex">
                                    <div className=" bg-[#ECB206] w-[40%] h-12 flex items-center justify-center"><p className="text-white">40%</p></div>
                                    <div className=" bg-[#1E3042] w-[20%] h-12 flex items-center justify-center"><p className="text-white">20%</p></div>
                                    <div className=" bg-[#F9E7B2] w-[10%] h-12 flex items-center justify-center"><p className="text-black">10%</p></div>
                                    <div className=" bg-[#85714D] w-[20%] h-12 flex items-center justify-center"><p className="text-white">20%</p></div>
                                    <div className=" bg-[#533E02] w-[10%] h-12 flex items-center justify-center"><p className="text-white">10%</p></div>
                                </div>
                                <div className=" flex items-center  justify-between">
                                    <p className=" text-lg font-semibold">Over all survey 500</p>
                                    <p className=" text-[#ECB206]">QR Code 250 Use App 250</p>
                                    <p className=" text-lg font-semibold">User Comments 200+</p>

                                    <div className='flex justify-center items-center mb-8 mt-6'>
                                        {
                                            data.map(item => <img className='w-10 h-10 rounded-full -ml-4' key={item} src={item} alt="" />)
                                        }

                                    </div>

                                    <p className=" text-lg text-[#ECB206]">View All</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center mt-8">
                    <button className=" text-white bg-[#ECB206] px-16 py-4 shadow rounded">Export</button>
                </div>
                <div className="py-10">
                    <Pagination
                        className="custom-pagination-all"
                        current={currentSurveyPage}
                        pageSize={pageSize}
                        total={50}
                        onChange={handleCurrentSurveyPage}
                    />
                </div>
            </div>
        </>
    )
}

export default SurveyResult;
