import { useState, useEffect } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/components/utils/constant";
import { Badge } from "@/components/ui/badge";

const shortlistingStatus = ["👍Accepted", "💔Rejected"];
const ITEMS_PER_PAGE = 10;

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [localApplicants, setLocalApplicants] = useState(applicants?.applications || []); // Maintain local state

    // Sync local state with Redux store
    useEffect(() => {
        setLocalApplicants(applicants?.applications || []);
    }, [applicants]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };

    const filteredApplicants = localApplicants.filter((item) =>
        item?.applicant?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.applicant?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalItems = filteredApplicants?.length || 0;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredApplicants?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);

                // Update the local state instantly
                setLocalApplicants((prev) =>
                    prev.map((applicant) =>
                        applicant._id === id ? { ...applicant, status } : applicant
                    )
                );
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating status");
        }
    };

    return (
        <section>
            <div>
                <h2 className="text-2xl font-lato font-semibold">
                    Job name :<span className="font-medium text-lg"> {applicants?.title}</span>
                </h2>
                {/* Search Input */}
                <div className="my-4">
                    <Input
                        type="text"
                        placeholder="Search by name, email"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page on search
                        }}
                        className="w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <Table>
                    <TableCaption>A list of recent applied applicants</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead >Action</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item?.applicant?.fullName}</TableCell>
                                    <TableCell>{item?.applicant?.email}</TableCell>
                                    <TableCell>0{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell>
                                        {item.applicant?.profile?.resume ? (
                                            <a
                                                className="text-blue-600 cursor-pointer"
                                                href={item?.applicant?.profile?.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName}
                                            </a>
                                        ) : (
                                            <span>NA</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{formatDate(item.applicant.createdAt)}</TableCell>
                                    <TableCell>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto">
                                                {shortlistingStatus.map((status, index) => (
                                                    <div
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        key={index}
                                                        className="flex w-fit items-center my-2 cursor-pointer"
                                                    >
                                                        <Badge>{status}</Badge>
                                                    </div>
                                                ))}
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                    <TableCell>{item?.status || "Pending"}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-2xl font-bold">
                                    No applicants found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="mt-4 flex justify-center cursor-pointer">
                    {totalPages > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                    />
                                </PaginationItem>

                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href="#"
                                            isActive={currentPage === index + 1}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ApplicantsTable;
