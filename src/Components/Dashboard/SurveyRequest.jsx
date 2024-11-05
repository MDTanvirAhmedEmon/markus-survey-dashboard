import { Avatar, ConfigProvider, message, Modal, Pagination, Spin, Table } from 'antd';
import  { useEffect, useState } from 'react'
import { useAcceptRequestMutation, useAssignProjectMutation, useEditUserRequestQuery, useGetEmployeeRequestQuery, useGetProjectsForSurveyRequestQuery } from '../../redux/features/employeeRequest/employeeRequestApi';
import { MakeFormData } from '../../utils/FormDataHooks';
import { imageUrl } from '../../redux/api/baseApi';


const SurveyRequest = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [openAllowModal, setOpenAllowModal] = useState(false)
    const [openAssignProjectModal, setOpenAssignProjectModal] = useState(false)
    const [acceptUserId, setAcceptUserId] = useState('')
    // get all
    const { data: projects } = useGetProjectsForSurveyRequestQuery({
        page: currentPage
    });

    // employee request api
    const { data } = useGetEmployeeRequestQuery({status : 'pending'});
    console.log(data);
    // accept request
    const [acceptRequest, { isLoading, isSuccess, isError }] = useAcceptRequestMutation();
    const { data: getRequestUser } = useEditUserRequestQuery(acceptUserId)
    const [assignProject] = useAssignProjectMutation()

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

    // assign new project
    const [previousSelectId, setPreviousSelectId] = useState([])
    const [user_ids, setUserIds] = useState(null)
    useEffect(() => {
        if (getRequestUser?.project_ids) {
            setPreviousSelectId([...getRequestUser.project_ids]);
        }
    }, [getRequestUser, acceptUserId])
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
                return (record?.status == "pending" ? <div className='start-center gap-1'>
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
                </div> : <div className='start-center gap-1'>
                    <button
                        onClick={() => {
                            setOpenAssignProjectModal(true);
                            setAcceptUserId(record?.user_id)
                        }}
                        className='px-4 py-2 rounded-3xl text-white font-semibold bg-green-600'
                    >
                        Edit
                    </button>
                    {/* <button className='px-4 py-2 rounded-3xl text-white font-semibold bg-red-600'> Cancel </button> */}
                </div>)
            },

        },

    ];

    const handleSave = () => {
        if (selectedID.length == 0) {
            return message.error("Please select at least a project!")
        }
        const data = {
            id: Id,
            project_ids: JSON.stringify(selectedID),
            user_id: userId
        }

        const formData = MakeFormData(data);

        acceptRequest(formData).unwrap()
            .then((payload) => {
                if (payload?.message) {

                }
            })
            .catch((error) => console.error('rejected', error));
    };

    const handleAssignProject = () => {
        const data = {
            project_ids: JSON.stringify(previousSelectId),
            user_id: acceptUserId
        }
        const formData = MakeFormData(data);
        assignProject(formData).unwrap()
            .then((payload) => {
                message.success(payload?.message)
                setOpenAssignProjectModal(false)
            })
            .catch((error) => {
                message.error("Project not update")
                setOpenAssignProjectModal(false)

            });

    }

    // const handleEditUserProject =(id)=>{
    //     setAcceptUserId(id)

    // }




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
    console.log(slicedData);
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

            {/* Assign Project Modal */}
            <Modal
                centered
                footer={false}
                open={openAssignProjectModal}
                onCancel={() => setOpenAssignProjectModal(false)}
            >
                <div className=' capitalize'>
                    <p className='mb-5 text-left text-xl my-2'>Assign Project</p>
                    <div className='grid grid-cols-3 gap-4 justify-start items-center '>
                        {
                            projects?.data?.data?.map((item) => <div key={item?.id} onClick={() => {
                                const findId = previousSelectId.find(id => item?.id === id)
                                if (findId) {
                                    const filterID = previousSelectId.filter(id => item?.id !== id)
                                    setPreviousSelectId(filterID)
                                } else {
                                    setPreviousSelectId([...previousSelectId, item?.id])
                                }
                            }} className={`w-full p-4 py-10 rounded-md text-white font-semibold text-center cursor-pointer select-none ${previousSelectId.includes(item?.id) ? 'bg-[#BD8E05]' : 'bg-[var(--color-2)]'}`}>
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
                <button onClick={handleAssignProject} className='p-2 mt-5 w-full bg-[var(--color-2)] text-white text-lg rounded'>
                    Save
                </button>
            </Modal>
        </div>
    )
}

export default SurveyRequest;
