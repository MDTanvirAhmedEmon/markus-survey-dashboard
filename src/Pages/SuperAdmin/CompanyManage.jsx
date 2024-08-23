import {Button, DatePicker, Form, Input, Modal, Radio, Select, Table} from 'antd';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaEdit, FaRegEye, FaStar } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';
const dataSource = [
    {
        id: '1',
        CompanyName: 'Mike',
        CompanyId: 456,
        email: 'xyz@gmail.com',
        ToolUsed: 45,
        NoOfProjects: 46,
        NoSurveys: 78,
    }
]


const SCompanyManage = () => {
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
            dataIndex: 'CompanyName',
            key: 'CompanyName ',
        },
        {
            title: 'Company Id',
            dataIndex: 'CompanyId',
            key: 'CompanyId  ',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email  ',
        },
        {
            title: 'Tool Used',
            dataIndex: 'ToolUsed',
            key: 'ToolUsed  ',
        },

        {
            title: 'No of Projects',
            dataIndex: 'NoOfProjects',
            key: 'NoOfProjects  ',
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
                    <p className='text-xl'>Company Manage</p>
                </div>
                <div className='end-center gap-2'>
                    {/*<Select className='h-[40px] bg-[var(--color-2)] rounded-md min-w-44'*/}
                    {/*        defaultValue="lucy"*/}
                    {/*        style={{ width: 120 }}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        options={[*/}
                    {/*            { value: 'jack', label: 'Jack' },*/}
                    {/*            { value: 'lucy', label: 'Lucy' },*/}
                    {/*            { value: 'Yiminghe', label: 'yiminghe' },*/}
                    {/*        ]}*/}
                    {/*/>*/}
                    <button  onClick={() => setOpenAddModal(true)} className='bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        Add Company
                        <FaPlus />
                    </button>
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns} />
            <Modal
                open={openAddModal}
                centered
                footer={false}
                onCancel={() => setOpenAddModal(false)}
            >
                <div>
                    <p className='text-xl py-2 font-bold'>Add Company</p>
                    <Form className=''
                          layout='vertical'
                          onFinish={onFinish}
                    >

                        {/* Toggle Choice Option */}
                        <Form.Item
                            name="emojiOrStar"
                            label=""
                            rules={[
                                {
                                    message: 'Rating type is required',
                                    required: true
                                }
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="emoji">Emoji</Radio>
                                <Radio value="star">Star</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name={`surveyName`}
                            label={`Survey Name`}
                            rules={[
                                {
                                    message: 'Survey Name is required',
                                    required: true
                                }
                            ]}
                        >
                            <Input className='pb-6 pt-2 border outline-none' placeholder='Type survey name here...'/>
                        </Form.Item>

                        {/* Toggle Button for Once and Periodically */}
                        <Form.Item
                            name="status"
                            label="Repeat Status"
                        >
                            <Button.Group className=''>
                                <Button className='mr-2'
                                        value="once"
                                        onClick={() => setIsPeriodically(false)}
                                >
                                    Once
                                </Button>
                                <p  className='font-bold pr-3 mt-2'>Or</p>
                                <Button className='ml-2'
                                        value="periodically"
                                        onClick={() => setIsPeriodically(true)}
                                >
                                    Periodically
                                </Button>
                            </Button.Group>
                            {isPeriodically && (
                                <Form.Item
                                    name="period"
                                    label=""
                                    rules={[
                                        {
                                            message: 'Period is required',
                                            required: true
                                        }
                                    ]}
                                >
                                    <Radio.Group className='pt-5'>
                                        <Radio value="daily">Daily</Radio>
                                        <Radio value="weekly">Weekly</Radio>
                                        <Radio value="monthly">Monthly</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            )}
                        </Form.Item>



                        <div className='flex justify-between'>
                            <Form.Item
                                name="startDate"
                                label="Start Date"
                                rules={[
                                    {
                                        message: 'Start Date is required',
                                        required: true
                                    }
                                ]}
                                style={{ width: '48%' }}
                            >
                                <DatePicker
                                    className='w-full pb-6 pt-2 border outline-none'
                                    format='DD-MM-YYYY'
                                    placeholder='Select Start Date'
                                />
                            </Form.Item>

                            <Form.Item
                                name="endDate"
                                label="End Date"
                                rules={[
                                    {
                                        message: 'End Date is required',
                                        required: true
                                    }
                                ]}
                                style={{ width: '48%' }}
                            >
                                <DatePicker
                                    className='w-full pb-6 pt-2 border outline-none'
                                    format='DD-MM-YYYY'
                                    placeholder='Select End Date'
                                />
                            </Form.Item>
                        </div>

                        <button className='w-full py-2 bg-[var(--color-2)] text-white font-semibold rounded-md'>
                            save
                        </button>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default SCompanyManage
