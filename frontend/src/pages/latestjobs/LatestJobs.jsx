import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LatestJobCard from "./LatestJobCard";
import Skeleton from "../home/Skeleton";

const LatestJobs = () => {
    const { allJobs, loading } = useSelector((state) => state.job);
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        if (!loading) {
            const timeout = setTimeout(() => {
                setShowSkeleton(false);
            }, 3000);
            return () => clearTimeout(timeout); 
        } else {
            setShowSkeleton(true); 
        }
    }, [loading]);

    return (
        <section className="my-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-4xl text-center font-semibold">
                    <span className="text-[#FF6500]">Latest & Top Job</span> Openings
                </h1>
                <section className="flex justify-center md:flex-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
                        {showSkeleton ? (
                            <Skeleton count={12} />
                        ) : allJobs.length <= 0 ? (
                            <div className="flex justify-center">
                                <h1>No job has been posted</h1>
                            </div>
                        ) : (
                            allJobs.slice(0, 12).map((job) => <LatestJobCard key={job._id} job={job} />)
                        )}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default LatestJobs;
