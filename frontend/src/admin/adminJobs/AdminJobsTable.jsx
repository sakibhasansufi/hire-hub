import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/components/utils/constant";
import Swal from "sweetalert2";
import { removeJob } from "@/redux/jobSlice";

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const navigate = useNavigate();
    const [filterJob, setFilterJob] = useState(allAdminJobs);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of companies per page

    useEffect(() => {
        const filteredJob =
            allAdminJobs.length >= 0 &&
            allAdminJobs.filter((job) => {
                if (!searchJobByText) {
                    return true;
                }
                return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());;
            });
        setFilterJob(filteredJob);
        setCurrentPage(1); // Reset to the first page when the filter changes
    }, [allAdminJobs, searchJobByText]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };

    const dispatch = useDispatch();


    const deleteJob = async (jobId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
            });


            if (result.isConfirmed) {
                const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    toast.success(res.data.message);
                    dispatch(removeJob(jobId));
                }
            }

        } catch (error) {
            console.error("Error deleting job", error);
            toast.error(error.response.data.message);
        }
    }

    // Pagination Logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAdminJobs = filterJob.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filterJob.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        currentAdminJobs && currentAdminJobs.length > 0 ? (
                            currentAdminJobs?.map((job) => (
                                <TableRow key={job._id}>
                                    <TableCell>{job?.company?.name}</TableCell>
                                    <TableCell>{job?.title}</TableCell>
                                    <TableCell>{formatDate(job.createdAt)}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto space-y-3">
                                                <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className="flex items-center gap-2 cursor-pointer">
                                                    <Edit2 />
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={() => deleteJob(job._id)} className="mt-2">
                                                    <div className="flex items-center gap-2 cursor-pointer">
                                                        <MdDeleteOutline className="text-red-500" />
                                                        <span className="text-red-500">Delete</span>
                                                    </div>
                                                </div>
                                                <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 cursor-pointer">
                                                    <Eye />
                                                    <span>Applicant</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>

                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-2xl font-bold">
                                    No jobs found.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
            <div className="mt-4">
                {filterJob.length > itemsPerPage && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index + 1}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            {totalPages > 5 && currentPage < totalPages - 1 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

export default AdminJobsTable;
