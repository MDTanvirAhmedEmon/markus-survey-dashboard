import { Table } from 'antd'
import React, { useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useDeletCompanyPermanentlyMutation, useGetTrashCompanyQuery, useResotreCompanyMutation,  } from '../../redux/features/company/company'
import { MdOutlineDelete } from 'react-icons/md'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { TbRestore } from 'react-icons/tb'

const Trash = () => {
    const [id, setCompanyId] = useState()
    const [page, setPage] = useState(10);
    const { data: getTrashCompany, refetch } = useGetTrashCompanyQuery({ page });
    const [deleteCompanyPermanently] = useDeletCompanyPermanentlyMutation()
    // const { data: restoreCompany } = useResotreCompanyQuery(id)
    const [restoreCompany] = useResotreCompanyMutation()

    const formattedTableData = getTrashCompany?.data?.map((company, i) => ({
        id: company?.id,
        key: i + 1,
        name: company?.name,
        email: company?.email
    }))
    // console.log(formattedTableData);

    const columns = [
        {
            title: "SL No.",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Company Name",
            dataIndex: "name",
            key: "name ",
        },

        {
            title: "Company Email",
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
                        <TbRestore onClick={() => {
                            // setCompanyId(record?.id)
                            // toast.success('Restore user Successfully!')
                            // refetch()
                            restoreCompany(record?.id).unwrap().then((res) => toast.success(res.message)).catch((err) => toast.error(err.message))

                        }
                        } className='text-yellow-500 cursor-pointer' />
                        <MdOutlineDelete onClick={() => {
                            Swal.fire({
                                title: "Are you sure delete permanently?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#1E3042",
                                confirmButtonText: "delete",
                                cancelButtonText: "cancel",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    deleteCompanyPermanently(record.id).unwrap().then((res) => toast.success(res.message)).catch((err) => toast.error(err.message))
                                }
                            });

                        }} className="cursor-pointer text-red-600" />
                    </div>
                );
            },
        },
    ];
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
                <p className="text-xl">Company Trash</p>
            </div>


            <Table
                className="super-admin-pagination"
                dataSource={formattedTableData}
                columns={columns}
                pagination={{
                    pageSize: getTrashCompany?.per_page,
                    total: getTrashCompany?.total,
                    onChange: (page) => setPage(page),
                    showSizeChanger: false
                }}
            />

        </div>
    )
}

export default Trash