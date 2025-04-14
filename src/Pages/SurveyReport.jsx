import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { ConfigProvider, Modal, Spin, Table } from "antd";
import {
  useGetAllQuestionsQuery,
  useGetQuestionStatisticsQuery,
} from "../redux/features/Settings/Settings.js";
import { FaRegEye } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const SurveyReport = () => {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const [questionId, setQuestionId] = useState();
  const { data: getAllQuestions, isLoading } = useGetAllQuestionsQuery(id);
  const { data: getStatistics } = useGetQuestionStatisticsQuery(
    { surveyId: id, questionId: questionId },
    { skip: !id || !questionId }
  );

  // console.log("id", id , "question", questionId);


  const datas = getStatistics?.monthly_ratings?.map((mon , i)=>{
    return {
        name : mon?.month,
        average : mon?.avg_rating
    }
  })


 

  if (isLoading) {
    return (
      <div className="h-[600px] w-full flex justify-center items-center">
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
    );
  }

  const questionData = getAllQuestions?.questions?.map((question) => {
    return {
      id: question?.id,
      question: question?.question_en,
    };
  });

  const columns = [
    {
      title: "Questions Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Questions Name",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div
          onClick={() => {
            setQuestionId(record?.id);
            setOpenModal(true);
          }}
          className="start-center text-2xl gap-1"
        >
          <FaRegEye className="cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[var(--color-7)] p-4 rounded-md">
      <div className="between-center px-3 my-2 pt-5 pb-5">
        <div className="start-center gap-2 mb-3 p-5">
          <Link
            to={-1}
            className="bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white"
          >
            <IoArrowBackSharp />
            back
          </Link>
          <p className="text-xl">All Questions</p>
        </div>
      </div>

      <Table dataSource={questionData} columns={columns} pagination={false} />

      <Modal
        centered
        footer={false}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        width={1100}
      >
        <p className="text-center text-xl">Question Statistics</p>

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={300} data={datas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis  tickFormatter={(value) => Math.round(value)} allowDecimals={false}  />
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
    </div>
  );
};
export default SurveyReport;
