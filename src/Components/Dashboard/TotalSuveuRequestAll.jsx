import { Input, Modal, Table } from 'antd';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaEdit, FaRegEye, FaStar, FaUser } from 'react-icons/fa';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
// import { useDeleteEmployeeQuery, useDeleteEmployeeRequestQuery } from '../../redux/features/dashboard/dashboardApi';
import { imageUrl } from '../../redux/api/baseApi';
import { useDeleteEmployeeRequestQuery } from '../../redux/features/dashboard/dashboardApi';

const TotalSuveuRequestAll = () => {
    const [openAllowModal, setOpenAllowModal] = useState(false)
    const [selectedID, setSelectedID] = useState([])
    const { data: deleteRequestUser, isError, isLoading } = useDeleteEmployeeRequestQuery()
    const [userDeleteId, setUserDeleteId] = useState("")
    // const { data: deleteUser, error, loading } = useDeleteEmployeeQuery({ userDeleteId })


    const formattedDeleteUserRequest = deleteRequestUser?.data?.map((user, i) => ({
        id: user?.id,
        key: i + 1,
        name: user?.name ? user?.name : "",
        img: user?.image ? `${imageUrl}${user?.image}` : <FaUser />,
        email: user?.email




    }))
    // console.log(deleteRequestUser)
    // console.log(formattedDeleteUserRequest)


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
        deleteUser
    }



    return (
        <div className='bg-[var(--color-7)] rounded-md'>
            <Table dataSource={formattedDeleteUserRequest} columns={columns} />
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

export default TotalSuveuRequestAll
