import React from 'react'
import { FaPlus } from 'react-icons/fa6';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const ManageUser = () => {
  return (
    <div>
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
        {/* <div className="end-center gap-2">
          <button
            onClick={() => {
              setOpenAddModal(true);
              form.resetFields();
            }}
            className="bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap"
          >
            Add New Admin
            <FaPlus />
          </button>
        </div> */}
      </div>



    </div>
  )
}

export default ManageUser