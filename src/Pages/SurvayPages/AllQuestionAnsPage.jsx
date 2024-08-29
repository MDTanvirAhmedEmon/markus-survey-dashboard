import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import smile from "../../assets/images/smile.png";
import angry from "../../assets/images/angry.png";
import silent from "../../assets/images/silent.png";
import sad from "../../assets/images/sad.png";
import blushing from "../../assets/images/blushing.png";
import starImage from "../../assets/images/star.png";
import { useGetAllQnAnsQuery } from "../../redux/features/company/company";
// import translateText from "../../translateText";
// import { useGetAllQnAnsQuery } from "../../redux/api/baseapi";

export default function AllQuestionAnsPage() {
  const selectedlanguage = localStorage.getItem("language") || "de";
  const [translatedQuestions, setTranslatedQuestions] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  // RTK Query for all question:
  const { survey_id } = useParams();
  const { data: allQn, error, isLoading } = useGetAllQnAnsQuery(survey_id);

  const { language = selectedlanguage } = location.state || {};
  const ans = allQn?.answers || [];
  const emoji = allQn?.emoji_or_star === "emoji";


  useEffect(() => {
    const translateAllQuestions = async () => {
      if (!ans.length) return;
      const translations = await Promise.all(
        ans.map(async (answer) => {
          const translated = await translateText(
            answer?.question?.question_en || "",
            language,
            import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY
          );
          return {
            id: answer.question_id,
            text: translated || answer.question?.question_en,
          };
        })
      );

      const translationsObj = translations.reduce((acc, { id, text }) => {
        acc[id] = text;
        return acc;
      }, {});

      setTranslatedQuestions(translationsObj);
    };

    translateAllQuestions();
  }, [ans, language]);

  const handleDoneButton = () => {
    navigate("/thankYouPage", { replace: true });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <div className="container mx-auto mt-5 p-5">
      <div className="flex items-center">
        <FaArrowLeft
          className="mt-5 mb-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl flex items-end justify-center w-full mt-5 mb-5">
          All Results
        </h1>
      </div>
      <div className="space-y-2">
        <p>
          Company Name:
          <span className="text-[#ecb206] pl-2">Creative IT Institute</span>
        </p>
        <p>
          Project Name:
          <span className="text-[#ecb206] pl-2">Employee Feedback</span>
        </p>
        <p>
          Survey Name:
          <span className="text-[#ecb206] pl-2"> Survey No 01</span>
        </p>
        <p>
          Total Questions:
          <span className="text-[#ecb206] pl-2">{ans.length}</span>
        </p>
      </div>
      <div>
        {ans.length === 0 ? (
          <p>No questions available.</p>
        ) : (
          ans.map(({ question_id, answer, question, comment }) => (
            <div key={question_id} className="my-5 p-2">
              <h2 className="py-3 text-[#4B4C53]">
                Question ID {question_id} :
                <span className="pl-2">
                  {translatedQuestions[question_id] || question?.question_en}
                </span>
              </h2>

              <p className="mb-2">
                <span className="pr-2">Ans :</span>
                {answer ? (
                  emoji ? (
                    <>
                      {answer === "😠" && (
                        <img
                          src={angry}
                          alt="angry emoji"
                          className="inline-block h-6"
                        />
                      )}
                      {answer === "🤐" && (
                        <img
                          src={silent}
                          alt="silent emoji"
                          className="inline-block h-6"
                        />
                      )}
                      {answer === "😢" && (
                        <img
                          src={sad}
                          alt="sad emoji"
                          className="inline-block h-6"
                        />
                      )}
                      {answer === "😊" && (
                        <img
                          src={smile}
                          alt="smile emoji"
                          className="inline-block h-6"
                        />
                      )}
                      {answer === "🥰" && (
                        <img
                          src={blushing}
                          alt="blushing emoji"
                          className="inline-block h-6"
                        />
                      )}
                    </>
                  ) : (
                    [...Array(answer === "⭐")].map((_, i) => (
                      <img
                        key={i}
                        src={starImage}
                        alt="star"
                        className="inline-block h-6"
                      />
                    ))
                  )
                ) : (
                  "No answer provided"
                )}
              </p>
              <p>Comment: {comment ? comment : "No comment provided"}</p>
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
