import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import App from "../App";
import DriverProfile from "../Pages/DriverProfile";
import UserTable from "../Components/Dashboard/UserTable";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Terms from "../Pages/Terms";
import Profile from "../Pages/Profile";
// import FeedBack from "../Pages/FeedBack";
import CreateProject from "../Pages/CreateProject";
import CreateSurvey from "../Pages/CreateSurvey";
import ManageCompany from "../Pages/ManageCompany";
import ManageEvent from "../Pages/ManageEvent";
import ArchiveProject from "../Pages/ArchiveProject";
import SurveyResult from "../Pages/SurveyResult";
import Notification from "../Pages/Notification.jsx";
import SurveyComment from "../Pages/SurveyComment.jsx";
import SurveyBasedUser from "../Pages/SurveyBasedUser.jsx";
// import Login from "../Pages/Auth/Login.jsx";
import ProjectUsers from "../Pages/ProjectUsers.jsx";
import Login from "../Pages/Auth/Login.jsx";
import ForgotPassword from "../Pages/Auth/ForgotPassword.jsx";
import SuperAdminDashboard from "../Pages/SuperAdmin/SuperAdminDashboard.jsx";
import SCompanyManage from "../Pages/SuperAdmin/CompanyManage.jsx";
import SCompanyDetails from "../Pages/SuperAdmin/SCompanyDetails.jsx";
import Otp from "../Pages/Auth/Otp.jsx";
import UpdatePassword from "../Pages/Auth/UpdatePassword.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import AddQuestions from "../Pages/AddQuestions.jsx";
import EditSurveyQuestions from "../Pages/EditSurveyQuestions.jsx";
import SurveyReport from "../Pages/SurveyReport.jsx";
import AllQuestionAnsPage from "../Pages/SurvayPages/AllQuestionAnsPage.jsx";
import SelectLanguagePage from "../Pages/SurvayPages/SelectLanguagePage.jsx";
import SurveyQuestions from "../Pages/SurvayPages/SurveyQuestions.jsx";
import ThankYouPage from "../Pages/SurvayPages/ThankYouPage.jsx";
import AllSurveyComments from "../Pages/AllSurveyComments.jsx";
import TotalEmployeeRequest from "../Pages/TotalSurveyRequest";
import TranslateComponent from "../Components/TranslateComponent.jsx";

// import Otp from "../Pages/Auth/Otp.jsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><Root /></PrivateRoute>,
        //   errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <App />,
            },
            {
                path: '/total-employee-request',
                element: <TotalEmployeeRequest />,
            },
            {
                path: '/driver-details/:id',
                element: <DriverProfile />,
            },
            {
                path: '/total-user',
                element: <UserTable />,
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicy />,
            },
            {
                path: '/terms',
                element: <Terms />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/create-project',
                element: <CreateProject />,
            },
            {
                path: '/create-survey',
                element: <CreateSurvey />,
            },
            {
                path: '/manage-company',
                element: <ManageCompany />,
            },
            {
                path: '/manage-event',
                element: <ManageEvent />,
            },
            {
                path: '/archive',
                element: <ArchiveProject />,
            },
            {
                path: '/add-questions',
                element: <AddQuestions />,
            },
            {
                path: '/all-survey-comments/:id',
                element: <AllSurveyComments />,
            },

            {
                path: '/survey-result',
                element: <SurveyResult />,
            },

            {
                path: '/notification',
                element: <Notification />,
            },
            {
                path: '/edit-survey-question/:id',
                element: <EditSurveyQuestions></EditSurveyQuestions>,
            },

            {
                path: '/survey-report/:id',
                element: <SurveyReport />,
            },

            {
                path: '/project-users/:id',
                element: <ProjectUsers />,
            },
            {
                path: '/survey-comments/:id',
                element: <SurveyComment />,
            },

            {
                path: '/line-chart/id',
                element: <chart />,
            },

            {
                path: '/survey-user/id',
                element: <SurveyBasedUser />,
            },

            // super admin dashboard pages
            {
                path: '/super-admin',
                element: <SuperAdminDashboard />,
            },

            {
                path: '/company-manage',
                element: <SCompanyManage />,
            },

            {
                path: '/super-admin/company-details',
                element: <SCompanyDetails />,
            }

        ]
    },
    {
        path: '/auth/login',
        element: <Login />
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPassword />
    },

    {
        path: '/auth/otp',
        element: <Otp />
    },
    {
        path: '/auth/update-password',
        element: <UpdatePassword />
    },
    {
        path: "/selectLanguagePage",
        element: <SelectLanguagePage />
    },
    {
        path: "/surveyQuestions",
        element: <SurveyQuestions />,
    },
    {
        path: "/thankYouPage",
        element: <ThankYouPage />,
    },
    {
        path: "/allQuestionAnsPage",
        element: <AllQuestionAnsPage />,
    },
    
    {
        path: "/allQuestionAnsPage/:survey_id",
        element: <AllQuestionAnsPage />,
    },
    
  {
    path: "/translateComponent",
    element: <TranslateComponent />,
  },
  {
    path: "/thankYouPage",
    element: <ThankYouPage />,
  },
  {
    path: "/surveyAllQuestions/:barcode",
    element: <SurveyQuestions />,
  },
]);