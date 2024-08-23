import { Input, Modal, Table } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useRef, useState } from 'react'
import { BiSolidShare } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { FaRegEye, FaStar } from 'react-icons/fa';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        status: 'pending',
        time: '8:38 AM',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum       '
    },
    {
        key: '2',
        name: 'Mike',
        status: 'pending',
        time: '8:38 AM',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum       '
    },
    {
        key: '3                   ',
        name: 'Mike',
        status: 'replied',
        time: '8:38 AM',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum       '
    },
]

const FeedBack = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openReplayModal, setOpenReplayModal] = useState(false)
    const ReplayRef = useRef()
    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description ',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time  ',
        },
        {
            title: 'Status',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => {
                return (<div>
                    <button onClick={() => setOpenReplayModal(true)} disabled={record?.status === 'replied'} className='center-center text-2xl disabled:text-[var(--color-2)] gap-1 border p-1 px-2 disabled:border-[var(--color-2)] rounded-md text-[#5B52A3] border-[#5B52A3] capitalize'>
                        <BiSolidShare /> <p className='text-base'>{record?.status}</p>
                    </button>
                </div>)
            }
        },
        {
            title: 'Actions',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => {
                return (<div className='start-center text-2xl gap-1'>
                    <MdOutlineDelete onClick={() => setOpenDeleteModal(true)} className='cursor-pointer' />
                </div>)
            }
        },
    ];
    const HandleReplay = () => {
        console.log(ReplayRef.current.value)
    }
    return (
        <div className='bg-[var(--color-7)] rounded-md'>
            <div className='start-center gap-2 mb-3 p-5'>
                <Link to={-1} className='bg-[#86D957] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link> <p>Feedback</p>
            </div>
            <Table dataSource={dataSource} columns={columns} />
            <Modal
                centered
                footer={false}
                open={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                width={300}
            >
                <div className='center-center flex-col gap-2 text-2xl capitalize'>
                    <p>are you sure ? </p>
                    <div className='between-center w-full mt-4'>
                        <button onClick={() => setOpenDeleteModal(false)} className='px-4 py-2 pb-3 rounded-3xl border border-[#86D957] text-[#86D957]'>Cancel</button>
                        <button onClick={() => setOpenDeleteModal(false)} className='px-4 py-2 pb-3 rounded-3xl border border-[#86D957] bg-[#86D957] text-[var(--color-7)]'>Delete</button>
                    </div>
                </div>
            </Modal>
            <Modal
                centered
                footer={false}
                open={openReplayModal}
                onCancel={() => setOpenReplayModal(false)}
            >
                <p className='text-xl'>Feedback Reply</p>
                <p className='mt-1 text-base text-[#929394]'>Feedback form: Jullu Jalal</p>
                <p className='p-2 border mt-1 text-[#555656]'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure </p>
                <p className=' text-base text-[#929394] mt-2'>Your Reply :</p>
                <textarea ref={ReplayRef} style={{
                    height: '300px',
                    resize: 'none',
                }} placeholder="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure" className='p-2 border mt-1 text-[#555656] w-full outline-none' />
                <div className='text-center mt-3'>
                    <button onClick={()=>{HandleReplay();setOpenReplayModal(false)}} className='px-8 py-2 rounded-3xl border border-[#86D957] bg-[#86D957] text-[var(--color-7)]' >Reply</button>
                </div>
            </Modal>
        </div>
    )
}
export default FeedBack
