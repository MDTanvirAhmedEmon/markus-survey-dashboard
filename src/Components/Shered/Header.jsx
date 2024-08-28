import { Badge } from 'antd'
// import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {IoIosNotificationsOutline} from "react-icons/io";
import { useGetProfileQuery } from '../../redux/features/auth/authApi';
import { imageUrl } from '../../redux/api/baseApi';

const Header = () => {
    const navigate = useNavigate()
    const { data, isLoading, } = useGetProfileQuery() || {};

    return (
        <div className='w-full py-4 bg-[var(--color-7)] end-center  gap-4 pr-2 box-border'>
            <div onClick={()=>navigate('/notification')}>
            <Link to="/feedback" style={{boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.24)"}} className=' bg-[#F2F2F2] h-10 w-10 flex justify-center items-center rounded-full p-2'>
                <Badge  color="#C30303" count={1}>
                    <IoIosNotificationsOutline color="#6A6A6A" size={24} />
                </Badge>
            </Link>
            </div>
            <div style={{boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.24)"}} onClick={()=>navigate('/profile')} className='end-center py-2 gap-1 border-gray-400 p-[2px] px-4 rounded-md cursor-pointer'>
                <img className='h-10 w-10 rounded-full ' src={`${imageUrl}${data?.user?.image}`} alt="" />
                <p className='font-medium'>{data?.user?.name}</p>
            </div>
        </div>
    )
}

export default Header
