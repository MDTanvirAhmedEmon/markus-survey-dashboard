import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import smile from "../../assets/images/smile.png";
import angry from "../../assets/images/angry.png";
import silent from "../../assets/images/silent.png";
import sad from "../../assets/images/sad.png";
import blushing from "../../assets/images/blushing.png";
import starImage from "../../assets/images/star.png";
import { useGetAllQnAnsQuery, useGetSurveyBasedInfoQuery } from "../../redux/features/company/company";
import translateText from "../../TranslateText";
// import translateText from "../../translateText";
// import { useGetAllQnAnsQuery } from "../../redux/api/baseapi";

export default function AllQuestionAnsPage() {
  const selectedlanguage = localStorage.getItem("language") || "de";
  const [translatedQuestions, setTranslatedQuestions] = useState({});
  const [unique_id , setunique_id] = useState(sessionStorage.getItem('uniqueId'))
  const navigate = useNavigate();
  const location = useLocation();
  // RTK Query for all question:
  const { survey_id } = useParams();
  const { data: allQn, error, isLoading } = useGetAllQnAnsQuery(survey_id);

  // get info about survey and project
  // let unique_id = ''


 
  const { data } = useGetSurveyBasedInfoQuery({ id: survey_id, unique_id });

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
    sessionStorage.removeItem('uniqueId')
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;



  return (
    <div className="container mx-auto mt-5 p-5">
      <div className="flex items-center">
        {/* <FaArrowLeft
          className="mt-5 mb-5 cursor-pointer"
          onClick={() => navigate(-1)}
        /> */}
        <h1 className="text-3xl flex items-end justify-center w-full mt-5 mb-5">
          All Results
        </h1>
      </div>
      <div className="space-y-2">
        <p>
          Company Name:
          <span className="text-[#ecb206] pl-2">{data?.company_name}</span>
        </p>
        <p>
          Project Name:
          <span className="text-[#ecb206] pl-2">{data?.project_name}</span>
        </p>
        <p>
          Survey Name:
          <span className="text-[#ecb206] pl-2">{data?.survey_name}</span>
        </p>
        <p>
          Total Questions:
          <span className="text-[#ecb206] pl-2">{allQn.total_questions}</span>
        </p>
      </div>
      <div>
        {data?.answers?.slice().reverse().map(ans => (
          <div className="mt-2">
            <p><span className="font-medium">Question :</span> {ans?.question?.question_en}</p>
            <p className="pb-2"><span className="font-medium">Answer :</span>
              {
                ans?.answer === "😠" && <><img
                  src={angry}
                  alt="angry emoji"
                  className="inline-block h-6"
                /></>

              }
              {
                ans?.answer === "🤐" && <> <img
                  src={silent}
                  alt="silent emoji"
                  className="inline-block h-6"
                /></>
              }
              {
                ans?.answer === "😢" && <>  <img
                  src={sad}
                  alt="sad emoji"
                  className="inline-block h-6"
                /></>
              }
              {
                ans?.answer === "😊" && <>  <img
                  src={smile}
                  alt="smile emoji"
                  className="inline-block h-6"
                /></>
              }
              {
                ans?.answer === "🥰" && <> <img
                  src={blushing}
                  alt="blushing emoji"
                  className="inline-block h-6"
                /></>
              }
              {
                ans?.answer === "5⭐" && <><p className="inline-block">⭐⭐⭐⭐⭐</p></>
              }
              {
                ans?.answer === "4⭐" && <><p className="inline-block">⭐⭐⭐⭐</p></>
              }
              {
                ans?.answer === "3⭐" && <><p className="inline-block">⭐⭐⭐</p></>
              }
              {
                ans?.answer === "2⭐" && <><p className="inline-block">⭐⭐</p></>
              }
              {
                ans?.answer === "1⭐" && <><p className="inline-block">⭐</p></>
              }
            </p>
            <p>
              <span className="font-medium">Comment :</span> <span>{ans?.comment || 'No comment'}</span>
            </p>
          </div>
        ))}
       
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
