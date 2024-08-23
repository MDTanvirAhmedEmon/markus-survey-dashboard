import React, { useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const DriverProfile = () => {
    const [tab, setTab] = useState('Personal Info')
    return (
        <div className='bg-[var(--color-7)] p-4 rounded-md'>
            <div className='start-center gap-2'>
                <Link to={-1} className='bg-[#86D957] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link> <p>New Driver Profile</p>
            </div>
            <div className='max-w-5xl mx-auto'>
                <div className='center-center gap-5 bg-[var(--color-5)] py-6 flex-col rounded-md'>
                    <img src="https://i.ibb.co/dDj53hZ/d511a649-8b3c-465e-8002-da07c5d024ca.webp" className='h-24 w-24 rounded-full' alt="" />
                    <p className='text-2xl'>Name: Omar Almutairi</p>
                </div>
                <div className='between-center gap-2 mt-5 font-semibold mb-10'>
                    <button onClick={() => setTab('Personal Info')} className={`${tab === 'Personal Info' ? "text-[var(--color-3)] underline" : ""}`}>Personal Info</button>
                    <button onClick={() => setTab('Truck Info')} className={`${tab === 'Truck Info' ? "text-[var(--color-3)] underline" : ""}`}>Truck Info</button>
                    <button onClick={() => setTab('Bank Info')} className={`${tab === 'Bank Info' ? "text-[var(--color-3)] underline" : ""}`}>Bank Info</button>
                </div>
                {
                    tab === 'Personal Info' && <div className='my-4'>
                        <p>Name</p>
                        <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>Omar Almutairi</p>
                        <p>Phone Number</p>
                        <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>01-12586-152</p>
                        <p>Email</p>
                        <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>omaralmutairi@gmail.com</p>
                    </div>
                }
                {
                    tab === 'Truck Info' && <div className='my-4 '>
                        <div className=' grid-3 gap-8'>
                            <div>
                                <p>Driving Licence Number</p>
                                <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>5472587 256236426 2546     </p>
                            </div>
                            <div>
                                <p>Driving Licence Expired Date</p>
                                <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>05/12/2030</p>
                            </div>
                            <div>
                                <p>Truck Size</p>
                                <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>19 Fit (Open)   </p>
                            </div>
                            <div>
                                <p>Driving Reg Number</p>
                                <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>5472587 256236426 2546        </p>
                            </div>
                            <div>
                                <p>Name</p>
                                <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>Omar Almutairi</p>
                            </div>
                            <div></div>
                            <div className=''>
                                <p>Image</p>
                                <div className='w-full h-[200px] bg-[#050A1E0F] mt-2'>
                                    <img className='w-full h-full object-contain' src="https://i.ibb.co/Hz6LKC9/images-16.jpg" alt="" />
                                </div>
                            </div>
                            <div className=''>
                                <p>Licence Image</p>
                                <div className='w-full h-[200px] bg-[#050A1E0F] mt-2'>
                                    <img className='w-full h-full object-contain' src="https://i.ibb.co/0DH6qyy/images-17.jpg" alt="" />
                                </div>
                            </div>
                            <div className=''>
                                <p>Licence Image</p>
                                <div className='w-full h-[200px] bg-[#050A1E0F] mt-2'>
                                    <img className='w-full h-full object-contain' src="https://i.ibb.co/9ygcjkp/51028-Cert-of-App-white135465829550be71f799cf8.gif" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    tab === 'Bank Info' && <div className='my-4 '>
                        <div className=' grid-3 gap-8'>
                            <div>
                                <p>Bank Account Number</p>
                                <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>2562564192365324  </p>
                            </div>
                            <div>
                                <p>Bank Name</p>
                                <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>Bank Name </p>
                            </div> 
                            <div>
                                <p>Routing Number</p>
                                <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>521468261872456 </p>
                            </div>
                            <div>
                                <p>Account Holder's Name</p>
                                <p className='w-full rounded-full bg-[#050A1E0F] p-3 mt-2'>Adnan</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default DriverProfile
