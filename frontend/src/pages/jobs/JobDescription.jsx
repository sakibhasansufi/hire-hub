import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/components/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
const JobDescription = () => {
    const params = useParams();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const jobId = params.id;
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);


    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                // update the applicants number
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchSingleJob()
    }, [dispatch, jobId, user?._id]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };


    return (
        <section className="max-w-7xl mx-auto my-10 font-inter ">
            <div className="max-w-md mx-auto px-5 md:px-0 ">
                <div className="flex gap-4 items-center my-5">
                    <Avatar>
                        <AvatarImage src={singleJob?.company?.logo}></AvatarImage>
                    </Avatar>
                    <h1 className="font-semibold text-xl text-[#FF6500]">{singleJob?.company?.name}</h1>
                </div>
                <h1 className="font-bold text-2xl">{singleJob?.title}</h1>
                <div className="flex flex-col md:flex-row  gap-3 md:gap-10 items-start md:items-center  mt-5 ">
                    <div className={'font-semibold flex'} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <p>{singleJob?.position}</p>
                    </div>
                    <div className={' font-semibold flex'} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        </svg>
                        {singleJob?.salary}
                    </div>
                    <div className={' font-semibold flex'} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        {singleJob?.location}
                    </div>
                </div>
                <div className="w-full md:w-[500px] mt-5">
                    <h2 className="font-bold tex-2xl mb-3 border-b-2 border-b-[#B7B7B7] dark:border-b-slate-700 pb-2">Job Description</h2>

                    <h3 className="font-semibold my-2">Job Details</h3>
                    <p className="leading-relaxed text-justify my-2">{singleJob?.description}</p>
                    <h3 className="font-semibold my-2">Job Responsibility</h3>
                    <p className="leading-tight text-justify my-2">
                        <div className="mt-2">
                            {singleJob?.responsibility.map((item, index) => (
                                <div key={index} className="mb-2">
                                    <li>{item}</li>
                                </div>
                            ))}
                        </div>
                    </p>
                    <p className="leading-relaxed text-justify my-2"><span className="font-semibold my-2">Requirements : </span><div>{
                        singleJob?.requirements.map((item, index) => (
                            <Badge key={index} className={`mr-3`}>{item}</Badge>
                        ))}</div></p>

                    <h3 className="my-2"><span className="font-semibold">Experience Level :</span> {singleJob?.experienceLevel}</h3>

                    <h3 ><span className="font-semibold my-2">Job Type :</span> <span className="text-[#FF6500]">{singleJob?.jobType}</span> </h3>

                    <h3 ><span className="font-semibold my-2">Workplace type</span> <span className="text-[#FF6500]">{singleJob?.workPlaceType}</span> </h3>

                    <h3 className="my-2"> <span className="text-[#FF6500]">{singleJob?.applications?.length}</span> <span className="font-semibold my-2"></span>Applicants applied</h3>

                    <h3 ><span className="font-semibold my-2">Education Level : </span>{singleJob?.education} </h3>

                    <h3 className="my-2"> <span className="font-semibold">Posted Date: </span>{formatDate(singleJob?.createdAt)}</h3>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`${isApplied ? "bg-[#B7B7B7] cursor-not-allowed text-black" : "bg-[#FF6500]"}  hover:bg-[#B7B7B7] hover:text-black mt-5`}>{
                        isApplied ? "Already Applied" : "Apply Now"
                    }</Button>
            </div>
        </section>
    );
};

export default JobDescription;