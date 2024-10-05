import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bookmark } from "lucide-react";

const SingleJob = () => {
    return (
        <section className="shadow-lg p-4 border border-[#EDEADE] dark:border dark:border-[#3C3D37] font-inter transition-transform duration-300 ease-in-out transform   hover:scale-105 md:hover:scale-110 hover:cursor-pointer mb-10 mr-5">
            <div className="flex justify-between items-center">
                <h1>2 day</h1>
                <Bookmark />
            </div>

            <div className="flex gap-4 mt-2 items-center">
                <Avatar>
                    <AvatarImage src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'>
                    </AvatarImage>
                </Avatar>
                <div>
                    <h2>Name</h2>
                    
                </div>
            </div>

            <div className="mt-4">
                <h1 className="text-2xl font-semibold">Title</h1>
            </div>

            <div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste in ut neque molestiae doloremque deleniti sit ipsum repudiandae earum. Quos.
            </div>


            <div className="flex flex-col  gap-4  mt-4 ">
                <div className={'font-semibold flex'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    12 Position
                </div>
                <div className={' font-semibold flex'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                    30 k
                </div>
                <div className={' font-semibold flex'} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    Chittagong
                </div>
            </div>


            <div className="mt-4 flex gap-8 ">
                <button className="border p-2 rounded-xl font-medium border-[#FF6500] hover:border-[#B7B7B7] text-[#FF6500]">Details</button>
                <button className="border p-2 rounded-xl text-gray-900 border-[#B7B7B7] hover:border-[#FF6500] dark:text-white">Save for letter</button>
            </div>

        </section>
    );
};

export default SingleJob;