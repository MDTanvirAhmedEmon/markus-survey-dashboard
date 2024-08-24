import { Link } from 'react-router-dom'
import './App.css'
import Overview from './Components/Dashboard/Overview'
import DriverGrowth from './Components/Dashboard/DriverGrowth'
import SurveyRequest from './Components/Dashboard/SurveyRequest'
import { useGetDashboardAnalyticsQuery } from './redux/features/dashboard/dashboardApi'

function App() {

  const { data: dashboardData } = useGetDashboardAnalyticsQuery();
  const data = [
    {
      title: 'Total Project',
      count: dashboardData?.total_project,
    },
    {
      title: 'Total Survey',
      count: dashboardData?.total_survey,
    },
    {
      title: 'Total Responses',
      count: dashboardData?.total_response,
    },
  ]
  return (
    <>
      <div className='grid-3 gap-3'>
        {
          data?.map((item, index) => <div className='w-full h-full center-center flex-col gap-3 py-7 bg-[var(--color-7)] p-2 rounded-md' key={index}>
            <p className='text-2xl'>{item?.title}</p>
            {item.icon}
            <p className='text-3xl font-semibold'>{item?.count}</p>
          </div>)
        }
      </div>
      <div className='grid-2 mt-3 gap-3'>
        <div className='w-full h-full bg-white p-4 rounded-md'>
          <Overview />
        </div>
        <div className='w-full h-full bg-white p-4 rounded-md'>
          <DriverGrowth />
        </div>
      </div>
      <div className='mt-3 bg-white rounded-md'>
        <div className='between-center gap-2 mb-3 p-5'>
          <p className='text-xl'>Employee Request</p> <Link to={`/total-survey-request`}>
            View All
          </Link>
        </div>
        <SurveyRequest />
      </div>
    </>
  )
}

export default App
