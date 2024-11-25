import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useGetAllAdminJobs from "@/pages/hooks/useGetAllAdminJobs";
import AdminJobsTable from "./AdminJobsTable";
import { setSearchJobByText } from "@/redux/jobSlice";


const AdminJobs = () => {
    const navigate = useNavigate();
    useGetAllAdminJobs();
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchJobByText(searchQuery))
    }, [dispatch, searchQuery]);
    return (
        <div className="max-w-7xl mx-auto my-5">
            <div className="flex items-center justify-between my-5 px-1 lg:px-0">
                <Input
                    className="w-fit"
                    placeholder='Search by name or role'
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={() => navigate('/admin/jobs/create')} className='bg-[#FF6500] hover:bg-[#B7B7B7] hover:text-black'>Post a job</Button>
            </div>

            <AdminJobsTable />

        </div>
    );
};

export default AdminJobs;