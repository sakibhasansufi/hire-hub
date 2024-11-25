import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";


const filterTypeData = [
    {
        filterType: "Location",
        array: ["Dhaka", "Chittagong", "Remote", "Khulna", "Sylhet", "Mymensingh", "Rajshahi"]
    },
    {
        filterType: "Role",
        array: ["Front end Developer", "Backend Developer", "FullStack Developer", "Sales Representative", "Graphic Designer", "Digital Marketer", "Wordpress Developer", "Shopify Expert",]
    },

];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [dispatch, selectedValue])
    const [openFilters, setOpenFilters] = useState({
        Location: true,
        Role: true,
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
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
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
                                className={`transition-all duration-300 ${openFilters[data.filterType] ? 'max-h-[500px]' : 'max-h-0'
                                    } overflow-hidden ${['Location', 'Role'].includes(data.filterType) ? 'overflow-y-auto' : ''
                                    }`}
                                style={{
                                    maxHeight: openFilters[data.filterType] ? '200px' : '0', 
                                }}
                            >
                                <div className="mt-4">
                                    {data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        return (
                                            <div key={idx} className="flex items-center space-x-2 my-2 pt-2">
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId}>{item}</Label>
                                            </div>
                                        );
                                    })}
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