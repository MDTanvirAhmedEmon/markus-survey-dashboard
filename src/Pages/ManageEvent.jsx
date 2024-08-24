import { Form, Input, message, Modal, Pagination, Popconfirm, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaEdit, FaRegEye, FaStar } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdCloudDownload, MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useGetSurveyForManageCompanyQuery } from '../redux/features/questions/questionsApi';
import { useGenerateQRCodeMutation } from '../redux/features/Event/EventApi';
const dataSource = [
    {
        id: '1',
        eventsName: 'Mike',
        QrCodeImage: 'https://i.ibb.co/yWzpt5t/download.png',
    }
]
const ManageEvent = () => {

    const [currentPageSurvey, setCurrentPageSurvey] = useState(1);
    const pageSize = 10;

    // get surveys 
    const { data: surveys } = useGetSurveyForManageCompanyQuery({
        page: currentPageSurvey
    })

    const surveryOptions = surveys?.data?.data?.map(survey => ({
        value: survey.id,
        label: survey.survey_name
    }));
    // QRCode APi
    // const [generateQRCode, { data, isSuccess, isError, error }] = useGenerateQRCodeMutation();
    // console.log('QRCode isSuccess', isSuccess)
    // console.log('QRCode isError', isError)
    // console.log('QRCode Error', error)

    // useEffect(() => {
    //     if (isSuccess) {
    //         message.success({data?.message});
    //     }
    //     if (isError) {
    //         message.error({data?.message});
    //     }

    // }, [isSuccess, isError]);


    const handlePageChangeSurvey = (page) => {
        setCurrentPageSurvey(page);
    };

    // const confirm = (e) => {
    //     console.log(e);
    //     message.success('Click on Yes');
    // };
    // const cancel = (e) => {
    //     console.log(e);
    //     message.error('Click on No');
    // };


    const CustomDropdownSurvey = (menu) => (
        <div>
            {menu}
            <Pagination
                className="custom-pagination-all py-4"
                current={currentPageSurvey}
                pageSize={pageSize}
                total={surveys?.data?.total}
                onChange={handlePageChangeSurvey}
                style={{ textAlign: 'center', marginTop: 10 }}
            />
        </div>
    );


    const [openAddModal, setOpenAddModal] = useState(false)
    const [showQRCodeModal, setShowQRCodeModal] = useState(false)


    const [image, setImage] = useState(null)
    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Events Name',
            dataIndex: 'eventsName',
            key: 'eventsName ',
        },
        {
            title: 'Qr Code Image',
            dataIndex: 'QrCodeImage',
            key: 'QrCodeImage',
            render: (_, record) => (<div>
                <img className='w-28' src={record?.QrCodeImage} alt="" />
            </div>)
        },
        {
            title: 'Actions',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => {
                return (<div className='start-center text-2xl gap-1'>
                    <button to={`/driver-details/id`}>
                        <MdCloudDownload className='cursor-pointer' />
                    </button>
                    <button onClick={() => {
                        setShowQRCodeModal(true)
                    }}>
                        <FaEdit className='cursor-pointer' />
                    </button>
                    {/* <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    > */}
                        <MdOutlineDelete className='cursor-pointer' />
                    {/* </Popconfirm> */}


                </div>)
            }
        },
    ];
    const onFinish = (value) => {
        console.log(value)
        // generateQRCode(value.surveyId)
        console.log(value.surveyId)

    }

    return (
        <div className='bg-[var(--color-7)] rounded-md'>
            <div className='between-center px-3 my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1} className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link>
                    <p className='text-xl'>Events Manage</p>
                </div>
                <div className='end-center gap-2'>
                    <Input className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" />
                    <button onClick={() => setOpenAddModal(true)} className='bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        Add New Event
                        <FaPlus />
                    </button>
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns} />
            <Modal
                centered
                footer={false}
                open={openAddModal}
                onCancel={() => setOpenAddModal(false)}
            >
                <div>
                    <p className='text-xl py-2 font-semibold'>Create new Event</p>
                    <Form className=''
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name={`surveyId`}
                            label={`Survey`}
                            rules={[
                                {
                                    message: 'Survey Name is required',
                                    required: true
                                }
                            ]}
                        >
                            <Select className='w-full h-[42px]'
                                placeholder="Select A Survey"
                                options={surveryOptions}
                                dropdownRender={CustomDropdownSurvey}
                            />
                        </Form.Item>

                        <button className='w-full py-4 bg-[var(--color-2)] text-white text-md rounded-md'>
                            Generate QRCode
                        </button>
                    </Form>
                </div>
            </Modal>



            {/* QRCode Modal */}
            <Modal
                centered
                footer={false}
                open={showQRCodeModal}
                onCancel={() => setShowQRCodeModal(false)}
            >
                <div>
                    <p className='text-xl py-2 font-semibold'>Scan QRCode</p>
                    <img className=' w-[500px]' src={`https://i.ibb.co/yWzpt5t/download.png`} alt="" />
                </div>
            </Modal>
        </div>
    )
}

export default ManageEvent
