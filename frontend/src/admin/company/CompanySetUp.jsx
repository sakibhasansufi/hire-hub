import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY_API_END_POINT } from "@/components/utils/constant";
import useGetCompanyById from "@/pages/hooks/useGetCompanyById";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CompanySetUp = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null

    });

    const [loading, setLoading] = useState(false);

    const { singleCompany } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany])


    return (
        <div className="max-w-7xl mx-auto">
            <Helmet>
                <title>Company Setup</title>
            </Helmet>

            <div className="my-5">
                <form onSubmit={submitHandler}>
                    <div className="flex gap-10 items-center mb-5">
                        <Button variant='outline' onClick={() => navigate('/admin/companies/create')} className='flex items-center gap-2'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="text-2xl font-bold font-lato">Company Setup</h1>
                    </div>
                    <div className="grid grid-cols-2 max-w-4xl mx-auto mt-10">
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type='text'
                                name='name'
                                value={input.name}
                                onChange={changeEventHandler}
                                className='my-5 w-[80%]'
                                autoComplete="given-name"
                                placeholder='Google LLC'
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                                className='my-5 w-[80%]'
                                autoComplete="given-location"
                                placeholder='London,UK'
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type='text'
                                name='website'
                                value={input.website}
                                onChange={changeEventHandler}
                                className='my-5 w-[80%]'
                                autoComplete="given-website"
                                placeholder='www.google.com'
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type='file'
                                accept='image/*'
                                onChange={changeFileHandler}
                                className='my-5 w-[80%]'
                            />
                        </div>

                        <div className="flex flex-col">
                            <Label>Description</Label>
                            <textarea
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                                className='my-5 w-[80%] h-[100px] border p-1'
                            />
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {
                            loading ? <button
                                className="rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7]  hover:text-black">
                                <div className="flex justify-center items-center">
                                    <Loader2 className="mr-2 animate-spin h-3 w-3" /> <div>Updating.....</div></div>
                            </button> :
                                <button type="submit" className="rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] hover:text-black ">Update</button>
                        }
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CompanySetUp;