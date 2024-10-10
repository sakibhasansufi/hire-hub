import { Helmet } from "react-helmet-async";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "../latestjobs/LatestJobs";


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