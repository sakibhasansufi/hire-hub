import { Helmet } from "react-helmet-async";
import FilterCard from "./FilterCard";
import SingleJob from "./SingleJob";

const jobsArray = [1,2,3,4,5,6,7]

const Jobs = () => {
    return (
        <section className="mt-10 font-inter">
            <Helmet>
                <title>Jobs</title>
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-5">
                    <div className="w-[20%]">
                        <FilterCard />
                    </div>
                    {
                        jobsArray.length <= 0 ? <div className="flex justify-around items-start md:items-center w-screen "><h1 className="">No job posted here</h1></div> :(
                            <div className="flex-1 h-[50vh] md:h-[70vh] lg:h-[88vh] overflow-y-auto pt-0 md:pt-4 lg:pt-7 pl-0 md:pl-2 lg:pl-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {
                                        jobsArray.map((job, index) => (
                                            <SingleJob key={index}  />
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