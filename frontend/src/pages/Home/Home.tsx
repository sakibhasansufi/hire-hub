import { Helmet } from "react-helmet-async";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "../LatestJobs/Latestjobs";


const Home = () => {
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