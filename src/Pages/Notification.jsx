
import React, { useEffect, useState } from 'react'
import { useGetAllNotificationQuery, useReadNotificationQuery } from '../redux/features/notification/notificationApi';
import { format } from 'date-fns';
import { ConfigProvider, message, Pagination, Spin } from 'antd';


const Notification = () => {

    // const [currentPage, setCurrentPage] = useState(1);
    // const pageSize = 10;


    // get all notification
    const { data: notification } = useGetAllNotificationQuery();
    console.log("notification", notification?.notifications)


    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    // };
    // read notification
    const [selectedNotificationId, setSelectedNotificationId] = useState(null);
    const { isLoading: isReadLoading, isSuccess } = useReadNotificationQuery(selectedNotificationId, {
        skip: !selectedNotificationId, // Skip the query until a notification is selected
    });

    // Display success message when a notification is read

    useEffect(() => {
        if (isSuccess) {
            if (isSuccess) {
                message.success('Notification Read Successfully');
            }
        }
    }, [isSuccess]);


    // Handle the "Read" button click
    const handleRead = (id) => {
        setSelectedNotificationId(id);
    };



    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <h3 className="text-[#242424] text-2xl font-bold ml-4">Notifications</h3>

            </div>
            <div className="flex justify-start items-start flex-col gap-2 py-8 px-3">
                {notification?.notifications?.map((item) => (
                    <div
                        className={`flex justify-between items-center w-full ${item?.read_at ? "bg-[#dadada]" : " bg-[#ffffff]"
                            } p-3 py-5 rounded-lg`}
                        key={item?.id}
                    >
                        <div>
                            <div className="flex justify-start items-center gap-8 mb-1 text-[#919191]">
                                <h3 className="text-[#555555] font-bold">{item?.data?.name ? item?.data?.name : "Employee"}</h3>
                                <p>{item?.data?.message}</p>
                            </div>
                            <div className="flex justify-start items-center gap-2 text-[#919191]">
                                <p>{format(new Date(item?.data?.time), 'MMMM do yyyy, h:mm:ss a')}</p>
                                <p>{item?.price}</p>
                            </div>
                        </div>
                        {
                            item?.read_at ? (
                                <></>
                            ) : (
                                <button
                                    isLoading
                                    onClick={() => handleRead(item?.id)}
                                    className="text-[#F27405] font-medium text-lg"
                                >
                                    Read
                                </button>
                            )
                        }

                    </div>
                ))}
            </div>
            {/* <div className="py-6">
                <Pagination
                    className="custom-pagination-all"
                    current={currentPage}
                    pageSize={pageSize}
                    total={50}
                    onChange={handlePageChange}
                />
            </div> */}
        </div>
    );
}

export default Notification
