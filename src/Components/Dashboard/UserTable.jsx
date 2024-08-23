import { Input, Modal, Table } from 'antd';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaRegEye, FaStar } from 'react-icons/fa';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
        phone: 324189454648487,
        token: 4,
        email: 'gmail@ gmail.com',
    },
    {
        key: '2',
        name: 'Mike',
        img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
        phone: 324189454648487,
        token: 5,
        email: 'gmail@ gmail.com',
    },
    {
        key: '3 ',
        name: 'Mike',
        img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
        phone: 324189454648487,
        token: 7,
        email: 'gmail@ gmail.com',
    },
]
const UserTable = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Driver',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                return (<div className='start-center gap-2'>
                    <img src={record?.img} className='w-[40px] h-[40px] rounded-full' alt="" />
                    <p className='font-medium'>{record?.name}</p>
                </div>)
            }
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone ',
        },
        {
            title: 'Total trip taken',
            dataIndex: 'token',
            key: 'token',
            render: (_, record) => {
                return (<div className='start-center gap-2'>
                    <img src={record?.img} className='w-[40px] h-[40px] rounded-full' alt="" />
                    <p className='font-medium'>{record?.name} ({record?.token})</p>
                </div>)
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email  ',
        },
        {
            title: 'Actions',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => {
                return (<div className='start-center text-2xl gap-1'>
                    <Link to={`/driver-details/id`}>
                        <FaRegEye className='cursor-pointer' />
                    </Link>
                    {/* <MdEdit className='cursor-pointer' /> */}
                    <MdOutlineDelete onClick={() => setOpenDeleteModal(true)} className='cursor-pointer' />
                </div>)
            }
        },
    ];
    return (
        <div className='bg-[var(--color-7)] rounded-md'>
            <div className='between-center px-3 my-2 pt-5'>
                <p className='text-xl'>All Users</p> <Input className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" />
            </div>
            <Table dataSource={dataSource} columns={columns} />
            <Modal
                centered
                footer={false}
                open={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
            >
                <div className='center-center flex-col gap-2 text-2xl capitalize'>
                    <img src="https://i.ibb.co/PMMs3zs/HD-wallpaper-naruto-art-fictional-character-thumbnail.jpg" className='h-24 w-24 rounded-full' alt="" />
                    <div className='start-center gap-1 '>
                        <p>rating : </p>
                        5
                        <FaStar className='text-xl text-[#FFB667]' />
                    </div>
                    <div className='start-center gap-1 '>
                        <p>Name : </p>
                        Omar Almutairi
                    </div>
                    <div className='start-center gap-1 '>
                        <p>Phone Number : </p>
                        01-12586-152
                    </div>
                    <div className='start-center gap-1 '>
                        <p>Email : </p>
                        omaralmutairi@gmail.com
                    </div>
                    <div className='between-center w-full mt-4'>
                        <button onClick={() => setOpenDeleteModal(false)} className='px-4 py-2 pb-3 rounded-3xl border border-[#86D957] text-[#86D957]'>Cancel</button>
                        <button onClick={() => setOpenDeleteModal(false)} className='px-4 py-2 pb-3 rounded-3xl border border-[#86D957] bg-[#86D957] text-[var(--color-7)]'>Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UserTable
