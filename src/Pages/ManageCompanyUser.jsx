import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDeJoinedUserMutation, useShowJoinedUsedQuery } from '../redux/features/company/company';
import Swal from 'sweetalert2';
import { Avatar, message, Modal, Pagination, Table } from 'antd';
import { MdOutlineDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useAssignProjectMutation, useEditUserRequestQuery, useGetEmployeeRequestQuery, useGetProjectsForSurveyRequestQuery } from '../redux/features/employeeRequest/employeeRequestApi';
import { imageUrl } from '../redux/api/baseApi';
import { MakeFormData } from '../utils/FormDataHooks';

const ManageCompanyUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  // assign new project
  const [previousSelectId, setPreviousSelectId] = useState([])
  const [openAllowModal, setOpenAllowModal] = useState(false)
  const [userId, setUserId] = useState(null);
  const [Id, setId] = useState(null);
  const [openAssignProjectModal, setOpenAssignProjectModal] = useState(false)
  const [acceptUserId, setAcceptUserId] = useState('')
  const { data } = useGetEmployeeRequestQuery({status : 'accepted'});
  const [user, setUser]  = useState(true)
  const { data: getUsers, } = useShowJoinedUsedQuery();
  const [deJoinedUser] = useDeJoinedUserMutation()
  const { data: projects } = useGetProjectsForSurveyRequestQuery({
    page: currentPage
});
const { data: getRequestUser } = useEditUserRequestQuery(acceptUserId)
const [assignProject] = useAssignProjectMutation()
  const formattedJoinedUser = getUsers?.data?.map((user, i) => ({
    key: i + 1,
    id: user?.id,
    userName: user?.user_details?.email,
    userId: user?.user_id
  }))

  useEffect(() => {

    if (getRequestUser?.project_ids) {
        setPreviousSelectId([...getRequestUser.project_ids]);
    }
}, [getRequestUser, acceptUserId])

  const column = [
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

const handlePageChange = (page) => {
  setCurrentPage(page);
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



  const columns = [
    {
      title: "SL No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "User Email",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },

    {
      title: "Actions",
      dataIndex: "key",
      key: "key",
      render: (_, record) => {
        return (

          <div className="start-center text-2xl gap-1 ">

            <MdOutlineDelete onClick={() => handleDejoinedUser(record?.id)} className="cursor-pointer" />
          </div>
        );
      },
    },
  ];


  const handleDejoinedUser = (id) => {
    const data = new FormData()
    data.append('_method', 'PUT')


    Swal.fire({
      title: "Are you sure?",
      text: "Remove this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ECB206",
      cancelButtonColor: "#1E3042",
      confirmButtonText: "delete",
      cancelButtonText: "cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deJoinedUser({ id, data }).unwrap()
          .then((res) => toast.success(res.message))
          .catch((err) => toast.error(err.message))
      }
    });
  }

  const slicedData = data?.data?.data || [];

  return (
    <div className="bg-[var(--color-7)] rounded-md">
      <div className="start-center gap-2 mb-3 p-5">
        <Link
          to={-1}
          className="bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white"
        >
          <IoArrowBackSharp />
          back
        </Link>
        <p className="text-xl">Manage Users</p>
      </div>

      <div className='flex  gap-5 ml-5'>
        <p onClick={()=> setUser(true)} className={`border shadow-md rounded-full px-10 py-2 border-yellow-600  cursor-pointer ${user ? 'text-white bg-yellow-600' : 'text-yellow-600'} `}>All Users</p>
        <p onClick={()=> setUser(false)} className={`border shadow-md rounded-full px-10 py-2 border-yellow-600  cursor-pointer ${!user ? 'text-white bg-yellow-600 ' : 'text-yellow-600'}`}>Assigned Projects</p>
      </div>


      <div className='p-5'>
        {
          user ? <Table
          className="super-admin-pagination"
          pagination={false}
          dataSource={formattedJoinedUser}
          columns={columns}
        /> : <Table className='dashboard-custom-table' pagination={false} dataSource={slicedData} columns={column} />
        }
        {/* <Pagination
        className="custom-pagination-all my-6"
        current={currentPage}
        pageSize={pageSize}
        total={getUsers?.total}
        onChange={handlePageChange}
      /> */}
      </div>
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
  );
}

export default ManageCompanyUser;
