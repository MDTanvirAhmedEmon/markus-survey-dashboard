import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AllQuestionAnsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { questions, answers } = location.state || { questions: [], answers: {} };

  const handleDoneButton = () => {
    navigate("/thankYouPage");
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="flex items-center">
        <FaArrowLeft
          className="mt-10 mb-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl flex items-end justify-center w-full mt-10 mb-5">
          All Results
        </h1>
      </div>
      <div className="space-y-2">
        <p>
          Company Name:{" "}
          <span className="text-[#ecb206] pl-2">Creative IT Institute</span>{" "}
        </p>
        <p>
          Project Name:
          <span className="text-[#ecb206] pl-2">Employee Feedback</span>{" "}
        </p>
        <p>
          Survey Name:
          <span className="text-[#ecb206] pl-2"> Survey No 01</span>
        </p>
        <p>
          Total Questions:
          <span className="text-[#ecb206] pl-2">{questions.length}</span>{" "}
        </p>
      </div>
      <div>
        {questions.length === 0 ? (
          <p>No questions available.</p>
        ) : (
          questions.map((question, index) => (
            <div key={question.id} className="my-5 p-2">
              <h2 className="py-3 text-[#4B4C53]">
  Question no {index + 1}: <span className="pl-2">{t(`questions.${question.id}`)}</span>
</h2>

              <p className="mb-2">
                <span className="pr-2">Ans:</span> {answers[question.id] || 'No answer provided'}
              </p>
              <hr className="border-t border-gray-300" />
            </div>
          ))
        )}
      </div>
      <button
        className="py-2 w-full md:w-44 bg-[#ecb206] text-white rounded-md mt-12 mb-10"
        onClick={handleDoneButton}
      >
        Done
      </button>
    </div>
  );
}