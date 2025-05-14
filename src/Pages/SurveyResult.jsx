import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  ConfigProvider,
  Form,
  Modal,
  Pagination,
  Select,
  Spin,
  Tag,
} from "antd";
import { useState } from "react";
import {
  useGetProjectForManageCompanyQuery,
  useGetSurveyForEventQuery,
  useGetSurveyForManageCompanyQuery,
} from "../redux/features/questions/questionsApi";
import {
  useGetAllSurveyCommentsQuery,
  useGetCsvReportQuery,
  useGetSurveyResultReportQuery,
} from "../redux/features/survey/surveyApi";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SurveyResultImages from "./SurveyResultImages";
import hugeSmile from "../assets/images/smile.png";
import smile from "../assets/images/blushing.png";
import sad from "../assets/images/sad.png";
import silent from "../assets/images/silent.png";
import angry from "../assets/images/angry.png";
import { CSVLink } from "react-csv";
import { FaStar } from "react-icons/fa6";
import { useGetProfileQuery } from "../redux/features/auth/authApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetQuestionStatisticsQuery } from "../redux/features/Settings/Settings";

const SurveyResult = () => {
  const { data: getUser } = useGetProfileQuery() || {};

  const [showExpired, setShowExpired] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openChartModal, setOpenChartModal] = useState(false);
  const [questionId, setQuestionId] = useState();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const pageSize = 10;

  const handleCheckboxChange = () => {
    setShowExpired((prev) => (prev === 1 ? 0 : 1));
  };

  const [currentPage, setCurrentPage] = useState(1);

  // console.log(getUser?.user?.anonymous);

  const { data } = useGetAllSurveyCommentsQuery({
    id: questionId,
    page: currentPage,
  });

  // this pagination for survey result page
  const [currentSurveyPage, setCurrentSurveyPage] = useState(1);

  const [selectedProject, setSelectedProject] = useState();

  const [selectedSurvey, setSelectedSurvey] = useState();

  const [currentPageSurvey, setCurrentPageSurvey] = useState(1);
  const { data: getStatistics } = useGetQuestionStatisticsQuery(
    { surveyId: selectedSurvey, questionId: questionId },
    { skip: !selectedSurvey || !questionId }
  );

  const datas = getStatistics?.monthly_ratings?.map((mon, i) => {
    return {
      name: mon?.month,
      average: mon?.avg_rating?.toFixed(2),
    };
  });

  const { data: projects } = useGetProjectForManageCompanyQuery({
    page: currentPage,
  });

  const options = projects?.data?.data?.map((project) => ({
    value: project.id,
    label: project.project_name,
  }));





  const { data: surveysdata } = useGetSurveyForManageCompanyQuery({
    page: currentPageSurvey,
    project_id: selectedProject,
    showExpired,
  });

  const { data: surveys } = useGetSurveyForEventQuery({
    page: currentPageSurvey,
  });

  const surveyOptions = surveysdata?.data?.data?.map((survey) => ({
    value: survey.id,
    label: survey.survey_name,
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
        style={{ textAlign: "center", marginTop: 10 }}
      />
    </div>
  );

  // console.log(surveys?.data);

  const CustomDropdownSurvey = (menu) => (
    <div>
      {menu}
      <Pagination
        className="custom-pagination-all py-4"
        current={currentPageSurvey}
        pageSize={pageSize}
        total={surveysdata?.data?.total}
        onChange={handlePageChangeSurvey}
        style={{ textAlign: "center", marginTop: 10 }}
      />
    </div>
  );

  // fetching Result Report
  const { data: reportData, isLoading } = useGetSurveyResultReportQuery(
    selectedProject &&
      selectedSurvey && {
        project_id: selectedProject,
        survey_id: selectedSurvey,
        page: currentSurveyPage,
      }
  );

  const { data: getCsvReport } = useGetCsvReportQuery(
    selectedProject &&
      selectedSurvey && {
        project_id: selectedProject,
        survey_id: selectedSurvey,
        is_anonymous : getUser?.user?.anonymous
      }
  );
// console.log(getUser?.user?.anonymous);
  const stripHtml = (htmlString) => {
    const div = document.createElement("div");
    div.innerHTML = htmlString;
    return div.textContent || div.innerText || "";
  };

  const formattedCsv = getCsvReport?.data?.map((item) => ({
    Participant: `${item.participant}`,
    "Project Name": item.project_name,
    "Survey Name": item.survey_name,
    "Question Number": `QN.${item.qn}`,
    Question: item.question,
    "Question ID": item.question_id,
    Date: item?.date,
    Time: item?.time,
    Score: item.answer_score,
    "Vote Emoji": stripHtml(item.emoji),
    "Comment (Text)": item.comment,
    "Participation Via": item.via,
  }));

  const onFinish = (values) => {
    console.log(values);
  };

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

  // console.log(reportData);

  const handelGetImage = (id) => {
    // get all survey comment for image
    const { data: comments } = useGetAllSurveyCommentsQuery({
      id,
      page: 1,
      search: "",
    });
  };

  return (
    <>
      <div className="between-center px-3 my-2 pt-5 ">
        <div className="start-center gap-2 mb-3 p-5">
          <Link
            to={-1}
            className="bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white"
          >
            <IoArrowBackSharp />
            back
          </Link>
          <p className="text-xl">All Survey Result</p>
        </div>
      </div>

      <div className=" px-4">
        <div className="w-[800px]">
          <Form onFinish={onFinish} className="flex gap-5">
            <Form.Item
              className="w-full"
              name="projectId"
              label="Project Name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  message: "Project Id is required",
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
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  message: "Survey Id is required",
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

        <div className="flex items-center space-x-2 mb-5">
          <input
            type="checkbox"
            id="hideExpired"
            checked={showExpired === 0}
            onChange={handleCheckboxChange}
            className="w-4 h-4"
          />
          <label htmlFor="hideExpired" className="text-sm ">
            Don't show expired surveys
          </label>
        </div>

        <div className=" flex justify-between mb-6 mr-6">
          <p className="ml-2">All Survey Questions </p>

          {reportData?.emoji_or_star === "star" && (
            <div className=" flex items-center gap-10">
              <div className="flex items-center">
                <Tag className=" h-6 w-6 bg-[#FF0000]"></Tag>
                {/* <img className="w-6 bg-red-400" src={star} alt="" /> */}
                <FaStar size={26} className="text-[#FF0000]" />
              </div>
              <div className="flex items-center">
                <Tag className=" h-6 w-6" color="#ff9100"></Tag>
                <FaStar size={26} className="text-[#ff9100]" />
                <FaStar size={26} className="text-[#ff9100]" />
              </div>

              <div className="flex items-center">
                <Tag className=" h-6 w-6" color="#FFD500"></Tag>
                <FaStar size={26} className="text-[#FFD500]" />
                <FaStar size={26} className="text-[#FFD500]" />
                <FaStar size={26} className="text-[#FFD500]" />
              </div>
              <div className="flex items-center">
                <Tag className=" h-6 w-6" color="#B5D900"></Tag>
                <FaStar size={26} className="text-[#B5D900]" />
                <FaStar size={26} className="text-[#B5D900]" />
                <FaStar size={26} className="text-[#B5D900]" />
                <FaStar size={26} className="text-[#B5D900]" />
              </div>
              <div className="flex items-center">
                <Tag className=" h-6 w-6" color="#07CC00"></Tag>
                <FaStar size={26} className="text-[#07CC00]" />
                <FaStar size={26} className="text-[#07CC00]" />
                <FaStar size={26} className="text-[#07CC00]" />
                <FaStar size={26} className="text-[#07CC00]" />
                <FaStar size={26} className="text-[#07CC00]" />
              </div>
            </div>
          )}

          {reportData?.emoji_or_star === "emoji" && (
            <div className=" flex items-center gap-10">
              <div className="flex items-center">
                <Tag className=" h-6 w-6" color="#FF0000"></Tag>
                <img className="w-10" src={angry} alt="" />
              </div>
              <div className="flex items-center">
                <Tag className=" h-6 w-6" color="#ff9100"></Tag>
                <img className="w-11" src={sad} alt="" />
              </div>
              <div className="flex items-center">
                <Tag className=" h-6 w-6" color="#FFD500"></Tag>
                <img className="w-10" src={silent} alt="" />
              </div>
              <div className="flex items-center">
                <Tag className=" h-6 w-6" color="#B5D900"></Tag>
                <img className="w-10" src={smile} alt="" />
              </div>

              <div className="flex items-center">
                <Tag className=" h-6 w-6" color="#07CC00"></Tag>
                <img className="w-10" src={hugeSmile} alt="" />
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
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
                      {`${(currentSurveyPage - 1) * pageSize + index + 1}. ${
                        question?.question
                      }`}
                    </div>
                    <div className="w-[60%]">
                      <div>
                        <div className="h-12 bg-red-500 flex">
                          <div
                            className="bg-[#FF0000] h-12 flex items-center justify-center"
                            style={{
                              width: `${question.option_percentages[1]}%`,
                            }}
                          >
                            {question.option_percentages[1] !== 0 && (
                              <p className="text-white">
                                {question.option_percentages[1]?.toFixed(1)}%
                              </p>
                            )}
                          </div>

                          <div
                            className="bg-[#ff9100] h-12 flex items-center justify-center"
                            style={{
                              width: `${question.option_percentages[2]}%`,
                            }}
                          >
                            {question.option_percentages[2] !== 0 && (
                              <p className="text-white">
                                {question.option_percentages[2]?.toFixed(1)}%
                              </p>
                            )}
                          </div>

                          <div
                            className="bg-[#FFD500] h-12 flex items-center justify-center"
                            style={{
                              width: `${question.option_percentages[3]}%`,
                            }}
                          >
                            {question.option_percentages[3] !== 0 && (
                              <p className="text-black">
                                {question.option_percentages[3]?.toFixed(1)}%
                              </p>
                            )}
                          </div>
                          <div
                            className="bg-[#B5D900] h-12 flex items-center justify-center"
                            style={{
                              width: `${question.option_percentages[4]}%`,
                            }}
                          >
                            {question.option_percentages[4] !== 0 && (
                              <p className="text-white">
                                {question.option_percentages[4]?.toFixed(1)}%
                              </p>
                            )}
                          </div>
                          <div
                            className="bg-[#07CC00] h-12 flex items-center justify-center"
                            style={{
                              width: `${question.option_percentages[5]}%`,
                            }}
                          >
                            {question.option_percentages[5] !== 0 && (
                              <p className="text-white">
                                {question.option_percentages[5]?.toFixed(1)}%
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-semibold">
                            Overall survey {question?.overall_survey}
                          </p>
                          <p className="text-[#ECB206]">
                            QR Code {question?.qr_code_survey} Use App{" "}
                            {question?.app_survey_count}
                          </p>
                          <p className="text-lg font-semibold">
                            User Comments {question?.total_comments}+
                          </p>
                          <div className="flex justify-center items-center mb-8 mt-6">
                            <SurveyResultImages
                              id={question?.question_id}
                            ></SurveyResultImages>
                          </div>

                          <p
                            onClick={() => {
                              setQuestionId(question?.question_id);
                              setOpenModal(true);
                            }}
                            className="text-lg text-[#ECB206] cursor-pointer"
                          >
                            View All
                          </p>
                          <p
                            onClick={() => {
                              setQuestionId(question?.question_id);
                              setOpenChartModal(true);
                            }}
                            className="text-lg text-[#ECB206] cursor-pointer"
                          >
                            Chart
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center my-6">
              {formattedCsv && formattedCsv.length > 0 ? (
                <CSVLink
                  data={formattedCsv}
                  separator=";"
                  filename={"survey.csv"}
                  className="text-white bg-[#ECB206] px-16 py-4 shadow rounded"
                >
                  Export
                </CSVLink>
              ) : (
                <p>No data available to export</p>
              )}
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
            <p className="text-3xl text-black">
              Please Select A Project & A Survey
            </p>
          </div>
        )}
      </div>

      <Modal
        footer={false}
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
      >
        <p className="text-xl text-center">All Survey Comments</p>

        <div className="mx-4 bg-white py-8 rounded-md">
          {/* table head */}
          <div className=" w-full flex items-center justify-center gap-3 text-lg">
            <div className="w-[22%]">SL no.</div>
            <div className="w-[34%]">Comment</div>
            {!getUser?.user?.anonymous && (
              <>
                <div className="w-[22%]">User</div>
                <div className="w-[22%]">Email</div>
              </>
            )}
          </div>

          {/* table body */}
          {data?.data?.map((comment, index) => (
            <div
              key={index}
              className=" w-full flex  justify-center items-center gap-3 mt-10"
            >
              <div className="w-[22%]">0{index + 1}</div>
              <div className="w-[34%] pr-12">{comment?.comment}</div>
              {!getUser?.user?.anonymous && (
                <>
                  {" "}
                  <div className="w-[22%] flex gap-3 items-center">
                    <Avatar
                      size={45}
                      shape="circle"
                      className=" shadow"
                      src={`${imageUrl}${comment?.user?.image}`}
                    />{" "}
                    {comment?.user?.name}
                  </div>
                  <div className="w-[22%]">{comment?.user?.email}</div>
                </>
              )}
            </div>
          ))}
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
      </Modal>

      {/* Chart Modal */}

      <Modal
        centered
        footer={false}
        open={openChartModal}
        onCancel={() => setOpenChartModal(false)}
        width={1100}
      >
        <p className="text-center text-xl">Question Statistics</p>

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={300} data={datas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis
                tickFormatter={(value) => Math.round(value)}
                allowDecimals={false}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#ECB206"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </>
  );
};

export default SurveyResult;
