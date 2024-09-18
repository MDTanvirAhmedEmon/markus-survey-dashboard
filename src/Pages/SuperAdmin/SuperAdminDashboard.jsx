
import { Link } from 'react-router-dom'
import '../../App.css'
import Overview from "../../Components/Dashboard/Overview.jsx";
import DriverGrowth from "../../Components/Dashboard/DriverGrowth.jsx";
import UserDeleteRequest from "../../Components/Dashboard/UserDeleteRequest.jsx";
import { useGetOverviewQuery } from '../../redux/features/Settings/Settings.js';
import SuperAdminOverview from '../../Components/Dashboard/SuperAdminOverview.jsx';
import CompanyGrowth from '../../Components/Dashboard/CompanyGrowth.jsx';

const SuperAdminDashboard = () => {
    const { data: overview } = useGetOverviewQuery()
    const data = [
        {
            title: 'Total Company',
            count: overview?.total_company,
        },
        {
            title: 'Total Added Company',
            count: overview?.total_added_company,
        },
        {
            title: 'Total Removed Company',
            count: overview?.total_removed_company,
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
                    {/* <Overview company_growth_by_month={overview?.company_growth_by_month} /> */}
                    <SuperAdminOverview/>
                </div>
                <div className='w-full h-full bg-white p-4 rounded-md'>
                    {/* <DriverGrowth users_by_month={overview?.users_by_month} /> */}
                    <CompanyGrowth/>
                </div>
            </div>
            <div className='mt-3 bg-white rounded-md'>
                <div className='between-center gap-2 mb-3 p-5'>
                    <p className='text-xl'>User Delete Request</p> 
                    <Link to={`/total-survey-request`}>
                        View All
                    </Link>
                </div>
                <UserDeleteRequest />

            </div>
        </>
    )
}

export default SuperAdminDashboard
