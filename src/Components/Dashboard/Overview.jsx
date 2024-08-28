import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetDashboardAnalyticsQuery } from '../../redux/features/dashboard/dashboardApi';

const Overview = () => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const mapMonthNumberToName = (data) => {
        return data?.map(item => ({
            ...item,
            month: monthNames[item.month - 1]
        }));
    };

    const { data: dashboardData } = useGetDashboardAnalyticsQuery();
    const processedData = mapMonthNumberToName(dashboardData?.projects_by_month || []);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { month, count } = payload[0].payload;
            return (
                <div className="custom-tooltip bg-white py-3 px-2 rounded border">
                    <p className="label">{`Month: ${month}`}</p>
                    <p className="label">{`Projects: ${count}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <div className='between-center'>
                <p className='text-2xl'>Projects Per Month</p>
            </div>
            <div className='w-full h-[400px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={500}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar barSize={10} dataKey="count" stackId="a" fill="#D4A005" />
                        <Bar radius={[10, 10, 0, 0]} dataKey="count" stackId="a" fill="#ECB206" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Overview;
