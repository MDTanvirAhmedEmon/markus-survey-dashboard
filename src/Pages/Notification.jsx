import { Modal } from 'antd';
import React, { useState } from 'react'

const data = [
    {
        key: "1",
        title: "Tushar ",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        item: "Banasree",
        status: false,
        price: "500",
        balance: "600",
        image: "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
    },
];
const Notification = () => {
    const [page, setPage] = useState( new URLSearchParams(window.location.search).get('page') || 1);
    const handlePageChange=(page)=>{
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    }
    const [openAddModel, setOpenAddModel] = useState(false);
    const [currentNotification, setCurrentNotification] = useState({})
    const handleReadAll = () => {

    }
    const handleRead = (id) => {

    }
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <h3 className="text-[#242424] text-2xl font-bold">Notifications</h3>
                <button onClick={handleReadAll} className="text-[#F27405] font-semibold border-2 border-[#F27405] px-6 py-2">
                    Read all
                </button>
            </div>
            <div className="flex justify-start items-start flex-col gap-2 py-8 px-3">
                {data.map((item) => (
                    <div
                        className={`flex justify-between items-center w-full ${item?.status ? "bg-[#FBFBFB]" : " bg-[#F8F1E6]"
                        } p-3 py-5 rounded-lg`}
                        key={item?.key}
                    >
                        <div>
                            <div className="flex justify-start items-center gap-8 mb-1 text-[#919191]">
                                <h3 className="text-[#555555] font-bold">{item?.title}</h3>
                                <p>{item?.date}</p>
                            </div>
                            <div className="flex justify-start items-center gap-2 text-[#919191]">
                                <h3>{item?.item}</h3>
                                <p>{item?.price}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setOpenAddModel(true);
                                handleRead(item?.id)
                                setCurrentNotification(item)
                            }}
                            className="text-[#F27405] font-medium text-lg"
                        >

                            View
                        </button>
                    </div>
                ))}
            </div>
            <Modal
                centered
                open={openAddModel}
                onCancel={() => setOpenAddModel(false)}
                width={600}
                footer={false}
            >
                <div className="p-5 min-h-96 relative">
                    <div>
                        <div className="flex justify-start items-center gap-8 mb-1 text-[#919191]">
                            <h3 className="text-[#555555] font-bold">{currentNotification?.title}</h3>
                            <p>{currentNotification?.date}</p>
                        </div>
                        <div className="flex justify-start items-center gap-2 text-[#919191] mt-3">
                            <h3>{currentNotification?.item}</h3>
                            <p>{currentNotification?.price}</p>
                        </div>
                    </div>
                    {/* <button className="bg-[#F27405] p-3 px-6 text-[#FEFEFE] absolute bottom-6 right-6">
            Visit page
          </button> */}
                </div>
            </Modal>
        </div>
    );
}

export default Notification
