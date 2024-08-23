import { Form, Input, Select, Space } from 'antd'
import React from 'react'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const AddProject = () => {
    const onFinish = (value) => {
        console.log(value)
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className='questions'>
            <div className='between-center px-3 my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>
                    <Link to={-1} className='bg-[var(--color-2)] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link>
                    <p className='text-xl'>Company Manage</p>
                </div>

            </div>
            <Form className=''
                layout='vertical'
                onFinish={onFinish}
            >
                <div className='grid grid-cols-2 gap-4'>
                    <Form.Item
                        name={`projectName`}
                        label={`Project Name`}
                        rules={[
                            {
                                message: 'Project Name is required',
                                required: true
                            }
                        ]}
                    >
                        <Select className='w-full h-[42px]'
                            defaultValue="lucy"
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'Yiminghe',
                                    label: 'yiminghe',
                                },
                                {
                                    value: 'disabled',
                                    label: 'Disabled',
                                    disabled: true,
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name={`survey`}
                        label={`survey`}
                        rules={[
                            {
                                message: 'Survey Name is required',
                                required: true
                            }
                        ]}
                    >
                        <Select className='w-full h-[42px]'
                            defaultValue="lucy"
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'Yiminghe',
                                    label: 'yiminghe',
                                },
                                {
                                    value: 'disabled',
                                    label: 'Disabled',
                                    disabled: true,
                                },
                            ]}
                        />
                    </Form.Item>
                </div>
                <div className='w-full bg-white p-2 rounded-md '>
                    <div className='w-fit mx-auto'>
                        <p className='text-center py-4 pt-10 text-xl font-semibold uppercase'>Add questions </p>
                        <Form.List name="users">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => {
                                        return (
                                            <Space
                                                key={key}
                                                style={{
                                                    display: 'flex',
                                                    marginBottom: 8,
                                                }}
                                            // align="baseline"
                                            >
                                                <Form.Item
                                                    label={<p className='text-base font-medium'>{`Question no. ${key + 1}-(English)`}</p>}
                                                    {...restField}
                                                    name={[name, 'englishQuestions']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'please input question or delete this field',
                                                        },
                                                    ]}
                                                >
                                                    <Input style={{
                                                        width: '400px'
                                                    }} className='h-[42px]' placeholder="questions in english" />
                                                </Form.Item>
                                                <Form.Item
                                                    label={<p className='text-base font-medium'>{`Question no. ${key + 1}-(Germany)`}</p>}
                                                    {...restField}
                                                    name={[name, 'germanyQuestions']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'please input question or delete this field',
                                                        },
                                                    ]}
                                                >
                                                    <Input style={{
                                                        width: '400px'
                                                    }} className='h-[42px]' placeholder="questions in germany" />
                                                </Form.Item>
                                                <Form.Item
                                                    label={key <= 0 ? `Add comment ` : ' '}
                                                    {...restField}
                                                    name={[name, 'comment']}
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: 'Missing first name',
                                                        },
                                                    ]}
                                                >
                                                    <Select className='min-w-32 w-32 h-[42px]'
                                                        defaultValue="disable"
                                                        onChange={handleChange}
                                                        options={[
                                                            {
                                                                value: 'enable',
                                                                label: 'Enable',
                                                            },
                                                            {
                                                                value: 'disable',
                                                                label: 'Disable',
                                                            },

                                                        ]}
                                                    />
                                                </Form.Item>
                                                <CiCircleMinus className='cursor-pointer' onClick={() => remove(name)} />
                                            </Space>
                                        )
                                    })}
                                    <Form.Item>
                                        <button className='text-[#ECB206] text-5xl ml-auto' type="button" onClick={() => add()} icon={<FaPlus />}>
                                            <CiCirclePlus />
                                        </button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </div>
                </div>
                <div className='text-center'>
                    <button className=' px-10 py-2 bg-[var(--color-2)] text-white font-semibold rounded-md'>
                        save
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default AddProject
