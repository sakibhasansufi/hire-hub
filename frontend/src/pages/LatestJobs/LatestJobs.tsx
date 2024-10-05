import LatestJobCard from "./LatestJobCard";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]
const LatestJobs = () => {
    return (
        <section className="">
            <div className="max-w-7xl mx-auto ">
                <h1 className="text-2xl md:text-4xl text-center font-semibold"><span className="text-[#FF6500]">Latest & Top Job</span> Openings</h1>
                <section className="flex justify-center md:flex-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
                        {
                            randomJobs.slice(0, 6).map((index) => <LatestJobCard key={index} />)
                        }
                    </div>
                </section>

            </div>
        </section>
    );
};

export default LatestJobs;