
import { Select } from 'antd';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetSuperAdminAnalyticsQuery } from '../../redux/features/dashboard/dashboardApi';

const SuperAdminOverview = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const mapMonthNumberToName = (data) => {
        return data?.map(item => ({
            ...item,
            month: monthNames[item.month - 1]
        }));
    };

    const {data :  overviewData  , isLoading , isError} = useGetSuperAdminAnalyticsQuery()
    const processedData = mapMonthNumberToName(overviewData?.users_by_month|| []);
    
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const items = [
        {
            label: 2023,
            key: "2023",
        },
        {
            label: 2024,
            key: "2024",
        },
        {
            label: 2025,
            key: "2025",
        },
        {
            label: 2026,
            key: "2026",
        },
    ];
    return (
        <>
            <div className='between-center'>
                <p className='text-2xl'>User Overview</p>
                <Select
                    defaultValue="2024"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={items}
                />
            </div>
            <div className='w-full h-[400px]'>
            <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={500}
                        data={processedData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis tickLine={false} axisLine={false}  />
                        <Tooltip  />
                        <Legend />
                        {/* <Bar barSize={10} dataKey="count" stackId="a" fill="#D4A005" /> */}
                        <Bar radius={[10, 10, 0, 0]}   barSize={10} dataKey="count" stackId="a" fill="#ECB206" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default SuperAdminOverview
