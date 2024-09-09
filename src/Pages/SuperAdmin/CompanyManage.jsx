import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Spin,
  Table,
  Upload,
} from "antd";
import { FaPlus, FaUpload } from "react-icons/fa6";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { MakeFormData } from "../../utils/FormDataHooks";
import { useCreateCompanyMutation, useDeleteCompaniesMutation, useGetCompaniesQuery, useUpdateCompaniesMutation } from "../../redux/features/company/company";
import toast from "react-hot-toast";
import { imageUrl } from "../../redux/api/baseApi";
import Swal from "sweetalert2";
import { CiSearch } from "react-icons/ci";
import { CSVLink, CSVDownload } from "react-csv";
import { RxCross2 } from "react-icons/rx";

const SCompanyManage = () => {
  const [search, setSearch] = useState("")
  const [selectedRow, setSelectedRow] = useState(null);
  const [form] = Form.useForm();
  const [addForm, setAddForm] = useState(true)
  const [page, setPage] = useState(1);
  const [fileList, setFileList] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [createCompany, { isLoading, isError }] = useCreateCompanyMutation()
  const [updateCompany, { isLoading: updateLoading, isError: updateError }] = useUpdateCompaniesMutation()
  const [deleteCompany, { isLoading: deleteLoading, isError: deleteError }] = useDeleteCompaniesMutation()
  const { data, isLoading: isFetching } = useGetCompaniesQuery({ page, search })
  const [survey, setSurvey] = useState(false)
  const onFinish = (values) => {
    const { remember, email, ...data } = values
    if (!survey) {
      return toast.error('please select Unlock Tools ')
    }
    data.role_type = "COMPANY"
    data.password_confirmation = values.password
    const formData = MakeFormData(data);
    if (fileList[0]?.originFileObj) {
      formData.append('image', fileList[0]?.originFileObj)
    }
    if (addForm) {
      formData.append('email', email)
      createCompany(formData).unwrap().then((res) => {
        toast.success(res.message)
        form.resetFields()
        setOpenAddModal(false)
      }).catch((err) => {
        console.log(err)
        toast.error(err.message || 'Something went wrong')
      })
    } else {
      formData.append('_method', 'PUT')
      updateCompany({ data: formData, id: selectedRow?.id }).unwrap().then((res) => {
        toast.success(res.message)
        form.resetFields()
        setOpenAddModal(false)
      }).catch((err) => {
        toast.error(err.message || 'Something went wrong')
      })
    }

  };
  const dataStructure = data?.data?.map((item, index) => {
    return {
      key: index + 1,
      ...item
    }
  }) || []

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
      title: "Company Id",
      dataIndex: "company_id",
      key: "company_id  ",
    },
    {
      title: "Company Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "No of Projects",
      dataIndex: "project_count",
      key: "project_count  ",
    },
    {
      title: "No. of Surveys",
      dataIndex: "survey_count",
      key: "survey_count  ",
    },
    {
      title: "Actions",
      dataIndex: "key",
      key: "key",
      render: (_, record) => {
        return (

          <div className="start-center text-2xl gap-1 ">
            <MdEdit onClick={() => {
              setAddForm(false)
              setSelectedRow({
                ...record
              })
              setOpenAddModal(true)
            }} className="cursor-pointer" />
            <MdOutlineDelete onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#1E3042",
                confirmButtonText: "delete",
                cancelButtonText: "cancel",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteCompany(record.id).unwrap().then((res) => toast.success(res.message)).catch((err) => toast.error(err.message))
                }
              });

            }} className="cursor-pointer" />
          </div>
        );
      },
    },
  ];

  // Upload:
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  useEffect(() => {
    if (!selectedRow) return
    form.setFieldsValue(selectedRow)
  }, [selectedRow, form])
  return (
    <div className="bg-[var(--color-7)] rounded-md">
      {
        deleteLoading && <div className="flex justify-center items-center w-full h-screen absolute left-0 top-0"><Spin size="large" /></div>
      }
      <div className="between-center px-3 my-2 pt-5">
        <div className="start-center gap-2 mb-3 p-5">
          <Link
            to={-1}
            className="bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white"
          >
            <IoArrowBackSharp />
            back
          </Link>
          <p className="text-xl">Company Manage</p>
        </div>
        <div className="end-center gap-2">
          <Input style={{
            height: '39px'
          }} onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search..." suffix={<RxCross2 onClick={() => setSearch('')} className="text-2xl cursor-pointer" />} prefix={<CiSearch className="text-2xl" />} />
          <CSVLink data={dataStructure}>
            <button
              className="bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap"
            >
              <FaUpload />
              Export
            </button>
          </CSVLink>
          <button
            onClick={() => {
              setAddForm(true)
              setOpenAddModal(true)
              form.resetFields();  
              setSelectedRow(null)
            }}
            className="bg-[var(--color-2)] px-4 rounded-md start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap"
          >
            Add Company
            <FaPlus />
          </button>
        </div>
      </div>
      {
        isFetching ? <div className="flex justify-center items-center">
          <div className='h-[400px] flex items-center justify-center'>
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


        </div> : <Table className="super-admin-pagination" pagination={{
          pageSize: data?.per_page,
          total: data?.total,
          onChange: (page) => setPage(page),
          showSizeChanger: false
        }} dataSource={dataStructure} columns={columns} />
      }
      {/* modal: */}
      <Modal
        open={openAddModal}
        centered
        footer={false}
        onCancel={() => setOpenAddModal(false)}
      >
        <div>
          <p className="text-xl py-2 font-bold text-center my-10">
            {
              addForm ? "Add Company" : "Update Company"
            }

          </p>
          <div className="my-10 flex justify-center items-center gap-5  ">
            {
              selectedRow?.image && <div className="h-[130px] mr-3 border-r-2">
                <p className="font-semibold">Current Image</p>
                <img src={`${imageUrl}${selectedRow?.image}`} className="h-full w-full object-contain" alt="" />
              </div>
            }
            <div className="h-[130px]">
              <p className="font-semibold">select new image</p>
              <Upload
                name="avatar"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          </div>

          <ConfigProvider
            theme={{
              components: {
                Form: {
                  itemMarginBottom: 20,
                },
                Input: {
                  borderRadius: 0,
                },
              },
            }}
          >
            <Form
              name="basic"
              labelCol={{
                xs: 24,
                sm: 24,
                md: 24,
              }}
              wrapperCol={{
                xs: 24,
                sm: 24,
                md: 24,
              }}
              style={{
                maxWidth: "100%",
                width: "800px",
                margin: "0 auto",
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Company Name!",
                  },
                ]}
              >
                <Input className="p-2 rounded-md" placeholder="Company Name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input className="p-2 rounded-md" placeholder="email" />
              </Form.Item>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your company Address!",
                  },
                ]}
              >
                <Input className="p-2 rounded-md" placeholder="Company Address" />
              </Form.Item>
              <Form.Item
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                ]}
              >
                <Input className="p-2 rounded-md" placeholder="Phone Number" />
              </Form.Item>
              {
                addForm && <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input className="p-2 rounded-md" placeholder="password" />
                </Form.Item>

              }

              <Form.Item

                wrapperCol={{
                  span: 16,
                }}
              >
                <p className="my-2">Unlock Tools</p>
                <div onClick={() => setSurvey(!survey)} className="flex justify-start items-center cursor-pointer gap-2">
                  <span className={`w-4 h-4 border rounded-md border-blue-300 ${survey ? 'bg-blue-500' : ''}`}></span> <p>survey</p>
                </div>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 16,
                }}
                className="flex justify-center items-center"
              >
                <button disabled={isLoading} className="bg-[#ecb206] w-96 py-3 mt-5 mx-auto block rounded ">
                  {(isLoading || updateLoading) ? <Spin size="medium" /> : addForm ? "Add Company" : "Update Company"}
                </button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </Modal>
    </div>
  );
};

export default SCompanyManage;