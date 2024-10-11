/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_API_END_POINT } from "@/components/utils/constant";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { IoEyeOffOutline, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";



const UpdateProfileDialog = ({ open, setOpen }) => {
    const [seePassword, setSeePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
     
    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        currentPassword: user?.currentPassword || "",
        newPassword: user?.newPassword || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullName', input.fullName);
        formData.append('email', input.email);
        formData.append('currentPassword', input.currentPassword);
        formData.append('newPassword', input.newPassword);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
    
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
    };
    

    return (
        <div>
            <Dialog open={open}>
                <DialogContent onInteractOutside={() => setOpen(false)} className={"h-1/2 lg:h-auto overflow-y-auto"}>
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex justify-between items-center">
                                <h2 className="text-[#FF6500]">Update Profile</h2>
                                {/* Custom "x" button to close the dialog */}
                                <button onClick={() => setOpen(false)} className="text-xl">
                                    <IoClose className="absolute -mt-[18px] -ml-[10px] z-50" />
                                </button>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="space-y-5">
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="fullName" className="w-20">Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    value={input.fullName}
                                    onChange={changeEventHandler}
                                    type="text"
                                    className="col-span-3  dark:border-[#3C3D37]"
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="email" className="w-20">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    type="email"
                                    className="col-span-3 dark:border-[#3C3D37]"
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="phoneNumber" className="w-20 leading-normal text-justify">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="01700000000"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    type="number"
                                    className="col-span-3  dark:border-[#3C3D37]"
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="name" className="w-20 leading-normal text-justify">Current Password</Label>
                                <Input
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={input.currentPassword}
                                    onChange={changeEventHandler}
                                    type="password"
                                    className="col-span-3 dark:border-[#3C3D37]"
                                />
                                
                            </div>
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="name" className="w-20 leading-normal text-justify">New Password</Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    value={input.newPassword}
                                    onChange={changeEventHandler}
                                    type={seePassword ? "text" : "password"}
                                    className="col-span-3 dark:border-[#3C3D37]"
                                />
                                <span onClick={() => setSeePassword(!seePassword)} className="-ml-7 p">
                                    {
                                        seePassword ? <BsEye className="text-xl dark:text-white pr-1" /> : <IoEyeOffOutline className="text-xl dark:text-white pr-1" />
                                    }
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="bio" className="w-20">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    placeholder="I am a web developer"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    type="text"
                                    className="col-span-3  dark:border-[#3C3D37]"
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="name" className="w-20">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    placeholder='html,css,JavaScript'
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    type="text"
                                    className="col-span-3  dark:border-[#3C3D37]"
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="file" className="w-20 leading-normal text-justify">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={fileChangeHandler}
                                    accept="application/pdf"
                                    className="col-span-3  dark:border-[#3C3D37]"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button
                                 className="my-4 rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] w-full hover:text-black">
                                 <div className="flex justify-center items-center">
                                 <Loader2 className="mr-2 animate-spin  w-3 text-2xl" />
                                 <div>Have patience.....</div></div></Button>
                                : <Button
                                 type="submit"
                                className="my-4 rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] w-full hover:text-black">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateProfileDialog;
