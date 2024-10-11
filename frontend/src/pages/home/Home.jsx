import { Helmet } from "react-helmet-async";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "../latestjobs/LatestJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";


const Home = () => {
    useGetAllJobs()
    return (
        <div>
            <Helmet>
                <title>Hire Hub</title>
            </Helmet>
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
        </div>
    );
};

export default Home;