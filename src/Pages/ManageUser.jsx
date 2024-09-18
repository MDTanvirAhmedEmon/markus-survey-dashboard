import { Pagination, Table, Tabs } from 'antd';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useGetUsersQuery, useSoftDeleteCompanyMutation } from '../redux/features/company/company';
import { MdOutlineDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const ManageUser = () => {
  const [ softDelteCompany] = useSoftDeleteCompanyMutation()
  const userType = 'EMPLOYEE'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: getUsers, isLoading, isError } = useGetUsersQuery({ userType, page: currentPage })
  console.log(getUsers);
  // Formatted User list 
  const formattedUserList = getUsers?.data?.map((user, i) => ({
    id: user?.id,
    key: i + 1,
    name: user?.name,
    email: user?.email,
    phone: user?.phone_number
  }))
 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "SL No.",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => ((currentPage - 1) * pageSize) + index + 1
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      dataIndex: "key",
      key: "key",
      render: (_, record) => {
        return (
          <div className="start-center text-2xl gap-1 ">
            {/* <MdEdit className="cursor-pointer" /> */}
            <MdOutlineDelete
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You will be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#1E3042",
                  confirmButtonText: "delete",
                  cancelButtonText: "cancel",
                }).then((result) => {
                  if (result.isConfirmed) {
                    softDelteCompany(record.id).unwrap().then((res) => toast.success(res.message)).catch((err) => toast.error(err.message))
                  }
                });
              }} 
              className="cursor-pointer" />
          </div>
        );
      },
    },
  ];

  return (
    <div className='bg-white rounded-md'>
      <div className="between-center  my-2 pt-5">
        <div className="start-center gap-2 mb-3 p-5">
          <Link
            to={-1}
            className="bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white"
          >
            <IoArrowBackSharp />
            back
          </Link>
          <p className="text-xl">Manage User</p>
        </div>

      </div>


      {/* <div className='p-5 '>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="custom-tabs " />
      </div> */}

      <div className='p-5'>
        <Table
          className="super-admin-pagination"
          pagination={false}
          dataSource={formattedUserList}
          columns={columns}
        />
         <Pagination
        className="custom-pagination-all my-6"
        current={currentPage}
        pageSize={pageSize}
        total={getUsers?.total}
        onChange={handlePageChange}
      />
      </div>


     

    </div>
  )
}

export default ManageUser