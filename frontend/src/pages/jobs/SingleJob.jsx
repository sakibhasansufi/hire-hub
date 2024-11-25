/* eslint-disable react/prop-types */
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SingleJob = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) =>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60))
    }
    return (
        <section className="shadow-lg w-full p-4 border border-[#EDEADE]  font-inter transition-transform duration-300 ease-in-out transform hover:scale-105 md:hover:scale-110 mb-0 md:mb-5 lg:mb-10">
            <div className="flex justify-between items-center">
                <h1>{daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}</h1>
                <Bookmark />
            </div>

            <div className="flex gap-4 mt-2 items-center">
                <Avatar>
                    <AvatarImage src={job?.company?.logo}>
                    </AvatarImage>
                </Avatar>
                <div>
                    <h2>{job?.company?.name}</h2>
                    <div className="mt-2">

                        <h2 className="text-sm text-[#FF6500] font-semibold border py-1 px-2 w-min min-w-fit rounded-full bg-gray-100">{job?.jobType}</h2>
                    </div>
                    
                </div>
            </div>

            <div className="mt-4">
                <h1 className="text-2xl font-semibold">{job?.title}</h1>
            </div>

            <div className="flex flex-col  gap-4  mt-4 ">
                <div className={'font-semibold flex'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    {job?.position}
                </div>
                <div className={' font-semibold flex'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                    {job?.salary} k
                </div>
                <div className={' font-semibold flex'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {job?.location}
                </div>
            </div>


            <div className="mt-4">
                <button onClick={()=>navigate(`/description/${job?._id}`)} className="border p-1 md:p-2 rounded-xl font-medium border-[#FF6500] hover:border-[#B7B7B7] text-[#FF6500] text-sm">Details</button>
                
            </div>

        </section>
    );
};

export default SingleJob;