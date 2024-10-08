import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { IoEyeOffOutline, IoClose } from "react-icons/io5"; // Import close icon

interface UpdateProfileDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({ open, setOpen }) => {
    const [seePassword, setSeePassword] = useState(false);
    const [loading, setLoading] = useState(false);

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
                                    <IoClose className="absolute -mt-[18px] -ml-[10px] z-50"/>
                                </button>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <form>
                        <div className="space-y-5">
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="name" className="w-20">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="col-span-3  dark:border-[#3C3D37]"
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="email" className="w-20">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="col-span-3 dark:border-[#3C3D37]"
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="phone" className="w-20 leading-normal text-justify">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    className="col-span-3  dark:border-[#3C3D37]"
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="name" className="w-20 leading-normal text-justify">Current Password</Label>
                                <Input
                                    id="currentPassword"
                                    name="currentPassword"
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
                                <Label htmlFor="name" className="w-20 leading-normal text-justify">New Password</Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
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
                                    type="text"
                                    className="col-span-3  dark:border-[#3C3D37]"
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="name" className="w-20">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
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
                                    accept="application/pdf"
                                    className="col-span-3  dark:border-[#3C3D37]"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                        {
                                loading ? <Button className="my-4 rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] w-full hover:text-black"> <div className="flex justify-center items-center">
                                <Loader2 className="mr-2 animate-spin h-3 w-3" /> <div>Have patience.....</div></div></Button> : <Button type="submit" className="my-4 rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] w-full hover:text-black">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateProfileDialog;
