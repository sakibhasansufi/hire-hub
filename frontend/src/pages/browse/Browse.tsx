import SingleJob from "../jobs/SingleJob";

const randomJobs = [1, 2, 3];
const Browse = () => {
    return (
        <section className="max-w-7xl mx-auto my-10">
            <h1 className="font-bold text-xl">Search results ({randomJobs.length})</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                    {
                        randomJobs.map((index) => {
                            return (
                                    <SingleJob key={index} />  
                            )
                        })
                    }
                </div>
        </section>
    );
};

export default Browse;