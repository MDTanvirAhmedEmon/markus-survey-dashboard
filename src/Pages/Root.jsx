import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Shered/Sidebar'
import Header from '../Components/Shered/Header'

const Root = () => {
    return (
        <div className='between-start gap-0 bg-[#F2F2F2]'>
            <div className='w-[300px] bg-[var(--color-1)] overflow-y-scroll h-screen px-4'>
                <Sidebar />
            </div>
            <div className=' w-full h-screen overflow-y-scroll'>
                <Header />
                <div className='p-4 mt-6'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Root
