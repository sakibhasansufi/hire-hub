import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { RiMenu3Fill } from "react-icons/ri";
import FilterCard from "./FilterCard";
import SingleJob from "./SingleJob";

const jobsArray = [1, 2, 3, 4, 5, 6, 7,8]

const Jobs = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <section className="mt-10 font-inter">
            <Helmet>
                <title>Jobs</title>
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="flex-none md:flex gap-5 relative">
                    {/* for small device */}
                    <div className="block md:hidden mt-10">
                        <div className="flex border border-black w-24 h-16 p-2">
                            {/* Sidebar */}
                            <div
                                className={`fixed w-1/2 h-full py-1 px-2 overflow-y-auto top-0 left-0 z-50 shadow-xl bg-white dark:bg-black transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                                    }`}
                            >
                                <div className="p-3   flex justify-between items-center">
                                    <h2 >Filter Jobs</h2>
                                    <button onClick={toggleSidebar}>
                                        <RxCross1 className="h-6 w-6  text-black dark:text-white" />
                                    </button>
                                </div>
                                <ul className="">
                                    <section >
                                        
                                        <div className=''>
                                            <section>
                                                <div>
                                                    <FilterCard />
                                                </div>
                                            </section>
                                        </div>
                                    </section>
                                </ul>
                            </div>

                            {/* Main content */}
                            <div className="flex-1">
                                <button
                                    className="m-4 p-2 text-black dark:text-white rounded "
                                    onClick={toggleSidebar}
                                >
                                    <RiMenu3Fill />
                                </button>
                                <span className="absolute -ml-16  -mt-2 text-sm">Filter Jobs</span>
                            </div>
                        </div>
                    </div>
                    {/* for large device */}
                    <div className="w-[18%] hidden md:block">
                        <FilterCard />
                    </div>
                    {
                        jobsArray.length <= 0 ? <div className="flex justify-around items-start md:items-center w-screen "><h1 className="">No job posted here</h1></div> : (
                            <div className="flex-1 h-[50vh] md:h-[570px] lg:h-[790px] overflow-y-auto pt-0 md:pt-4 lg:pt-7 pl-0 md:pl-2 lg:pl-5 mt-4 md:mt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0  md:gap-4">
                                    {
                                        jobsArray.map((index) => (
                                            <SingleJob key={index} />
                                        ))
                                    }
                                </div>

                            </div>
                        )
                    }
                </div>

            </div>

        </section>
    );
};

export default Jobs;