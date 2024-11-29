import { JOB_API_END_POINT } from "@/components/utils/constant";
import { setAllJobs, setLoading } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            dispatch(setLoading(true));
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
            
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                    
                }
            } catch (error) {
                console.log(error);

            } finally{
                dispatch(setLoading(false));
            }
        }
        fetchAllJobs()
    }, [dispatch, searchedQuery])
};

export default useGetAllJobs;