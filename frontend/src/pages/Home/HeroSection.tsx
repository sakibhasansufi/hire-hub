import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";


const HeroSection = () => {
    return (
        <div className="text-center mt-10 px-4 md:px-0 font-inter">
            <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#FF6500] font-medium dark:bg-[#222831]'>Get your Job from hire hub</span>
            <h1 className='text-2xl md:text-5xl font-bold mt-10'>Search, Apply & <br /> Get Your <span className='text-[#FF6500]'>Dream Jobs</span></h1>

            <div className='mt-10 flex w-full md:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full dark:text-white dark:bg-black'

                    />
                    <Button  className="rounded-r-full bg-[#FF6500]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>

        </div>
    );
};

export default HeroSection;