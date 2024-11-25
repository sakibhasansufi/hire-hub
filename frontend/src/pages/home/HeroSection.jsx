import { Button } from "@/components/ui/button";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div className="text-center my-12 px-4 md:px-0 font-inter">
            <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#FF6500] font-medium dark:bg-[#222831]'>Get your Job from hire hub</span>
            <h1 className='text-2xl md:text-5xl font-bold my-16'>Search, Apply & <br /> Get Your <span className='text-[#FF6500]'>Dream Jobs</span></h1>

            <div className='my-16 flex w-full md:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full dark:text-white dark:bg-black'
                        onChange={(e) => setQuery(e.target.value)}

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#FF6500] ">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>

        </div>
    );
};

export default HeroSection;