import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetDashboardAnalyticsQuery } from '../../redux/features/dashboard/dashboardApi';

const DriverGrowth = () => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const mapMonthNumberToName = (data) => {
        return data?.map(item => ({
            ...item,
            month: monthNames[item.month - 1]
        }));
    };

    const { data: dashboardData } = useGetDashboardAnalyticsQuery();

    console.log(dashboardData);
    const processedData = mapMonthNumberToName(dashboardData?.responses_by_month || []);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { month, count } = payload[0].payload;
            return (
                <div className="custom-tooltip bg-white py-3 px-2 rounded border">
                    <p className="label">{`Month: ${month}`}</p>
                    <p className="label">{`Responses: ${count}`}</p>
                </div>
            );
        }

        return null;
    };

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
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="count" stroke="#ECB206" opacity={1} fillOpacity={1} fill="#ECB206" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default DriverGrowth;
