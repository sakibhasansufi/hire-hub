
import SingleJob from "../jobs/SingleJob";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Helmet } from "react-helmet-async";
import useGetAllJobs from "../hooks/useGetAllJobs";


const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[dispatch])
    return (
        <section className="max-w-7xl mx-auto my-10">
            <Helmet>
                <title>Searched Jobs</title>
            </Helmet>
            <h1 className="font-bold text-xl">Search results ({allJobs.length})</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                    {
                        allJobs.map((job) => {
                            return (
                                    <SingleJob key={job._id} job={job} />  
                            )
                        })
                    }
                </div>
        </section>
    );
};

export default Browse;