import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
    "Front end Developer",
    "Backend Developer",
    "Internship",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "Human Resource",
    "Accountant",
    "Marketing Specialist",
    "UX/UI Designer",
    "Wordpress Developer",
    "Shopify expert"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div>
            <Carousel className="w-2/3 md:w-full max-w-min  md:max-w-md mx-auto my-20">
                <CarouselContent>
                {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="basis-3/4 md:basis-1/2 lg:basis-5/12">
                                <Button onClick={()=>searchJobHandler(cat)}  variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;