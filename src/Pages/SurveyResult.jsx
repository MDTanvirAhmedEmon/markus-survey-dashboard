import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { ConfigProvider, Form, Input, Pagination, Select, Spin, Tag } from "antd";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useGetProjectForManageCompanyQuery, useGetSurveyForEventQuery, useGetSurveyForManageCompanyQuery } from "../redux/features/questions/questionsApi";
import { useGetAllSurveyCommentsQuery, useGetSurveyResultReportQuery } from "../redux/features/survey/surveyApi";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SurveyResultImages from "./SurveyResultImages";
import hugeSmile from "../assets/images/smile.png"
import smile from "../assets/images/blushing.png"
import sad from "../assets/images/sad.png"
import silent from "../assets/images/silent.png"
import angry from "../assets/images/angry.png"
import star from "../assets/images/star.png"




const SurveyResult = () => {

    const [currentPage, setCurrentPage] = useState(1);

    // this pagination for survey result page
    const [currentSurveyPage, setCurrentSurveyPage] = useState(1);


    const [selectedProject, setSelectedProject] = useState(null);

    const [selectedSurvey, setSelectedSurvey] = useState(null);



    const [currentPageSurvey, setCurrentPageSurvey] = useState(1);
    const pageSize = 10;

    const { data: projects } = useGetProjectForManageCompanyQuery({
        page: currentPage
    });

    const options = projects?.data?.data?.map(project => ({
        value: project.id,
        label: project.project_name
    }));

    const { data: surveys } = useGetSurveyForEventQuery({
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


    // fetching Result Report
    const { data: reportData, isLoading } = useGetSurveyResultReportQuery(
        selectedProject && selectedSurvey && { project_id: selectedProject, survey_id: selectedSurvey, page: currentSurveyPage },
    );


    const onFinish = (values) => {
        console.log(values);
    };
    const data = ['https://i.ibb.co/0sF5Fk3/images-19.jpg', 'https://i.ibb.co/YpR8Mbw/Ellipse-307.png', 'https://i.ibb.co/JFZhZ7m/Ellipse-311.png', 'https://i.ibb.co/5cXN4Bw/Ellipse-310.png', 'https://i.ibb.co/gz2CbVj/1-intro-photo-final.jpg', 'https://i.ibb.co/7xc44sq/profile-picture-smiling-young-african-260nw-1873784920.webp', 'https://i.ibb.co/sQPHfnR/images-20.jpg']

    // pdf
    const printRef = useRef(null);
    const handleExportAsPDF = async () => {
        const inputData = printRef.current;
        try {
            const canvas = await html2canvas(inputData);
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "px",
                format: "a4",
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = imgWidth / imgHeight;

            let heightLeft = imgHeight;
            let position = 0;

            // Limit to two pages
            const maxPages = 2;
            let pagesAdded = 0;

            while (heightLeft > 0 && pagesAdded < maxPages) {
                const currentHeight = Math.min(pdfHeight, heightLeft);
                const canvasWidth = currentHeight * ratio;

                pdf.addImage(
                    imgData,
                    "PNG",
                    0,
                    position,
                    pdfWidth,
                    currentHeight * (pdfWidth / canvasWidth)
                );

                heightLeft -= pdfHeight;
                position -= pdfHeight;

                pagesAdded++;

                if (heightLeft > 0 && pagesAdded < maxPages) {
                    pdf.addPage();
                }
            }

            pdf.save("survey.pdf");
        } catch (error) {
            console.log(error);
        }
    };

    const handelGetImage = (id) => {
        // get all survey comment for image
        const { data: comments } = useGetAllSurveyCommentsQuery({
            id,
            page: 1,
            search: "",
        });
    }

    return (
        <>
            <div className='between-center px-3 my-2 pt-5 '>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1}
                        className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link>
                    <p className='text-xl'>All Survey Result</p>
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
                                onChange={setSelectedProject}
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
                                onChange={setSelectedSurvey}
                                options={surveyOptions}
                            />
                        </Form.Item>
                    </Form>
                </div>


                <div className=" flex justify-between mb-6 mr-6">
                    <p className="ml-2">All Survey Questions </p>

                    {
                        reportData?.emoji_or_star === "star" &&
                        <div div className=" flex items-center gap-10">
                            <div className="flex items-center">
                                <Tag className=" h-6 w-6" color="#ECB206"></Tag>
                                <img className="w-6" src={star} alt="" />
                                <img className="w-6" src={star} alt="" />
                                <img className="w-6" src={star} alt="" />
                                <img className="w-6" src={star} alt="" />
                                <img className="w-6" src={star} alt="" />
                            </div>
                            <div className="flex items-center">
                                <Tag className=" h-6 w-6" color="#1E3042"></Tag>
                                <img className="w-6" src={star} alt="" />
                                <img className="w-6" src={star} alt="" />
                                <img className="w-6" src={star} alt="" />
                                <img className="w-6" src={star} alt="" />
                            </div>
                            <div className="flex items-center">
                                <Tag className=" h-6 w-6" color="#F9E7B2"></Tag>
                                <img className="w-6" src={star} alt="" />
                                <img className="w-6" src={star} alt="" />
                                <img className="w-6" src={star} alt="" />
                            </div>
                            <div className="flex items-center">
                                <Tag className=" h-6 w-6" color="#85714D"></Tag>
                                <img className="w-6" src={star} alt="" />
                                <img className="w-6" src={star} alt="" />
                            </div>
                            <div className="flex items-center">
                                <Tag className=" h-6 w-6" color="#533E02"></Tag>
                                <img className="w-6" src={star} alt="" />
                            </div>
                        </div>
                    }

                    {
                        reportData?.emoji_or_star === "emoji" &&
                        <div className=" flex items-center gap-10">
                            <div className="flex items-center">
                                <Tag className=" h-6 w-6" color="#ECB206"></Tag>
                                <img className="w-10" src={hugeSmile} alt="" />
                            </div>
                            <div className="flex items-center">
                                <Tag className=" h-6 w-6" color="#1E3042"></Tag>
                                <img className="w-10" src={smile} alt="" />
                            </div>
                            <div className="flex items-center">
                                <Tag className=" h-6 w-6" color="#F9E7B2"></Tag>
                                <img className="w-11" src={sad} alt="" />
                            </div>
                            <div className="flex items-center">
                                <Tag className=" h-6 w-6" color="#85714D"></Tag>
                                <img className="w-10" src={silent} alt="" />
                            </div>
                            <div className="flex items-center">
                                <Tag className=" h-6 w-6" color="#533E02"></Tag>
                                <img className="w-10" src={angry} alt="" />
                            </div>
                        </div>
                    }
                </div>


                {
                    isLoading ? (
                        <div className='h-[400px] flex items-center justify-center'>
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
                    ) : reportData ? (
                        <div>
                            <div className="p-10" ref={printRef}>
                                {reportData?.data?.map((question, index) => (
                                    <div className="" key={index}>
                                        <div className="flex">
                                            <div className="w-[40%]">
                                                {`${(currentSurveyPage - 1) * pageSize + index + 1}. ${question?.question}`}
                                            </div>
                                            <div className="w-[60%]">
                                                <div>
                                                    <div className="h-12 bg-red-500 flex">
                                                        <div
                                                            className="bg-[#ECB206] h-12 flex items-center justify-center"
                                                            style={{ width: `${question.option_percentages[1]}%` }}
                                                        >
                                                            {question.option_percentages[1] !== 0 && (
                                                                <p className="text-white">{question.option_percentages[1]}%</p>
                                                            )}
                                                        </div>
                                                        <div
                                                            className="bg-[#1E3042] h-12 flex items-center justify-center"
                                                            style={{ width: `${question.option_percentages[2]}%` }}
                                                        >
                                                            {question.option_percentages[2] !== 0 && (
                                                                <p className="text-white">{question.option_percentages[2]}%</p>
                                                            )}
                                                        </div>
                                                        <div
                                                            className="bg-[#F9E7B2] h-12 flex items-center justify-center"
                                                            style={{ width: `${question.option_percentages[3]}%` }}
                                                        >
                                                            {question.option_percentages[3] !== 0 && (
                                                                <p className="text-black">{question.option_percentages[3]}%</p>
                                                            )}
                                                        </div>
                                                        <div
                                                            className="bg-[#85714D] h-12 flex items-center justify-center"
                                                            style={{ width: `${question.option_percentages[4]}%` }}
                                                        >
                                                            {question.option_percentages[4] !== 0 && (
                                                                <p className="text-white">{question.option_percentages[4]}%</p>
                                                            )}
                                                        </div>
                                                        <div
                                                            className="bg-[#533E02] h-12 flex items-center justify-center"
                                                            style={{ width: `${question.option_percentages[5]}%` }}
                                                        >
                                                            {question.option_percentages[5] !== 0 && (
                                                                <p className="text-white">{question.option_percentages[5]}%</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-lg font-semibold">Overall survey {question?.overall_survey}</p>
                                                        <p className="text-[#ECB206]">QR Code {question?.qr_code_survey} Use App {question?.app_survey_count}</p>
                                                        <p className="text-lg font-semibold">User Comments {question?.total_comments}+</p>
                                                        <div className="flex justify-center items-center mb-8 mt-6">

                                                            <SurveyResultImages id={question?.question_id} ></SurveyResultImages>
                                                        </div>
                                                        <Link to={`/all-survey-comments/${question?.question_id}`} >
                                                            <p className="text-lg text-[#ECB206]">View All</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center my-6">
                                <button onClick={handleExportAsPDF} className="text-white bg-[#ECB206] px-16 py-4 shadow rounded">
                                    Export
                                </button>
                            </div>
                            <div className="py-10">
                                <Pagination
                                    className="custom-pagination-all"
                                    current={currentSurveyPage}
                                    pageSize={pageSize}
                                    total={reportData?.pagination?.total}
                                    onChange={handleCurrentSurveyPage}
                                />
                            </div>
                        </div>

                    ) : (
                        <div className="h-[300px] w-full flex justify-center items-center">
                            <p className="text-3xl text-black">Please Select A Project & A Survey</p>
                        </div>
                    )
                }

            </div >
        </>
    )
}

export default SurveyResult;
