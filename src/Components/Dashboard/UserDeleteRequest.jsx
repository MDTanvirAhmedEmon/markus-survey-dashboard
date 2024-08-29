import { Input, message, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import {  FaUser } from 'react-icons/fa';
import { useCancelEmployeeMutation, useDeleteEmployeeMutation, useDeleteEmployeeRequestQuery } from '../../redux/features/dashboard/dashboardApi';
import { imageUrl } from '../../redux/api/baseApi';
// const dataSource = [
//     {
//         key: '1',
//         name: 'Mike',
//         img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
//         phone: 324189454648487,
//         rating: 4.5,
//         email: 'gmail@ gmail.com',
//         regNo: '225.555.0118'
//     },
//     {
//         key: '2',
//         name: 'Mike',
//         img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
//         phone: 324189454648487,
//         rating: 4.5,
//         email: 'gmail@ gmail.com',
//         regNo: '225.555.0118'
//     },
//     {
//         key: '3 ',
//         name: 'Mike',
//         img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
//         phone: 324189454648487,
//         rating: 4.5,
//         email: 'gmail@ gmail.com',
//         regNo: '225.555.0118'
//     },
// ]
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
    const [selectedID, setSelectedID] = useState([])
    // get
    const { data: deleteRequestUser, isLoading } = useDeleteEmployeeRequestQuery()

    const [userDeleteId, setUserDeleteId] = useState(null)
    const [cancelId, setCancelId] = useState(null)

    // Deleting a user - only trigger if userDeleteId is not null
    const [deleteEmployee, { isSuccess, isError, refetch }] = useDeleteEmployeeMutation();
    console.log(isSuccess)
    console.log(isError)

    const [cancelEmployee, { isSuccess: cancelSuccess, isError: cancelError }] = useCancelEmployeeMutation();


    useEffect(() => {
        if (isSuccess) {
            message.success("Delete Request Successful");
            setOpenAllowModal(false);
            refetch();
        }
        if (isError) {
            message.error("Deletion Failed");
            setOpenAllowModal(false);
        }
    }, [isSuccess, isError]);




    const formattedDeleteUserRequest = deleteRequestUser?.data?.map((user, i) => ({
        id: user?.id,
        key: i + 1,
        name: user?.name ? user?.name : "",
        img: user?.image ? `${imageUrl}${user?.image}` : <FaUser />,
        email: user?.email
    }))


    console.log(userDeleteId)
    console.log(formattedDeleteUserRequest)


    const handleCancel = () => {
        cancelEmployee(cancelId)
    }


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
                    <buttonon Click={() => {
                        setCancelId(record?.id)
                        
                    }} className='px-4 py-2 rounded-3xl text-white font-semibold bg-red-600'> Cancel </buttonon>
                </div>)
            }
        },


    ];

    const handleDeleteUser = () => {
        console.log(userDeleteId)
        deleteEmployee(userDeleteId)
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

export default UserDeleteRequest
