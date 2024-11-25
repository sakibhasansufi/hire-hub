import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
    const { allJobs } = useSelector((state) => state.job);
    return (
        <section className="my-10">
            <div className="max-w-7xl mx-auto ">
                <h1 className="text-2xl md:text-4xl text-center font-semibold"><span className="text-[#FF6500]">Latest & Top Job</span> Openings</h1>
                <section className="flex justify-center md:flex-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10 ">
                        {
                            allJobs.length <= 0 ? <div className="flex justify-center"> <h1><p>No job has been posted</p></h1> </div> : allJobs.slice(0, 12).map((job) => <LatestJobCard key={job._id} job={job} />)
                        }
                    </div>
                </section>

            </div>
        </section>
    );
};

export default LatestJobs;