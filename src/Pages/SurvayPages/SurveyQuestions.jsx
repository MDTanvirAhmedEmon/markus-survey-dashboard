import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import smile from "../../assets/images/smile.png";
import angry from "../../assets/images/angry.png";
import silent from "../../assets/images/silent.png";
import sad from "../../assets/images/sad.png";
import blushing from "../../assets/images/blushing.png";
import starImage from "../../assets/images/star.png";
import commentImg from "../../assets/images/comment.png";
import { Progress } from "antd";
import { ConfigProvider, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next";
// import { useTranslateTextQuery } from "../../redux/translateApi";
// import { getFromLocalStorage } from "../../utils/local-storage";
// import googleTranslate from 'google-translate';

// const apiKey = 'AIzaSyAjiUy3TvN_HXlFhyT38srvm8mrUkf-g7w';
// const options = {}; // Add your options here

export default function SurveyQuestions() {
  // const language = getFromLocalStorage("language");
  // i18 next
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  // others:
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

//  useEffect(() => {
//   const translateText = async (text, targetLanguage) => {
//     try {
//       const translate = googleTranslate(apiKey, options);
//       const [translation] = await translate.translate(text, targetLanguage);
//       console.log(translation.translatedText);
//       // => Mi nombre es Brandon
//     } catch (error) {
//       console.error('Error translating text:', error);
//     }
//   };
  
//   translateText('My name is Brandon', 'es');
//  }, [])
 
//   console.log(data, "data");

  const starOption = false;
  // const starOption = true;

  const questions = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  const handleAnswerClick = (answer, displayValue) => {
    setSelectedAnswer(displayValue);
    console.log(`Selected: ${displayValue}`);
  };

  const handleNextClick = () => {
    if (selectedAnswer) {
      // Update the answers state
      const updatedAnswers = {
        ...answers,
        [questions[currentQuestion].id]: selectedAnswer,
      };
      setAnswers(updatedAnswers);

      // Update the progress bar
      const newProgress = ((currentQuestion + 1) / questions.length) * 100;
      setProgress(newProgress);

      if (currentQuestion < questions.length - 1) {
        // Move to the next question
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Navigate to the next page with all the answers
        console.log("Survey completed!", updatedAnswers);
        navigate("/allQuestionAnsPage", {
          state: { questions, answers: updatedAnswers },
        });
      }
    } else {
      alert("Please select an answer before proceeding.");
    }
  };

  const handleQuitClick = () => {
    navigate("/thankYouPage");
  };

  // toggole language:
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "de" : "en";
    setCurrentLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };
  // render star:
  const renderStars = () => (
    <div className="flex gap-5 justify-center items-center my-12">
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          className={`btn ${selectedAnswer === index + 1 ? "h-14" : "h-10"}`}
          src={starImage}
          alt={`star ${index + 1}`}
          onClick={() => handleAnswerClick(index + 1, "⭐")}
        />
      ))}
    </div>
  );

  const renderEmojis = () => (
    <div className="flex gap-5 justify-center items-center my-12">
      <img
        className={`btn ${selectedAnswer === "angry" ? "h-14" : "h-10"}`}
        src={angry}
        alt="angry emoji"
        onClick={() => handleAnswerClick("angry", "😠")}
      />
      <img
        className={`btn ${selectedAnswer === "silent" ? "h-14" : "h-10"}`}
        src={silent}
        alt="silent emoji"
        onClick={() => handleAnswerClick("silent", "🤐")}
      />
      <img
        className={`btn ${selectedAnswer === "sad" ? "h-14" : "h-10"}`}
        src={sad}
        alt="sad emoji"
        onClick={() => handleAnswerClick("sad", "😢")}
      />
      <img
        className={`btn ${selectedAnswer === "blushing" ? "h-14" : "h-10"}`}
        src={blushing}
        alt="blushing emoji"
        onClick={() => handleAnswerClick("blushing", "😊")}
      />
      <img
        className={`btn ${selectedAnswer === "smile" ? "h-14" : "h-10"}`}
        src={smile}
        alt="smile emoji"
        onClick={() => handleAnswerClick("smile", "😊")}
      />
    </div>
  );

  return (
    <div className="container mx-auto bg-[fdfdfd] my-24">
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 20,
            },
            Input: {
              borderRadius: 10,
            },
            Progress: {
              defaultColor: "rgb(250,219,20)",
            },
          },
        }}
      >
        <h1 className="text-3xl text-center my-12">Survey</h1>
        {/* Translator div start */}
        <div className="flex justify-end px-14 items-center">
          <div className="flex gap-5 justify-center items-center border-2 rounded-3xl py-2 px-3 border-[#ecb206]">
            <button
              className={`py-1 px-3 ${
                i18n.language === "en" ? "font-bold text-[#ecb206]" : ""
              }`}
              onClick={() => i18n.changeLanguage("en")}
            >
              Eng
            </button>
            <button
              className={`py-1 px-3 ${
                i18n.language === "de" ? "font-bold text-[#ecb206]" : ""
              }`}
              onClick={() => i18n.changeLanguage("de")}
            >
              De
            </button>
          </div>
        </div>
        {/* Translator div end */}
        <div>
          <p className="text-center mt-10 px-5">
            {t(`questions.${questions[currentQuestion].id}`)}
          </p>
        </div>
        {starOption ? renderStars() : renderEmojis()}
        <div className="p-5  w-11/12 mx-auto">
          <p>Total Questions: {questions.length} </p>
          <Progress percent={progress} status="active" />
        </div>
        <Form
          name="basic"
          labelCol={{ xs: 24, sm: 24, md: 24 }}
          wrapperCol={{ xs: 24, sm: 24, md: 24 }}
          style={{
            maxWidth: "100%",
            width: "400px",
            margin: "0 auto",
            padding: "10px",
          }}
          initialValues={{ remember: true }}
          onFinish={(values) => console.log("Success:", values)}
          onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
          autoComplete="off"
        >
          <div className="flex justify-center items-center">
            <img src={commentImg} alt="comment" className="h-8 -mr-8 z-10" />
            <TextArea
              rows={1}
              placeholder="Write your comment here"
              className="pl-14 text-start"
            />
          </div>
        </Form>
      </ConfigProvider>
      <div className="flex flex-col gap-5 justify-center items-center my-8">
        <button
          className="py-2 w-44 bg-[#ecb206] text-white rounded-md"
          onClick={handleNextClick}
        >
          Next
        </button>
        <button
          className="py-2 w-44 border-2 border-[#ecb206] rounded-md"
          onClick={handleQuitClick}
        >
          Quit
        </button>
      </div>
    </div>
  );
}