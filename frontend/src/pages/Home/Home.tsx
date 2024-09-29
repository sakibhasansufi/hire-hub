import { Helmet } from "react-helmet-async";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Hire Hub</title>
            </Helmet>
            <HeroSection />
            <CategoryCarousel />
        </div>
    );
};

export default Home;