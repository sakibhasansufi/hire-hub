import { Badge } from "@/components/ui/badge";
import AppliedJobsTable from "./AppliedJobsTable";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";


const isResume = true;

interface User {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    profile?: {
        bio?: string;
        skills?: string[];
        resume?: string;
        resumeOriginalName?:string
    };
}

interface RootState {
    auth: {
        user: User | null;
    };
}

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store: RootState) => store.auth);
    return (
        <section>
            <div className="max-w-4xl mx-auto my-2 md:my-6 border border-[#EDEADE] dark:border-[#3C3D37] rounded-2xl p-4 md:p-6 lg:p-8">

                <div className="flex justify-between">
                    <div className="flex items-center gap-5">
                        <Avatar className="h-10 md:h-16 lg:h-24 w-10 md:w-16 lg:w-24">
                            <AvatarImage src='https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp' alt="profile" />
                        </Avatar>

                        <div>
                            <h1 className="font-medium text-xl">{user?.fullName}</h1>
                            <h1 className="hidden md:block">{user?.profile?.bio}</h1>
                        </div>


                    </div>
                    <Button onClick={() => setOpen(true)} variant='outline' className="dark:border-[#474746]"><Pen /></Button>
                </div>


                {/* for small device */}
                <h1 className="block md:hidden">{user?.profile?.bio}</h1>


                <div className="my-3">
                    <div className="flex items-center gap-4 mb-2">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Contact />
                        <span>0{user?.phoneNumber}</span>
                    </div>

                </div>



                <div>
                    <Label className="">Skills</Label>
                    <br />

                    {
                        user?.profile?.skills && user?.profile?.skills.length !== 0
                            ? user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className="mr-3 mt-3">
                                    {item}
                                </Badge>
                            ))
                            : <span>N/A</span>
                    }


                </div>


                {/* resume section */}
                <section className="my-3 w-full max-w-sm flex items-center">
                    <Label>Resume</Label>
                    {
                        isResume ? <a className="ml-3" target="_blank" href="https://chatgpt.com/" download><span className="text-blue-600 hover:underline text-sm cursor-pointer">{user?.profile?.resumeOriginalName}</span></a> : <span className="ml-3">N/A</span>
                    }
                </section>
            </div>

            <section className="max-w-4xl mx-auto  rounded-2xl">
                <h1 className="text-lg font-bold">Applied Jobs</h1>
                <AppliedJobsTable />
            </section>

            <UpdateProfileDialog open={open} setOpen={setOpen} />


        </section>
    );
};

export default Profile;