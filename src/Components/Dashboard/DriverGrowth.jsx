
// import { Select } from 'antd';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetDashboardAnalyticsQuery } from '../../redux/features/dashboard/dashboardApi';



// const data = [
//     {
//         name: 'Jan',
//         uv: 20,
//         mt: 10,
//     },
//     {
//         name: 'Feb',
//         uv: 30,
//         mt: 20,
//     },
//     {
//         name: 'Mar',
//         uv: 90,
//         mt: 30,
//     },
//     {
//         name: 'Apr',
//         uv: 100,
//         mt: 40,
//     },
//     {
//         name: 'May',
//         uv: 30,
//         mt: 50,
//     },
//     {
//         name: 'Jun',
//         uv: 10,
//         mt: 60,
//     },
//     {
//         name: 'Aug',
//         uv: 15,
//         mt: 70,
//     },
//     {
//         name: 'Sep',
//         uv: 20,
//         mt: 80,
//     },
//     {
//         name: 'Nov',
//         uv: 30,
//         mt: 90,
//     },
//     {
//         name: 'Dec',
//         uv: 10,
//         mt: 100,
//     },
// ];

const DriverGrowth = () => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const mapMonthNumberToName = (data) => {
        return data?.map(item => ({
            ...item,
            month: monthNames[item.month - 1]
        }));
    };

    const { data: dashboardData } = useGetDashboardAnalyticsQuery();
    console.log('data', dashboardData?.responses_by_month)
    const processedData = mapMonthNumberToName(dashboardData?.responses_by_month || []);

    return (
        <>
            <div className='between-center'>
                <p className='text-2xl'>Survey Response</p>

            </div>
            <div className='w-full h-[400px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={processedData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis dataKey="count" tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="count" stroke="#ECB206" opacity={1} fillOpacity={1} fill="#ECB206" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default DriverGrowth
