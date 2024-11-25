import { Badge } from "@/components/ui/badge";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/components/utils/constant";
import { setAllAppliedJobs } from "@/redux/jobSlice";

const isResume = true;

const Profile = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAppliedJobs = async () =>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAppliedJobs();
    },[dispatch])
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);
    return (
        <section>
            <div className="max-w-4xl mx-auto my-2 md:my-6 border border-[#EDEADE] rounded-2xl p-4 md:p-6 lg:p-8">

                <div className="flex justify-between">
                    <div className="flex items-center gap-5">
                        <Avatar className="h-10 md:h-16 lg:h-24 w-10 md:w-16 lg:w-24">
                            <AvatarImage src={user?.profile?.profilePhoto || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="profile" />
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
                        isResume ? (
                            <a
                                className="ml-3"
                                href={user?.profile?.resume} // Add the href attribute
                                target="_blank"
                                rel="noopener noreferrer" // It's a good practice to use this with target="_blank"
                                download={user?.profile?.resumeOriginalName}
                            >
                                <span className="text-blue-600 hover:underline text-sm cursor-pointer">
                                    {user?.profile?.resumeOriginalName}
                                </span>
                            </a>
                        ) : (
                            <span className="ml-3">N/A</span>
                        )
                    }
                </section>
            </div>


            <section className="max-w-4xl mx-auto  rounded-2xl">
                <div className="my-5">
                    <details >
                        <summary className="text-lg font-semibold text-[#FF6500]">Profile update guide line</summary>
                        <li className="font-medium">First update your resume. If you do not first update your resume first, the update will not work</li>
                        <li className="font-medium">Please provide unique email for update. If you do not want to update email, clear the email field.</li>
                    </details>
                </div>
                <h1 className="text-lg font-semibold my-5 ]">Applied Jobs</h1>
                <AppliedJobsTable />
            </section>

            <UpdateProfileDialog open={open} setOpen={setOpen} />


        </section>
    );
};

export default Profile;