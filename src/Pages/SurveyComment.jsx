import { Form, Input, Modal, Select,Pagination, Table } from 'antd';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaEdit, FaRegEye, FaStar } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const dataSource = [
    {
        id: '1',
        comment: 'I recently purchased a new laptop from your store, and I\'m very pleased with the product and the service. The sales representative was knowledgeable and helped me choose the right model for my needs. However, I think the checkout process could be faster. Overall, a great experience.',
        userImage: 'http://103.43.151.135:3001/src/assets/images/user1.png',
        userName: 'John Doe',
        email: 'john@example.com',
    },
    {
        id: '2',
        comment: 'The Tech Innovators Conference was an enlightening experience. I particularly enjoyed the keynote speech and the networking sessions. One suggestion for improvement would be to provide more detailed session schedules in advance. Looking forward to attending next year!',
        userImage: 'http://103.43.151.135:3001/src/assets/images/user2.png',
        userName: 'Jane Smith',
        email: 'jane@example.com',
    },
    {
        id: '3',
        comment: 'Working at this company has been a rewarding experience. I appreciate the team\'s collaborative spirit and the opportunities for professional growth. However, I believe that more frequent communication from upper management would help keep everyone aligned with the company\'s goals.',
        userImage: 'http://103.43.151.135:3001/src/assets/images/user3.png',
        userName: 'Sam Wilson',
        email: 'sam@example.com',
    },
    {
        id: '4',
        comment: 'The website is visually appealing and easy to navigate. I found the information I needed quickly. One area for improvement could be the mobile version of the site, as some pages don\'t display correctly on my phone. Overall, a good user experience.',
        userImage: 'http://103.43.151.135:3001/src/assets/images/user1.png',
        userName: 'Chris Evans',
        email: 'chris@example.com',
    },
    {
        id: '5',
        comment: 'I\'ve been using your fitness app for the past few months, and it has significantly helped me stay on track with my workouts. The variety of exercises and the user-friendly interface are great. It would be fantastic if you could add more personalized workout plans based on user progress.',
        userImage: 'http://103.43.151.135:3001/src/assets/images/user2.png',
        userName: 'Mark Ruffalo',
        email: 'mark@example.com',
    },

    {
        id: '6',
        comment: 'I\'ve been using your fitness app for the past few months, and it has significantly helped me stay on track with my workouts. The variety of exercises and the user-friendly interface are great. It would be fantastic if you could add more personalized workout plans based on user progress.',
        userImage: 'http://103.43.151.135:3001/src/assets/images/user3.png',
        userName: 'Mark Ruffalo',
        email: 'mark@example.com',
    }
];


const SurveyComment = () => {
    const columns = [
        {
            title: 'SL No.',
            dataIndex: 'id',
            key: 'id ',
            width: '10%',
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment ',
            width: '50%',
        },
        {
            title: 'User Image',
            dataIndex: 'userImage',
            key: 'userImage',
            render: (text, record) => (
                <img src={record.userImage} alt="User" width="50" height="50" />
            ),
            width: '10%',
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName  ',
            width: '15%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email  ',
            width: '15%',
        },
    ];
    const handleChange = (value) => {
        // console.log(`selected ${value}`);
    };
    const onFinish = (value) => {

    }
    return (
        <div className='bg-[var(--color-7)] rounded-md'>
            <div className='between-center px-3 my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1}
                          className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp/>back</Link>
                    <p className='text-xl'>All Survey Comments</p>
                </div>
                <div className='end-center gap-2'>
                    <Input className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl'/>}
                           placeholder="Search"/>
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns}
                   pagination={
                    false
                   }

            />
            {/*<div className='flex item-center justify-center'>*/}
            {/*    <Pagination  total={50}*/}
            {/*    />*/}
            <div>
                <Pagination align="center" defaultCurrent={1} total={50} />
            </div>

            {/*</div>*/}
        </div>
    );
}

export default SurveyComment
