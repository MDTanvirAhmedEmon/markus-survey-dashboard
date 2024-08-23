import {Button, DatePicker, Form, Input, Modal, Radio, Select, Table} from 'antd';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaEdit, FaRegEye, FaStar } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';
import {FilterOutlined, UploadOutlined} from "@ant-design/icons";
const dataSource = [
    {
        id: '1',
        ProjectName: 'Mike',
        date: '05/12/2024',
    }
]


const SCompanyDetails = () => {
    const [isPeriodically, setIsPeriodically] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false)
    const columns = [
        {
            title: 'SL No.',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Company Name',
            dataIndex: 'ProjectName',
            key: 'ProjectName ',
        },
        {
            title: 'Company Id',
            dataIndex: 'date',
            key: 'date  ',
        },
        {
            title: 'Email',
            dataIndex: 'date',
            key: 'date  ',
        },
        {
            title: 'Tool Used',
            dataIndex: 'toolUsed',
            key: 'toolUsed  ',
        },

        {
            title: 'No of Projects',
            dataIndex: 'date',
            key: 'date  ',
        },
        {
            title: 'No. of Surveys',
            dataIndex: 'NoSurveys',
            key: 'NoSurveys  ',
        },
        {
            title: 'Actions',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => {
                return (<div className='start-center text-2xl gap-1 text-red-600'>
                    {/* <MdEdit className='cursor-pointer' /> */}
                    <MdOutlineDelete className='cursor-pointer' />
                </div>)
            }
        },
    ];
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onFinish = (value) => {

    }
    return (
        <div className='bg-[var(--color-7)] rounded-md'>
            <div className='between-center px-3 my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1} className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link>
                    <p className='text-xl'>Company Details</p>
                </div>
                <div className='end-center gap-2'>
                    <button onClick={() => setOpenAddModal(false)}
                            className='bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        Export
                        {/*<FaPlus/>*/}
                        <UploadOutlined />
                    </button>
                    <button onClick={() => setOpenAddModal(false)}
                            className='bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        Filter
                        {/*<FaPlus/>*/}
                        <FilterOutlined />
                    </button>
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns}/>
            <Modal
                open={openAddModal}
                centered
                footer={false}
                onCancel={() => setOpenAddModal(false)}
            >
            </Modal>
        </div>
    )
}

export default SCompanyDetails
