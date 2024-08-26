
import { Select } from 'antd';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Overview = ({ company_growth_by_month }) => {
    const data = [
        {
            name: 'Jan',
            uv: 4000,
            pv: 2400,
            amt: company_growth_by_month?.[0]?.count,
        },
        {
            name: 'Feb',
            uv: 3000,
            pv: 1398,
            amt: company_growth_by_month?.[1]?.count,
        },
        {
            name: 'Mar',
            uv: 2000,
            pv: 9800,
            amt: company_growth_by_month?.[2]?.count,
        },
        {
            name: 'Apr',
            uv: 2780,
            pv: 3908,
            amt: company_growth_by_month?.[3]?.count,
        },
        {
            name: 'May',
            uv: 1890,
            pv: 4800,
            amt: company_growth_by_month?.[4]?.count,
        },
        {
            name: 'Jun',
            uv: 2390,
            pv: 3800,
            amt: company_growth_by_month?.[5]?.count,
        },
        {
            name: 'Jul',
            uv: 3490,
            pv: 4300,
            amt: company_growth_by_month?.[6]?.count,
        },
        {
            name: 'Aug',
            uv: 3490,
            pv: 4300,
            amt: company_growth_by_month?.[7]?.count,
        },
        {
            name: 'Sept',
            uv: 1340,
            pv: 3430,
            amt: company_growth_by_month?.[8]?.count,
        },
        {
            name: 'Oct',
            uv: 1740,
            pv: 1430,
            amt: company_growth_by_month?.[9]?.count,
        },
        {
            name: 'Nov',
            uv: 5740,
            pv: 3430,
            amt: company_growth_by_month?.[10]?.count,
        },
        {
            name: 'Dec',
            uv: 4740,
            pv: 8430,
            amt: company_growth_by_month?.[11]?.count,
        },
    ]
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
                <p className='text-2xl'>Survey and User Overview</p>
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
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}

                    >
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} data={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Legend />
                        <Bar barSize={10} dataKey="pv" stackId="a" fill="#D4A005" />
                        <Bar radius={[10, 10, 0, 0]} dataKey="uv" stackId="a" fill="#ECB206" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Overview
