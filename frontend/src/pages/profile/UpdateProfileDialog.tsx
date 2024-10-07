import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UpdateProfileDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({ open, setOpen }) => {
    return (
        <div>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <h2>Update Profile</h2>
                        </DialogTitle>
                    </DialogHeader>
                    <form >
                        <div className="grid gap-4 py-4">
                            <Label htmlFor="name" className="">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                className="col-span-3"
                            />
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateProfileDialog;