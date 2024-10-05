import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const filterType = [
    {
        filterType: "Location",
        array: ["Dhanmondi,Dhaka", "Mirpur,Dhaka", "Uttara,Dhaka", "Chattagram","Sylhet"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Sales Representative", "Graphic Designer", "Digital Marketer", "Wordpress Developer", "Shopify Expert"]
    },
    {
        filterType: "Salary",
        array: ["10-20 k", "20-30 k", "30-40 k", "40-50 k", "50-70 k", "80-100 k", "1-1.5 lakh"]
    },
]

const FilterCard = () => {
    return (
        <div className="">
            Filter Jobs
            <div className="border-b-2 border-[#B7B7B7] mt-2" />
            <RadioGroup>
                {
                    filterType.map((data, index) => (
                        <div key={index} className="mt-5 h-56  overflow-y-auto">
                            <h1 className="sticky bg-orange-400 top-0">{data.filterType}</h1>
                            {
                                data.array.map((item, index) => {
                                    return (
                                        <div key={index} className="flex items-center space-x-3 my-4">
                                            <RadioGroupItem value={item}/>
                                            <Label>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
};

export default FilterCard;