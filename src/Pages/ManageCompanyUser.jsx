import React from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDeJoinedUserMutation, useShowJoinedUsedQuery } from '../redux/features/company/company';
import Swal from 'sweetalert2';
import { Table } from 'antd';
import { MdOutlineDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

const ManageCompanyUser = () => {
    const {data :  getUsers , isLoading} =  useShowJoinedUsedQuery();
    const [deJoinedUser] =  useDeJoinedUserMutation()
    const formattedJoinedUser = getUsers?.data?.map((user, i)=>({
        key : i + 1,
        id  : user?.id,
        userName : user?.user_details?.email,
        userId  :  user?.user_id
    }))



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
                
                <MdOutlineDelete onClick={() =>  handleDejoinedUser(record?.id) } className="cursor-pointer" />
              </div>
            );
          },
        },
      ];


      const handleDejoinedUser = (id) =>{
        const data = new FormData()
        data.append('_method' , 'PUT')


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
                deJoinedUser({id , data}).unwrap()
                .then((res) => toast.success(res.message))
                .catch((err) => toast.error(err.message))
            }
          });
      }
    
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


            <div className='p-5'>
        <Table
          className="super-admin-pagination"
          pagination={false}
          dataSource={formattedJoinedUser}
          columns={columns}
        />
         {/* <Pagination
        className="custom-pagination-all my-6"
        current={currentPage}
        pageSize={pageSize}
        total={getUsers?.total}
        onChange={handlePageChange}
      /> */}
      </div>


        </div>
    );
}

export default ManageCompanyUser;
