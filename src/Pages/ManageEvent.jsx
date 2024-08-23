import { Form, Input, Modal, Select, Table } from 'antd';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaEdit, FaRegEye, FaStar } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdCloudDownload, MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
const dataSource = [
    {
        id: '1',
        eventsName: 'Mike',
        QrCodeImage: 'https://i.ibb.co/yWzpt5t/download.png',
    }
]
const ManageEvent = () => {
    const [openAddModal, setOpenAddModal] = useState(false)
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
                    <button onClick={()=>{
                        setOpenAddModal(true)
                    }}>
                        <FaEdit className='cursor-pointer' />
                    </button>
                    <MdOutlineDelete className='cursor-pointer' />
                </div>)
            }
        },
    ];
    const onFinish = (value) => {

    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
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
                        Add New Project
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
                    <p className='text-xl py-2 font-semibold'>Create new Project</p>
                    <Form className=''
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name={`projectName`}
                            label={`Project Name`}
                            rules={[
                                {
                                    message: 'Project Name is required',
                                    required: true
                                }
                            ]}
                        >
                            <Select className='w-full h-[42px]'
                                defaultValue="lucy"
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'Yiminghe',
                                        label: 'yiminghe',
                                    },
                                    {
                                        value: 'disabled',
                                        label: 'Disabled',
                                        disabled: true,
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name={`image`}
                            label={`Upload Qr code Image`}
                            rules={[
                                {
                                    message: ' Qr code Image Name is required',
                                    required: true
                                }
                            ]}
                        >
                            <label className='w-full block py-2 h-[200px] border rounded-md' htmlFor='qrCode'>
                                <img className='w-full h-full object-contain' src={image ? URL.createObjectURL(image) : 'https://i.ibb.co/9c2gMyK/transparent-upload-icon-free-png.webp'} alt="" />
                            </label>
                            <input onChange={(e)=>{
                                setImage(e.target.files[0])
                            }} id='qrCode' type='file' accept='image/*' style={{
                                display: 'none'
                            }} />
                        </Form.Item>
                        <button className='w-full py-2 bg-[var(--color-2)] text-white font-semibold rounded-md'>
                            save
                        </button>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default ManageEvent
