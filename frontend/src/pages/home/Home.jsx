import { Helmet } from "react-helmet-async";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "../latestjobs/LatestJobs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "../hooks/useGetAllJobs";


const Home = () => {
    useGetAllJobs();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    useEffect(()=>{
        if(user?.role ==='recruiter'){
            navigate('/admin/companies')
        }
    },[navigate, user?.role])

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