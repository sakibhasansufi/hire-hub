import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";


const LatestJobCard = () => {
    return (
        <section className="shadow-lg p-4">
            <div className="flex justify-between items-center">
                <h1>2 day</h1>
                <Bookmark />
            </div>

            <div className="flex gap-2 mt-2">
                <Avatar>
                    <AvatarImage src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'>
                    </AvatarImage>
                </Avatar>
                <div>
                    <h2>Name</h2>
                    <h3>Location</h3>
                </div>
            </div>

            <div>
                <h1 className="text-2xl font-semibold">Title</h1>
            </div>

            <div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste in ut neque molestiae doloremque deleniti sit ipsum repudiandae earum. Quos.
            </div>


            <div className="flex gap-5 items-center mt-2">
                <Badge className={'text-blue-500 font-bold'} variant='outline'>12</Badge>
                <Badge className={'text-orange-500 font-bold'} variant='outline'>12</Badge>
                <Badge className={'text-green-500 font-bold'} variant='outline'>12</Badge>
            </div>


            <div className="mt-2 flex gap-8">
               <button className="border p-2 rounded-xl font-medium">Details</button>
               <button className="border p-2 rounded-xl text-gray-500">Save for letter</button>
            </div>

        </section>
    );
};

export default LatestJobCard;