import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOB_API_END_POINT } from "@/components/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const PostJobs = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        experienceLevel: "",
        location: "",
        jobType: "",
        position: "",
        companyId: "",
        education: "",
        responsibility: "",
        workPlaceType: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector((store) => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleJobTypeChange = (value) => {
        setInput({ ...input, jobType: value });
    };

    const handleWorkPlaceTypeChange = (value) => {
        setInput({ ...input, workPlaceType: value });
    };

    const handleCompanyChange = (value) => {
        const selectedCompany = companies.find((company)=> company?.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <section className="max-w-7xl mx-auto">
            <Helmet>
                <title>Post job</title>
            </Helmet>
            <div className="flex items-center justify-center my-5 min-h-screen p-5">
                <form onSubmit={submitHandler} className=" border p-5 md:p-8 lg:p-10 border-gray-200 shadow-lg rounded-md w-full md:w-auto">
                    <p className="text-center font-lato text-3xl font-bold text-[#FF6500]">Post a job here</p>
                    <div className="font-inter">
                        <div className="flex flex-col md:flex-row md:gap-20 lg:gap-52 items-center my-5">
                            <div className="space-y-2">
                                <Label>Job Title</Label>
                                <Input
                                    type='text'
                                    name='title'
                                    value={input.title}
                                    placeholder='Teacher'
                                    onChange={changeEventHandler}
                                    className='w-[250px]'
                                />
                            </div>

                            <div className="space-y-2 mt-5 md:mt-0">
                                <Label>Location</Label>
                                <Input
                                    type='text'
                                    name='location'
                                    value={input.location}
                                    placeholder='Shamoli,Dhaka'
                                    onChange={changeEventHandler}
                                    className='w-[250px]'
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center my-5">
                            <div className="space-y-2">
                                <Label>Salary</Label>
                                <Input
                                    type='number'
                                    name='salary'
                                    value={input.salary}
                                    placeholder='50000'
                                    onChange={changeEventHandler}
                                    className='w-[250px]'
                                />
                            </div>

                            <div className="space-y-2 mt-5 md:mt-0">
                                <Label>Experience</Label>
                                <Input
                                    type='text'
                                    name='experienceLevel'
                                    value={input.experienceLevel}
                                    placeholder='3 years of experience'
                                    onChange={changeEventHandler}
                                    className='w-[250px]'
                                />
                            </div>
                        </div>


                        <div className="flex flex-col md:flex-row justify-between items-center my-5">
                            <div className="space-y-2">
                                <Label>No. of position</Label>
                                <Input
                                    type='number'
                                    name='position'
                                    value={input.position}
                                    placeholder='5'
                                    onChange={changeEventHandler}
                                    className='w-[250px]'
                                />
                            </div>

                            <div className="space-y-2 mt-5 md:mt-0">
                                <Label>Education Level</Label>
                                <Input
                                    type='text'
                                    name='education'
                                    value={input.education}
                                    placeholder='SSC'
                                    onChange={changeEventHandler}
                                    className='w-[250px]'
                                />
                            </div>

                        </div>


                        <div className="flex flex-col md:flex-row justify-between items-center my-5">

                            <div className="space-y-2">
                                <Label>Job type</Label>
                                <Select onValueChange={handleJobTypeChange}>
                                    <SelectTrigger className="w-[250px]">
                                        <SelectValue placeholder="Job type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="fullTime">Full time</SelectItem>
                                            <SelectItem value="part-time">Part time</SelectItem>
                                            <SelectItem value="contractual">Contractual</SelectItem>
                                            <SelectItem value="internship">Internship</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 mt-5 md:mt-0">
                                <Label>Work place type</Label>
                                <Select onValueChange={handleWorkPlaceTypeChange}>
                                    <SelectTrigger className="w-[250px]">
                                        <SelectValue placeholder="Work place type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="on-site">On site</SelectItem>
                                            <SelectItem value="remote">Remote</SelectItem>
                                            <SelectItem value="hybrid">Hybrid</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>


                        <div className="my-5">
                            <div className="space-y-2">
                                <Label>Requirements</Label>
                                <Input
                                    type='text'
                                    name='requirements'
                                    value={input.requirements}
                                    placeholder='HTML, CSS, JavaScript, Python'
                                    onChange={changeEventHandler}
                                    className='rounded-md'
                                />
                            </div>

                        </div>

                        <div className="my-5">
                            <div className="space-y-2 flex flex-col">
                                <Label>Responsibility</Label>
                                <div className="mt-3"></div>
                                <textarea
                                    type='text'
                                    name='responsibility'
                                    value={input.responsibility}
                                    placeholder='Write your job responsibility here.'
                                    onChange={changeEventHandler}
                                    className='my-5  h-[100px] border p-1 rounded-md'

                                />
                            </div>
                        </div>

                        <div className="my-5">
                            <div className="space-y-2 flex flex-col">
                                <Label>Job description</Label>
                                <div className="mt-3"></div>
                                <textarea
                                    type='text'
                                    name='description'
                                    value={input.description}
                                    placeholder='write you job description here'
                                    onChange={changeEventHandler}
                                    className='my-5  h-[100px] border p-1 rounded-md'
                                />
                            </div>
                        </div>
                        {/* for selecting company */}
                        <div className="my-5">
                        <Label>Select your organization</Label>
                            {
                                companies.length > 0 && (
                                    <div className="mt-2">
                                        <Select onValueChange={handleCompanyChange}>
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Your organization" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        companies.map((company) => {
                                                            return (
                                                                <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                            )
                                                        })
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {
                        loading ? <button className="rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] w-full hover:text-black"><div className="flex justify-center items-center"><Loader2 className="mr-2 animate-spin h-3 w-3" /> <div>Have patience.....</div></div></button> : <button type="submit" className="rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] hover:text-black w-full">Post a new job</button>
                    }
                    {
                        companies.length === 0 && <div className="my-3 text-xs text-red-700 font-bold"><p>*Please register a company first, before posting a job.</p></div>
                    }
                </form>
            </div>
        </section>
    );
};

export default PostJobs;