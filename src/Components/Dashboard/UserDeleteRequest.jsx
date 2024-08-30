import { Input, message, Modal, Table } from 'antd';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaEdit, FaRegEye, FaStar, FaUser } from 'react-icons/fa';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../redux/api/baseApi';
import { useDeleteEmployeeMutation, useDeleteEmployeeRequestQuery } from '../../redux/features/dashboard/dashboardApi';

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
const UserDeleteRequest = () => {
    const [openAllowModal, setOpenAllowModal] = useState(false)

    // get request
    const { data: deleteRequestUser, isError, isLoading, refetch } = useDeleteEmployeeRequestQuery()
    const [userDeleteId, setUserDeleteId] = useState("")
    const [userCancelId, setUserCancelId] = useState("")



    const formattedDeleteUserRequest = deleteRequestUser?.data?.map((user, i) => ({
        id: user?.id,
        key: i + 1,
        name: user?.name ? user?.name : "",
        img: user?.image ? `${imageUrl}${user?.image}` : <FaUser />,
        email: user?.email
    }))


    // delete
    const [deleteEmployee] = useDeleteEmployeeMutation();

    // cancel 



    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'User',
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email  ',
        },

        {
            title: 'Request',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => {
                return (<div className='start-center gap-1'>
                    <button onClick={() => {
                        setOpenAllowModal(true)
                        setUserDeleteId(record?.id)
                    }} className='px-4 py-2 rounded-3xl text-white font-semibold bg-green-600'> Allow </button>
                    <button className='px-4 py-2 rounded-3xl text-white font-semibold bg-red-600'> Cancel </button>
                </div>)
            }
        },


    ];

    const handleDeleteUser = () => {
        try {
            deleteEmployee(userDeleteId).unwrap();
            message.success('User deleted successfully');
            setOpenAllowModal(false)
            refetch()

        } catch (err) {
            message.error('Failed to delete user');
        }
    }



    return (
        <div className='bg-[var(--color-7)] rounded-md'>
            <Table dataSource={formattedDeleteUserRequest} columns={columns} pagination={false} />
            <Modal
                centered
                footer={false}

                open={openAllowModal}
                onCancel={() => setOpenAllowModal(false)}
                width={400}
            >
                <div style={{ textAlign: 'center', height: '100px' }} className='capitalize '>
                    <div className='mb-7'>
                        <p>Do you want to delete the user?</p>
                    </div>
                    <button className='p-3 px-8 mr-3 bg-[var(--color-2)]' onClick={() => handleDeleteUser()} >Yes</button>
                    <button className='p-3 px-8 mr-3 bg-[var(--color-2)]' onClick={() => setOpenAllowModal(false)}>No</button>
                </div>
            </Modal>
        </div>
    )
}

export default UserDeleteRequest
