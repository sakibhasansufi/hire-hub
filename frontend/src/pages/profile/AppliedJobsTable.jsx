import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSelector } from "react-redux";


const AppliedJobsTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };
    return (
        <section>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className={'text-right'}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs && allAppliedJobs.length > 0 ? (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id} className={'hover:bg-gray-100 dark:hover:bg-[#3C3D37]'}>
                                    <TableCell>{formatDate(appliedJob?.createdAt)}</TableCell>
                                    <TableCell>{appliedJob?.job?.title}</TableCell>
                                    <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                                    <TableCell className='text-right'><Badge className={`${appliedJob?.status === "💔rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                                </TableRow>

                            ))
                        ) : (<TableRow>
                            <TableCell colSpan={4} className="text-center text-2xl font-bold">
                                You have not applied to any jobs
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </section>
    );
};

export default AppliedJobsTable;