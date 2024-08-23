import { Input, Modal, Table } from 'antd';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaEdit, FaRegEye, FaStar } from 'react-icons/fa';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
        phone: 324189454648487,
        rating: 4.5,
        email: 'gmail@ gmail.com',
        regNo: '225.555.0118'
    },
    {
        key: '2',
        name: 'Mike',
        img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
        phone: 324189454648487,
        rating: 4.5,
        email: 'gmail@ gmail.com',
        regNo: '225.555.0118'
    },
    {
        key: '3 ',
        name: 'Mike',
        img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
        phone: 324189454648487,
        rating: 4.5,
        email: 'gmail@ gmail.com',
        regNo: '225.555.0118'
    },
]
const sarvayData = [
    { name: 'Customer Feedback', id: '1' },
    { name: 'Customer Feedback', id: '2' },
    { name: 'Customer Feedback', id: '3' },
    { name: 'Customer Feedback', id: '4' },
    { name: 'Customer Feedback', id: '5' },
    { name: 'Customer Feedback', id: '6' },
    { name: 'Customer Feedback', id: '7' },
    { name: 'Customer Feedback', id: '8' },
    { name: 'Customer Feedback', id: '9' },
]
const SurveyRequest = () => {
    
    const [openAllowModal, setOpenAllowModal] = useState(false)
    const [selectedID, setSelectedID] = useState([])

    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email  ',
        },
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                return (<div className='start-center gap-2'>
                    <img src={record?.img} className='w-[40px] h-[40px] rounded-sm' alt="" />
                    <p className='font-medium'>{record?.name}</p>
                </div>)
            }
        },

        {
            title: 'Request',
            dataIndex: 'key',
            align: "right",
            key: 'key',
            render: (_, record) => {
                return (<div className='start-center gap-1'>
                    <button onClick={() => setOpenAllowModal(true)} className='px-4 py-2 rounded-3xl text-white font-semibold bg-green-600'> Allow </button>
                    <button className='px-4 py-2 rounded-3xl text-white font-semibold bg-red-600'> Cancel </button>
                </div>)
            },

        },

    ];




    return (
        <div className='bg-[var(--color-7)] rounded-md mb-8'>
            <Table className='dashboard-custom-table' pagination={false} dataSource={dataSource} columns={columns} />
            <Modal
                centered
                footer={false}
                open={openAllowModal}
                onCancel={() => setOpenAllowModal(false)}
            >
                <div className=' capitalize'>
                    <p className='mb-5 text-left text-xl my-2'>Assign Project</p>
                    <div className='grid grid-cols-3 gap-4 justify-start items-center '>
                        {
                            sarvayData?.map((item) => <div key={item?.id} onClick={() => {
                                const findId = selectedID.find(id => item?.id === id)
                                if (findId) {
                                    const filterID = selectedID.filter(id => item?.id !== id)
                                    setSelectedID(filterID)
                                } else {
                                    setSelectedID([...selectedID, item?.id])
                                }
                            }} className={`w-full p-4 py-6 rounded-md text-white font-semibold text-center cursor-pointer select-none ${selectedID.includes(item?.id) ? 'bg-[#BD8E05]' : 'bg-[var(--color-2)]'}`}>
                                <p className='text-base'>{item?.name}</p>
                            </div>)
                        }
                    </div>
                    <button className='p-2 mt-5 w-full bg-[var(--color-2)]'>
                        save
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default SurveyRequest;
