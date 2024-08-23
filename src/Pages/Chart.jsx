import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function App({ answer_counts }) {
    const answer = Object.values(answer_counts);

    const data = {
        labels: ['', '', '', '', ''],
        datasets: [
            {
                data: answer,
                fill: false,
                borderColor: 'gray',
                pointBackgroundColor: [
                    'yellow', 'orange', 'green', 'orange', 'yellow'
                ],
                pointRadius: 10,
                pointHoverRadius: 10,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Value: ${context.raw}`,
                },
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        elements: {
            point: {
                pointStyle: 'circle',
            },
        },
        animation: false,
    };

    const getEmojiForValue = (value) => {
        if (value === 0) return '😞';
        if (value <= 10) return '😐';
        if (value <= 20) return '😀';
        if (value <= 30) return '😠';
        if (value > 30) return '😊';
    };

    const drawEmojis = (chart) => {
        const { ctx, data } = chart;
        const largest = Math.max(...data.datasets[0].data);

        data.datasets[0].data.forEach((value, index) => {
            const meta = chart.getDatasetMeta(0);
            const point = meta.data[index];
            ctx.save();
            ctx.font = '20px Arial';
            const emoji = getEmojiForValue(value); // Get the emoji based on the value
            ctx.fillText(emoji, point.x - 14, point.y + 8);
            ctx.fillText(value, point.x - 10, value === largest ? point.y + 30 : point.y - 20);
            ctx.restore();
        });
    };

    return (
        <>
            <div className='w-[50%] mx-auto mt-10'>
                <Line
                    data={data}
                    options={options}
                    plugins={[
                        {
                            id: 'custom-emoji-plugin',
                            afterDraw: drawEmojis,
                        },
                    ]}
                />
            </div>
            <div className='flex justify-center items-center gap-4' style={{ textAlign: 'center', marginTop: '20px' }}>
                <span role="img" aria-label="smiley" style={{ fontSize: '2em' }}>
                    😀
                </span>
                Exigent
            </div>
        </>
    );
};
