import { Button } from "@/components/ui/button";


const JobDescription = () => {
    const isApplied = true;
    return (
        <section className="max-w-7xl mx-auto my-10 font-inter">
            <div className="max-w-md mx-auto px-5 md:px-0">
                <h1 className="font-bold text-2xl">Title</h1>
                <div className="flex flex-col md:flex-row  gap-3 md:gap-10 items-start md:items-center  mt-5 ">
                    <div className={'font-semibold flex'} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        12 Position
                    </div>
                    <div className={' font-semibold flex'} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        </svg>
                        30 k
                    </div>
                    <div className={' font-semibold flex'} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        Chittagong
                    </div>
                </div>
                <div className="w-full md:w-[500px] mt-5">
                    <h2 className="font-bold tex-2xl mb-3">Description</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, tenetur necessitatibus? Quam voluptatibus voluptatum adipisci explicabo illum minima recusandae quibusdam sint autem, ea, neque culpa, veniam excepturi delectus sequi quo corrupti illo voluptate repellendus. Natus nostrum error tenetur, totam voluptatem consequatur atque culpa! Eaque, voluptate.</p>
                </div>
                <Button className="bg-[#FF6500] hover:bg-[#B7B7B7] hover:text-black mt-5">{
                    isApplied ? "Already Applied" : "Apply Now"
                    }</Button>
            </div>


        </section>
    );
};

export default JobDescription;