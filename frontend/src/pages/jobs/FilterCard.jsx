import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";


const filterTypeData = [
    {
        filterType: "Location",
        array: ["Dhanmondi,Dhaka", "Remote", "Mirpur,Dhaka", "Uttara,Dhaka", "Chattagram", "Sylhet", "Jessore", "Khulna", "Shahbagh,Dhaka"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Sales Representative", "Graphic Designer", "Digital Marketer", "Wordpress Developer", "Shopify Expert"]
    },
    {
        filterType: "Salary",
        array: ["10-20 k", "20-30 k", "30-40 k", "40-50 k", "50-70 k", "80-100 k", "1-1.5 lakh"]
    },
];

const FilterCard = () => {
    const [openFilters, setOpenFilters] = useState({
        Location: true,
        Industry: true,
        Salary: true,
    });

    const toggleFilter = (filterType) => {
        setOpenFilters(prevState => ({
            ...prevState,
            [filterType]: !prevState[filterType],
        }));
    };

    return (
        <div>
            <h1 className="hidden md:block">Filter Jobs</h1>
            <div className="border-b-2 border-[#B7B7B7] mt-2 hidden md:block" />
            <RadioGroup>
                {
                    filterTypeData.map((data, index) => (
                        <div key={index} className="mt-5">
                            {/* Filter header with toggle button */}
                            <div className="flex items-center justify-between bg-white dark:bg-black sticky top-0">
                                <h1>{data.filterType}</h1>
                                <button onClick={() => toggleFilter(data.filterType)}>
                                    {openFilters[data.filterType] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </button>
                            </div>
                            <div className="border-b border-gray-400 mt-2" />

                            {/* Filter content with height animation */}
                            <div
                                className={`transition-all duration-300 ${
                                    openFilters[data.filterType] ? 'max-h-[500px] md:max-h-40 lg:max-h-52' : 'max-h-0'
                                } overflow-hidden ${
                                    data.filterType === 'Location' || data.filterType === 'Industry' || data.filterType === 'Salary' ? 'md:overflow-y-auto' : ''
                                }`}
                            >
                                <div className="mt-4 ">
                                    {data.array.map((item, idx) => (
                                        <div key={idx} className="flex items-center space-x-2 my-2 pt-2">
                                            <input type="radio" value={item} />
                                            <Label>{item}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
};

export default FilterCard;