import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const category = [
    "Frontend Developer",
    "Backend Developer",
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
    return (
        <div>
            <Carousel className="w-2/3 md:w-full max-w-min  md:max-w-md mx-auto my-20">
                <CarouselContent>
                {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="basis-3/4 md:basis-1/2 lg:basis-5/12">
                                <Button  variant="outline" className="rounded-full">{cat}</Button>
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