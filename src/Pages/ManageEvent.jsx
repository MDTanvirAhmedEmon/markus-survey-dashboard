import { ConfigProvider, Form, Input, message, Modal, Pagination, Popconfirm, QRCode, Select, Spin, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaEdit, FaRegEye, FaStar } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdCloudDownload, MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useGetSurveyForManageCompanyQuery } from '../redux/features/questions/questionsApi';
import { useDeleteQRCodeMutation, useGenerateQRCodeMutation, useGetEventWithCRCodeQuery } from '../redux/features/Event/EventApi';

const ManageEvent = () => {

    const [currentPageSurvey, setCurrentPageSurvey] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(null);
    console.log(searchTerm)
    const pageSize = 10;

    const [openAddModal, setOpenAddModal] = useState(false)
    const [showQRCodeModal, setShowQRCodeModal] = useState(false)

    // get surveys 
    const { data: surveys } = useGetSurveyForManageCompanyQuery({
        page: currentPageSurvey
    })

    const surveryOptions = surveys?.data?.data?.map(survey => ({
        value: survey.id,
        label: survey.survey_name
    }));
    // QRCode Generation APi
    const [generateQRCode, { data }] = useGenerateQRCodeMutation();

    useEffect(() => {
        if (data) {
            message.success(data?.message);
            setOpenAddModal(false)
        }

    }, [data]);

    // get event with QRCode
    const { data: event, isLoading } = useGetEventWithCRCodeQuery({
        page: currentPage,
        search: searchTerm,
    });

    // delete qrcode
    const [deleteQRCode, { isLoading: deleteLoading }] = useDeleteQRCodeMutation();

    // Pop confirm
    const confirm = async (event) => {
        console.log('event', event)
        try {
            await deleteQRCode(event?.id).unwrap();
            message.success('Event deleted successfully');
        } catch (error) {
            message.error('Failed to delete the Event');
            console.error('Error deleting Event:', error);
        }
    };


    const cancel = (e) => {
        console.log(e);
        message.error('Deletion Cancle');
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const handlePageChangeSurvey = (page) => {
        setCurrentPageSurvey(page);
    };

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


    const [image, setImage] = useState(null)

    // for qrcode modal
    const [selectedQRCode, setSelectedQRCode] = useState(null);
    console.log('selected code')

    const handleShowQRCodeModal = (qrCodeValue) => {
        setSelectedQRCode(qrCodeValue);
        setShowQRCodeModal(true);
    };

    const qrRef = useRef(null);
    // download qrcode
    const downloadQRCode = () => {
        const qrElement = qrRef.current?.querySelector('canvas');
        if (qrElement) {
            const url = qrElement.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = 'qrcode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };


    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Events Name',
            dataIndex: 'eventsName',
            key: 'eventsName',
            render: (_, record) => <p>{record?.survey?.survey_name}</p>,
        },
        {
            title: 'Qr Code Image',
            dataIndex: 'QrCodeImage',
            key: 'QrCodeImage',
            render: (_, record) => (

                <div ref={qrRef} >
                    <QRCode size={80} value={`http://192.168.10.188:3001/surveyAllQuestions/${record?.barcode}`} />
                </div>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => {
                const qrCodeValue = `http://192.168.10.188:3001/surveyAllQuestions/${record?.barcode}`;
                return (
                    <div className="start-center text-2xl gap-1">
                        <button>
                            <MdCloudDownload onClick={downloadQRCode} className="cursor-pointer mr-1" />
                        </button>
                        <button
                            onClick={() => handleShowQRCodeModal(qrCodeValue)}
                        >
                            <FaRegEye className="cursor-pointer mx-2" />
                        </button>
                        <Popconfirm
                            title="Delete The Event"
                            description="Are you sure to delete this Event?"
                            onConfirm={() => confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <MdOutlineDelete className="cursor-pointer" />
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];


    const onFinish = (value) => {
        console.log(value)
        generateQRCode(value.surveyId)
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    // const dataURLToBlob = (dataURL) => {
    //     const byteString = atob(dataURL.split(',')[1]);
    //     const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    //     const ab = new ArrayBuffer(byteString.length);
    //     const ia = new Uint8Array(ab);
    //     for (let i = 0; i < byteString.length; i++) {
    //       ia[i] = byteString.charCodeAt(i);
    //     }
    //     return new Blob([ab], { type: mimeString });
    //   };


    /*
    
      const canvas = qrRef.current.querySelector('canvas');
    const dataURL = canvas.toDataURL('image/png');
    const formData = new FormData();
    formData.append('qrImage', dataURLToBlob(dataURL), 'qrcode.png');
    formData.forEach((value, key) => console.log(key, value))
    */
    return (
        <div className='bg-[var(--color-7)] rounded-md'>
            <div className='between-center px-3 my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1} className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link>
                    <p className='text-xl'>Events Manage</p>
                </div>
                <div className='end-center gap-2'>
                    <Input onChange={(e) => setSearchTerm(e.target.value)} className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" />
                    <button onClick={() => setOpenAddModal(true)} className='bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        Add New Event
                        <FaPlus />
                    </button>
                </div>
            </div>
            {
                 isLoading ? <div className=' h-[500px] flex items-center justify-center'>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#ECB206",
                            },
                        }}
                    >
                        <Spin size="large" />
                    </ConfigProvider>

                </div>
                    : <Table dataSource={event?.survey?.data} columns={columns} pagination={false} />
            }

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

                        <button className='w-full py-2 bg-[var(--color-2)] text-lg text-white font-semibold rounded-md'>
                            Save
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
                className=''
            >
                <div>
                    <p className="text-xl w-full py-6 font-semibold text-center ">Scan QRCode</p>
                    {selectedQRCode && (
                        <QRCode className=' mx-auto mb-16' size={256} value={selectedQRCode} />
                    )}
                </div>
            </Modal>
            <div className="py-6">
                <Pagination
                    className="custom-pagination-all"
                    current={currentPage}
                    pageSize={pageSize}
                    total={event?.survey?.total}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default ManageEvent
