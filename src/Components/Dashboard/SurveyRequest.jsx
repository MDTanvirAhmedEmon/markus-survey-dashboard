import { Avatar, ConfigProvider, message, Modal, Pagination, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useAcceptRequestMutation, useGetEmployeeRequestQuery, useGetProjectsForSurveyRequestQuery } from '../../redux/features/employeeRequest/employeeRequestApi';
import { MakeFormData } from '../../utils/FormDataHooks';
import { imageUrl } from '../../redux/api/baseApi';


const SurveyRequest = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [openAllowModal, setOpenAllowModal] = useState(false)

    // get all
    const { data: projects } = useGetProjectsForSurveyRequestQuery({
        page: currentPage
    });
    console.log(projects)

    // employee request api
    const { data } = useGetEmployeeRequestQuery();
    console.log("request",data)

    // accept request
    const [acceptRequest, { isLoading, isSuccess, isError }] = useAcceptRequestMutation();

    useEffect(() => {
        if (isSuccess) {
            message.success("Accepted Request Successfully");
            setOpenAllowModal(false)
        } else if (isError) {
            message.error("Request Acceptance Failed");
            setOpenAllowModal(false)
        }
    }, [isSuccess, isError]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const [selectedID, setSelectedID] = useState([])
    const [userId, setUserId] = useState(null);
    const [Id, setId] = useState(null);


    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'serial',
            key: 'serial',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email  ',
            render: (_, record) => {
                return (<div className=''>
                    <p className='font-medium'>{record?.user_details?.email}</p>
                </div>)
            }
        },
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                return (<div className='flex items-center gap-3'>
                    {
                        record?.user_details?.image ? <img src={`${imageUrl}${record?.user_details?.image}`} className='w-[40px] h-[40px] rounded-sm' alt="" /> : <Avatar shape="square"></Avatar>
                    }

                    <p className='font-medium'>{record?.user_details?.name}</p>
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
                    <button
                        onClick={() => {
                            setOpenAllowModal(true);
                            setUserId(record?.user_id);
                            setId(record?.id);
                        }}
                        className='px-4 py-2 rounded-3xl text-white font-semibold bg-green-600'
                    >
                        Allow
                    </button>
                    <button className='px-4 py-2 rounded-3xl text-white font-semibold bg-red-600'> Cancel </button>
                </div>)
            },

        },

    ];

    const handleSave = () => {
        const data = {
            id: Id,
            project_ids: JSON.stringify(selectedID),
            user_id: userId
        }
        console.log("accept request data", data)

        const formData = MakeFormData(data);

        acceptRequest(formData)
    };

    if (isLoading) {
        return (
            <div className='h-[600px] flex items-center justify-center'>
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
        )
    }

    const slicedData = data?.data?.data?.slice(0, 3) || [];

    return (
        <div className='bg-[var(--color-7)] rounded-md mb-8'>
            <Table className='dashboard-custom-table' pagination={false} dataSource={slicedData} columns={columns} />
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
                            projects?.data?.data?.map((item) => <div key={item?.id} onClick={() => {
                                const findId = selectedID.find(id => item?.id === id)
                                if (findId) {
                                    const filterID = selectedID.filter(id => item?.id !== id)
                                    setSelectedID(filterID)
                                } else {
                                    setSelectedID([...selectedID, item?.id])
                                }
                            }} className={`w-full p-4 py-10 rounded-md text-white font-semibold text-center cursor-pointer select-none ${selectedID.includes(item?.id) ? 'bg-[#BD8E05]' : 'bg-[var(--color-2)]'}`}>
                                <p className='text-base'>{item?.project_name}</p>
                            </div>)
                        }
                    </div>

                </div>
                <div className="py-2 mt-4">
                    <Pagination
                        className="custom-pagination-all"
                        current={currentPage}
                        pageSize={pageSize}
                        total={projects?.data?.total}
                        onChange={handlePageChange}
                    />
                </div>
                <button onClick={handleSave} className='p-2 mt-5 w-full bg-[var(--color-2)] text-white text-lg rounded'>
                    Save
                </button>
            </Modal>
        </div>
    )
}

export default SurveyRequest;
