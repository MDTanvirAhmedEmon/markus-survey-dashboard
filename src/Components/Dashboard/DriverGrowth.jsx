
import { Select } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
    {
        name: 'Jan',
        uv: 20,
        mt: 10,
    },
    {
        name: 'Feb',
        uv: 30,
        mt: 20,
    },
    {
        name: 'Mar',
        uv: 90,
        mt: 30,
    },
    {
        name: 'Apr',
        uv: 100,
        mt: 40,
    },
    {
        name: 'May',
        uv: 30,
        mt: 50,
    },
    {
        name: 'Jun',
        uv: 10,
        mt: 60,
    },
    {
        name: 'Aug',
        uv: 15,
        mt: 70,
    },
    {
        name: 'Sep',
        uv: 20,
        mt: 80,
    },
    {
        name: 'Nov',
        uv: 30,
        mt: 90,
    },
    {
        name: 'Dec',
        uv: 10,
        mt: 100,
    },
];
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
const DriverGrowth = ({ users_by_month }) => {
    
    const handleChange = (value) => {
        console.log(`selected ${value}`);
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
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="count" stroke="#ECB206" opacity={1} fillOpacity={1} fill="#ECB206" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default DriverGrowth
