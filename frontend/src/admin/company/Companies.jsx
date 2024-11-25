import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import useGetAllCompanies from "@/pages/hooks/useGetAllCompanies";

const Companies = () => {
    const navigate = useNavigate();
    useGetAllCompanies();
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSearchCompanyByText(searchQuery))
    },[dispatch, searchQuery]);
    return (
        <div className="max-w-7xl mx-auto my-5">
            <div className="flex items-center justify-between my-5 px-1 lg:px-0">
                <Input
                    className="w-fit"
                    placeholder='Search by name'
                    onChange={(e)=>setSearchQuery(e.target.value)}
                />
                <Button onClick={()=> navigate('/admin/companies/create')} className='bg-[#FF6500] hover:bg-[#B7B7B7] hover:text-black'>New company</Button>
            </div>
            
            <CompanyTable />

        </div>
    );
};

export default Companies;