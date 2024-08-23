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
        userImage: 'http://192.168.10.64:3001/src/assets/images/user1.png',
        companyName: 'xyz company',
        phoneNumber: '018**********',
        email: 'xyz@example.com',
    },
    {
        id: '1',
        userImage: 'http://192.168.10.64:3001/src/assets/images/user1.png',
        companyName: 'john company',
        phoneNumber: '018**********',
        email: 'john@example.com',
    },
    {
        id: '1',
        userImage: 'http://192.168.10.64:3001/src/assets/images/user1.png',
        companyName: 'tech company',
        phoneNumber: '018**********',
        email: 'tech@example.com',
    },
    {
        id: '1',
        userImage: 'http://192.168.10.64:3001/src/assets/images/user1.png',
        companyName: 'nginx company',
        phoneNumber: '018**********',
        email: 'nginx@example.com',
    },
    {
        id: '1',
        userImage: 'http://192.168.10.64:3001/src/assets/images/user1.png',
        companyName: 'xyz company',
        phoneNumber: '018**********',
        email: 'xyz@example.com',
    },

    // {
    //     id: '6',
    //     userImage: 'http://192.168.10.64:3001/src/assets/images/user3.png',
    //     comment: 'I\'ve been using your fitness app for the past few months, and it has significantly helped me stay on track with my workouts. The variety of exercises and the user-friendly interface are great. It would be fantastic if you could add more personalized workout plans based on user progress.',
    //     userName: 'Mark Ruffalo',
    //     email: 'mark@example.com',
    // }
];


const SurveyBasedUser = () => {
    const columns = [
        {
            title: 'SL No.',
            dataIndex: 'id',
            key: 'id ',
            width: '10%',
        },
        {
            title: 'Image',
            dataIndex: 'userImage',
            key: 'userImage',
            render: (text, record) => (
                <img src={record.userImage} alt="User" width="50" height="50" />
            ),
            width: '20%',
        },
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'CompanyName ',
            width: '20%',
        },

        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber  ',
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email  ',
            width: '20%',
        },

        {
            title: 'Actions',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => {
                return (<div className='start-center text-2xl gap-1'>
                    {/* <MdEdit className='cursor-pointer' /> */}
                    <MdOutlineDelete className='cursor-pointer' />
                </div>)
            }
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
                    <p className='text-xl'>Survey Based User List</p>
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

export default SurveyBasedUser
