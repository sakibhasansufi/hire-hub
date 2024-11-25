import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { RiMenu3Fill } from "react-icons/ri";
import FilterCard from "./FilterCard";
import SingleJob from "./SingleJob";
import { useSelector } from "react-redux";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { motion } from 'framer-motion';

const Jobs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 8;
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const { allJobs, searchedQuery } = useSelector((state) => state.job);
    const [filteredJobs, setFilteredJobs] = useState(allJobs);

    // Filter jobs based on the search query
    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter((job) =>
                ["title", "description", "location"].some((key) =>
                    job[key]?.toLowerCase().includes(searchedQuery.toLowerCase())
                )
            );
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    // Pagination logic
    const totalJobs = filteredJobs.length;
    const totalPages = Math.ceil(totalJobs / jobsPerPage);

    const startIndex = (currentPage - 1) * jobsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section className="mt-10 font-inter">
            <Helmet>
                <title>Jobs</title>
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="flex-none md:flex gap-5 relative">
                    {/* Sidebar for small devices */}
                    <div className="block md:hidden mt-10">
                        <div className="flex border border-black w-24 h-16 p-2">
                            <div
                                className={`fixed w-1/2 h-full py-1 px-2 overflow-y-auto top-0 left-0 z-50 shadow-xl bg-white dark:bg-black transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                                    }`}
                            >
                                <div className="p-3 flex justify-between items-center">
                                    <h2>Filter Jobs</h2>
                                    <button onClick={toggleSidebar}>
                                        <RxCross1 className="h-6 w-6 text-black dark:text-white" />
                                    </button>
                                </div>
                                <ul>
                                    <section>
                                        <div>
                                            <FilterCard />
                                        </div>
                                    </section>
                                </ul>
                            </div>
                            <div className="flex-1">
                                <button
                                    className="m-4 p-2 text-black dark:text-white rounded"
                                    onClick={toggleSidebar}
                                >
                                    <RiMenu3Fill />
                                </button>
                                <span className="absolute -ml-16 -mt-2 text-sm">Filter Jobs</span>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar for large devices */}
                    <div className="w-[18%] hidden md:block">
                        <FilterCard />
                    </div>

                    {/* Job list */}
                    {filteredJobs.length === 0 ? (
                        <div className="flex justify-around items-start md:items-center w-screen">
                            <h1>No job posted here</h1>
                        </div>
                    ) : (
                        <div className="flex-1 h-auto overflow-y-auto pt-0 md:pt-4 lg:pt-7 pl-0 md:pl-2 lg:pl-5 mt-4 md:mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-10">
                                {currentJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.4 }}
                                        key={job._id}>
                                        <SingleJob key={job?._id} job={job} />
                                    </motion.div>

                                ))}
                            </div>
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-5">
                                    <Pagination>
                                        <PaginationContent>
                                            {/* Previous button */}
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={() =>
                                                        currentPage > 1 && handlePageChange(currentPage - 1)
                                                    }
                                                    disabled={currentPage === 1}
                                                />
                                            </PaginationItem>
                                            {/* Page links */}
                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <PaginationItem key={i}>
                                                    <PaginationLink
                                                        href="#"
                                                        isActive={currentPage === i + 1}
                                                        onClick={() => handlePageChange(i + 1)}
                                                    >
                                                        {i + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}
                                            {/* Ellipsis */}
                                            {totalPages > 5 && currentPage < totalPages && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}
                                            {/* Next button */}
                                            <PaginationItem>
                                                <PaginationNext
                                                    href="#"
                                                    onClick={() =>
                                                        currentPage < totalPages &&
                                                        handlePageChange(currentPage + 1)
                                                    }
                                                    disabled={currentPage === totalPages}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Jobs;
