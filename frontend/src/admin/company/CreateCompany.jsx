import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY_API_END_POINT } from "@/components/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="max-w-7xl mx-auto">
            <Helmet>
                <title>Create Company</title>
            </Helmet>
            <div className="max-w-4xl mx-auto font-inter">
                <h1 className="font-lato text-xl md:text-2xl  lg:text-3xl font-semibold lg:font-bold mb-5 md:mb-7 lg:mb-10">Your company name</h1>
                <Label >Company Name</Label>
                <Input
                    type='text'
                    className='my-2'
                    placeholder='Google LLC'
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                <div className="flex items-center gap-2 my-5 md:my-7 lg:my-10">
                    <Button onClick={registerNewCompany}>Continue</Button>
                    <Button onClick={() => navigate("/admin/companies")} variant='outline'>Cancel</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateCompany;