import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const appliedJobs = [1, 2, 3];
const AppliedJobsTable = () => {
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
                        appliedJobs.map((index) => (
                            <TableRow key={index} className={'hover:bg-gray-100 dark:hover:bg-[#3C3D37]'}>
                                <TableCell>07 March,2023</TableCell>
                                <TableCell>HR</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell className='text-right'><Badge className={'bg-black text-white hover:bg-black hover:text-white'}>Selected</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </section>
    );
};

export default AppliedJobsTable;