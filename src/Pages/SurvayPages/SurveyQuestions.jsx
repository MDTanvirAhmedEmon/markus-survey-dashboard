import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import smile from "../../assets/images/smile.png";
import angry from "../../assets/images/angry.png";
import silent from "../../assets/images/silent.png";
import sad from "../../assets/images/sad.png";
import blushing from "../../assets/images/blushing.png";
import starImage from "../../assets/images/star.png";
import commentImg from "../../assets/images/comment.png";
import { Progress, Select } from "antd";
import { ConfigProvider, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { v1 as uuidv1 } from 'uuid';
// import translateText from "../../translateText";
// import {
//   useGetSurveyQNQuery,
//   usePostSurveyQnMutation,
// } from "../../redux/api/baseapi";
import Swal from "sweetalert2";
import { useGetSurveyQNQuery, usePostSurveyQnMutation } from "../../redux/features/company/company";
import translateText from "../../TranslateText";

const SurveyQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [translatedQuestion, setTranslatedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const { Option } = Select;
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "de"
  );

  console.log(selectedAnswer);
  // RTK Query for fetching survey questions
  const { barcode } = useParams();
  const { data: surveydata } = useGetSurveyQNQuery(barcode);
  const [postSurveyQn, { data: surveyQn, isLoading }] =
    usePostSurveyQnMutation();
  const survey_id = surveydata?.survey?.survey_id;

  // handle star or emoji
  const emoji = surveydata?.survey?.survey?.emoji_or_star === "emoji";
  // Handle Questions:
  const SVquestions = surveydata?.survey?.survey?.questions || [];
  const questionsId = surveydata?.survey?.survey?.questions;

  if (questionsId && Array.isArray(questionsId)) {
    questionsId.forEach((question) => {
      const questionId = question?.id;
      // console.log(questionId)
    });
  } else {
    // console.log("error");
  }

  const currentComment = SVquestions[currentQuestion]?.comment;

  // Handle translation on component mount and language change
  useEffect(() => {
    const fetchTranslation = async () => {
      const questionText = SVquestions[currentQuestion]?.question_en || "";

      const translated = await translateText(
        questionText,
        language,
        import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY
      );
      setTranslatedQuestion(translated || questionText);
    };

    fetchTranslation();
  }, [currentQuestion, language, SVquestions]);

  // Handle language change
  const handleLanguageChange = (value) => {
    localStorage.setItem("language", value);
    setLanguage(value);
  };

  // Handle answer selection
  const handleAnswerClick = (answer, displayValue) => {
    console.log(answer);
    setSelectedAnswer(answer, displayValue);
  };

  // const uniqueId = uuidv1();

  // if (!sessionStorage.getItem('uniqueId')) {
  //   sessionStorage.setItem("uniqueId", uniqueId)
  // }

  const handleNextClick = async () => {
    try {
      if (sessionStorage.getItem('uniqueId') && currentQuestion === 0) {
        sessionStorage.removeItem('uniqueId');
        const newUniqueId = uuidv1();
        sessionStorage.setItem('uniqueId', newUniqueId);
      }else if (!sessionStorage.getItem('uniqueId')) {
        const newUniqueId = uuidv1();
        sessionStorage.setItem('uniqueId', newUniqueId);
      }
      if (!sessionStorage.getItem('uniqueId')) {
        return
      }
      // Generate a new unique ID and store it in session storage
      if (selectedAnswer) {
        const questionId = SVquestions[currentQuestion]?.id;
        const commentText = document.querySelector("textarea")?.value || "";
        console.log(selectedAnswer);
        // Create FormData and append the question, answer, and comment
        let data = new FormData();
        data.append("question_id", questionId);
        data.append("answer", selectedAnswer);
        data.append("comment", currentComment === 1 ? commentText : "");
        data.append("unique_id", sessionStorage.getItem('uniqueId')); 

        // Submit current answer to the server
        const response = await postSurveyQn(data)
          .unwrap()
          .then((res) => {
            Swal.fire({
              title: "Good job!",
              text: "Thank You!",
              icon: "success",
              confirmButtonColor: '#ECB206',
            });
            setCurrentQuestion(currentQuestion + 1);
          })
          .catch((err) => {
            Swal.fire({
              title: "Oops...",
              confirmButtonColor: '#ECB206',
              text: err?.data?.message || "You have already submitted that survey",
              icon: "error",
            });

            if (err?.status === 409) {
              setCurrentQuestion(currentQuestion + 1);
            }
          });

        // Update progress and state
        const updatedAnswers = {
          ...answers,
          [currentQuestion]: selectedAnswer,
        };
        setAnswers(updatedAnswers);

        const newProgress = ((currentQuestion + 1) / SVquestions.length) * 100;
        setProgress(newProgress);

        // Navigate to the next question or finish
        if (currentQuestion < SVquestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          if (!survey_id) {
            console.error("Survey ID is not defined");
            Swal.fire({
              title: "Error",
              text: "Survey ID is missing. Cannot navigate.",
              icon: "error",
            });
            return;
          }
          // Navigate to the allQuestionAnsPage with survey_id
          navigate(`/allQuestionAnsPage/${survey_id}`, {
            state: { SVquestions, answers: updatedAnswers, language, emoji },
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select an answer before proceeding.",
        });
      }
      setAnswer("");
    } catch (error) {
      console.error("Error submitting survey answer:", error);
    }
  };

  // Handle "Next" button click
  // const handleNextClick = async () => {
  //   // console.log("selected",selectedAnswer);
  //   try {
  //     if (selectedAnswer) {
  //       const questionId = SVquestions[currentQuestion]?.id;
  //       const commentText = document.querySelector("textarea")?.value || "";
  //       // Create FormData and append the question, answer, and comment
  //       let data = new FormData();
  //       data.append("question_id", questionId);
  //       data.append("answer", selectedAnswer);
  //       data.append("comment", currentComment === 1 ? commentText : "");
  //       data.append("unique_id", sessionStorage.getItem('uniqueId'));

  //       // Submit current answer to the server
  //       const response = await postSurveyQn(data)
  //         .unwrap()
  //         .then((res) => {
  //           Swal.fire({
  //             title: "Good job!",
  //             text: "Thank You!",
  //             icon: "success",
  //             confirmButtonColor: '#ECB206',

  //           });
  //           setCurrentQuestion(currentQuestion + 1);
  //         })
  //         .catch((err) => {
  //           Swal.fire({
  //             title: "Good job!",
  //             confirmButtonColor: '#ECB206',
  //             text:
  //               err?.data?.message || "You have already submitted that survey",
  //             icon: "success",
  //           });

  //           if (err?.status === 409) {
  //             setCurrentQuestion(currentQuestion + 1);
  //           }
  //         });

  //       // console.log("Server response:", response);

  //       // Update progress and state
  //       const updatedAnswers = {
  //         ...answers,
  //         [currentQuestion]: selectedAnswer,
  //       };
  //       setAnswers(updatedAnswers);

  //       const newProgress = ((currentQuestion + 1) / SVquestions.length) * 100;
  //       setProgress(newProgress);
  //       // clear the comment box:

  //       // Navigate to the next question or finish
  //       if (currentQuestion < SVquestions.length - 1) {
  //         setCurrentQuestion(currentQuestion + 1);
  //         setSelectedAnswer(null);
  //       } else {
  //         if (!survey_id) {
  //           console.error("Survey ID is not defined");
  //           Swal.fire({
  //             title: "Error",
  //             text: "Survey ID is missing. Cannot navigate.",
  //             icon: "error",
  //           });
  //           return;
  //         }
  //         // Navigate to the allQuestionAnsPage with survey_id
  //         navigate(`/allQuestionAnsPage/${survey_id}`, {
  //           state: { SVquestions, answers: updatedAnswers, language, emoji },
  //         });
  //       }
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Please select an answer before proceeding.",
  //       });
  //     }
  //     setAnswer("");
  //   } catch (error) {
  //     console.error("Error submitting survey answer:", error);
  //   }
  // };

  const handleQuitClick = () => {
    navigate("/thankYouPage", { replace: true });
  };

  // Render stars rating:


  const renderStars = () => (
    <div className="flex gap-5 justify-center items-center my-12">
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          className={`btn ${selectedAnswer && answerIndex === index ? "h-16" : "h-10"
            } cursor-pointer`}
          src={starImage}
          alt={`star ${index + 1}`}
          onClick={() => {
            handleAnswerClick(index + 1, `${index + 1}⭐`);
            setAnswerIndex(index);
          }}
        />
      ))}
    </div>
  );

  // Render emoji rating
  const renderEmojis = () => (
    <div className="flex gap-5 justify-center items-center my-12">
      <img
        className={`btn cursor-pointer ${selectedAnswer === "1" ? "h-14" : "h-10"}`}
        src={angry}
        alt="angry emoji"
        // onClick={() => handleAnswerClick("😠", "😠")}
        onClick={() => handleAnswerClick("1")}
      />
      <img
        className={`btn cursor-pointer ${selectedAnswer === "2" ? "h-14" : "h-10"}`}
        src={sad}
        alt="sad emoji"
        // onClick={() => handleAnswerClick("😢", "😢")}
        onClick={() => handleAnswerClick("2")}
      />
      <img
        className={`btn cursor-pointer ${selectedAnswer === "3" ? "h-14" : "h-10"}`}
        src={silent}
        alt="silent emoji"
        onClick={() => handleAnswerClick("3")}
        // onClick={() => handleAnswerClick("🤐", "🤐")}
      />
      
      <img
        className={`btn cursor-pointer ${selectedAnswer === "4" ? "h-14" : "h-10"}`}
        src={blushing}
        alt="blushing emoji"
        onClick={() => handleAnswerClick("4")}
        // onClick={() => handleAnswerClick("🙂", "🙂")}
      />
      <img
        className={`btn cursor-pointer ${selectedAnswer === "5" ? "h-14" : "h-10"}`}
        src={smile}
        alt="smile emoji"
        onClick={() => handleAnswerClick("5")}
        // onClick={() => handleAnswerClick("😊", "😊")}
      />
    </div>
  );


  return (
    <div className="container mx-auto bg-[fdfdfd] my-5">
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
        <h1 className="text-3xl text-center mb-5">Survey</h1>

        {/* Language Selector */}
        <div className="flex justify-end px-14 items-center">
          <Select
            defaultValue={language}
            style={{ width: 120 }}
            onChange={handleLanguageChange}
          >
            <option value="af">Afrikaans</option>
            <option value="sq">Albanian</option>
            <option value="am">Amharic</option>
            <option value="ar">Arabic</option>
            <option value="hy">Armenian</option>
            <option value="az">Azerbaijani</option>
            <option value="eu">Basque</option>
            <option value="be">Belarusian</option>
            <option value="bn">Bengali</option>
            <option value="bs">Bosnian</option>
            <option value="bg">Bulgarian</option>
            <option value="ca">Catalan</option>
            <option value="ceb">Cebuano</option>
            <option value="ny">Chichewa</option>
            <option value="zh">Chinese (Simplified)</option>
            <option value="zh-TW">Chinese (Traditional)</option>
            <option value="co">Corsican</option>
            <option value="hr">Croatian</option>
            <option value="cs">Czech</option>
            <option value="da">Danish</option>
            <option value="nl">Dutch</option>
            <option value="en">English</option>
            <option value="eo">Esperanto</option>
            <option value="et">Estonian</option>
            <option value="tl">Filipino</option>
            <option value="fi">Finnish</option>
            <option value="fr">French</option>
            <option value="fy">Frisian</option>
            <option value="gl">Galician</option>
            <option value="ka">Georgian</option>
            <option value="de">German</option>
            <option value="el">Greek</option>
            <option value="gu">Gujarati</option>
            <option value="ht">Haitian Creole</option>
            <option value="ha">Hausa</option>
            <option value="haw">Hawaiian</option>
            <option value="he">Hebrew</option>
            <option value="hi">Hindi</option>
            <option value="hmn">Hmong</option>
            <option value="hu">Hungarian</option>
            <option value="is">Icelandic</option>
            <option value="ig">Igbo</option>
            <option value="id">Indonesian</option>
            <option value="ga">Irish</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="jw">Javanese</option>
            <option value="kn">Kannada</option>
            <option value="kk">Kazakh</option>
            <option value="km">Khmer</option>
            <option value="rw">Kinyarwanda</option>
            <option value="ko">Korean</option>
            <option value="ku">Kurdish (Kurmanji)</option>
            <option value="ky">Kyrgyz</option>
            <option value="lo">Lao</option>
            <option value="la">Latin</option>
            <option value="lv">Latvian</option>
            <option value="lt">Lithuanian</option>
            <option value="lb">Luxembourgish</option>
            <option value="mk">Macedonian</option>
            <option value="mg">Malagasy</option>
            <option value="ms">Malay</option>
            <option value="ml">Malayalam</option>
            <option value="mt">Maltese</option>
            <option value="mi">Maori</option>
            <option value="mr">Marathi</option>
            <option value="mn">Mongolian</option>
            <option value="my">Myanmar (Burmese)</option>
            <option value="ne">Nepali</option>
            <option value="no">Norwegian</option>
            <option value="or">Odia (Oriya)</option>
            <option value="ps">Pashto</option>
            <option value="fa">Persian</option>
            <option value="pl">Polish</option>
            <option value="pt">Portuguese</option>
            <option value="pa">Punjabi</option>
            <option value="ro">Romanian</option>
            <option value="ru">Russian</option>
            <option value="sm">Samoan</option>
            <option value="gd">Scots Gaelic</option>
            <option value="sr">Serbian</option>
            <option value="st">Sesotho</option>
            <option value="sn">Shona</option>
            <option value="sd">Sindhi</option>
            <option value="si">Sinhala</option>
            <option value="sk">Slovak</option>
            <option value="sl">Slovenian</option>
            <option value="so">Somali</option>
            <option value="es">Spanish</option>
            <option value="su">Sundanese</option>
            <option value="sw">Swahili</option>
            <option value="sv">Swedish</option>
            <option value="tg">Tajik</option>
            <option value="ta">Tamil</option>
            <option value="tt">Tatar</option>
            <option value="te">Telugu</option>
            <option value="th">Thai</option>
            <option value="tr">Turkish</option>
            <option value="tk">Turkmen</option>
            <option value="uk">Ukrainian</option>
            <option value="ur">Urdu</option>
            <option value="ug">Uyghur</option>
            <option value="uz">Uzbek</option>
            <option value="vi">Vietnamese</option>
            <option value="cy">Welsh</option>
            <option value="xh">Xhosa</option>
            <option value="yi">Yiddish</option>
            <option value="yo">Yoruba</option>
            <option value="zu">Zulu</option>
          </Select>
        </div>

        {/* Display translated question */}
        <div>
          <p className="text-center mt-8 px-5">{translatedQuestion}</p>
        </div>

        {/* Render Stars or Emojis based on the emoji flag */}
        {emoji ? renderEmojis() : renderStars()}

        <div className="p-5 w-11/12 mx-auto">
          <p>Total Questions: {SVquestions.length} </p>
          <Progress
            percent={progress}
            format={() => `${progress.toFixed()}%`}
            status="active"
          />
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
          {/* Conditionally render the textarea if comment === 1 */}
          {currentComment === 1 && (
            <div className="flex justify-center items-center">
              <img src={commentImg} alt="comment" className="h-8 -mr-8 z-10" />
              <TextArea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={1}
                placeholder="Write your comment here"
                className="pl-14 text-start"
              />
            </div>
          )}
        </Form>
      </ConfigProvider>

      <div className="flex flex-col gap-5 justify-center items-center my-5">
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
};

export default SurveyQuestions;
