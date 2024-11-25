import { Link, useNavigate, } from "react-router-dom";
import axios from "axios";
import { IoEyeOffOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { useEffect, useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/components/utils/constant";
import { Helmet } from "react-helmet-async";


const SignUp = () => {
    const [seePassword, setSeePassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user,loading } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "",
        file: ""
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false))
        }
    };

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[navigate, user]);

    return (
        <section className="min-h-screen flex items-center font-lato">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
                <h1 className="text-3xl font-semibold tracking-tight">Sign Up</h1>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-2 text-sm">
                        <label htmlFor="username" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Full Name
                        </label>
                        <input
                            className="flex h-12 w-full rounded-md border px-3 py-2 text-lg focus:border-[#FF6500] focus-visible:outline-none border-[#B7B7B7] dark:text-white dark:bg-black"
                            placeholder="John Doe"
                            name="fullName"
                            value={input.fullName}
                            type="text"
                            onChange={changeEventHandler}
                            autoComplete="given-name"

                        />
                    </div>


                    <div className="space-y-2 text-sm">
                        <label htmlFor="username" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Email
                        </label>
                        <input
                            className="flex h-12 w-full rounded-md border px-3 py-2 text-lg focus:border-[#FF6500] focus-visible:outline-none border-[#B7B7B7] dark:text-white dark:bg-black "
                            placeholder="johndoe@gmail.com"
                            name="email"
                            value={input.email}
                            type="email"
                            onChange={changeEventHandler}
                            autoComplete="given-email"

                        />
                    </div>


                    <div className="space-y-2 text-sm">
                        <label htmlFor="password" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Password
                        </label>

                        <div className="flex items-center">
                            <input
                                className="flex h-12 w-full rounded-md border px-3 py-2 text-lg focus:border-[#FF6500] focus-visible:outline-none border-[#B7B7B7] dark:text-white dark:bg-black "
                                placeholder="Enter password"
                                name="password"
                                value={input.password}
                                type={seePassword ? "text" : "password"}
                                onChange={changeEventHandler}

                            />
                            <span onClick={() => setSeePassword(!seePassword)} className="-ml-6">
                                {
                                    seePassword ? <BsEye className="text-xl dark:text-white"></BsEye> : <IoEyeOffOutline className="text-xl dark:text-white"></IoEyeOffOutline>
                                }
                            </span>
                        </div>

                    </div>


                    <div className="space-y-2 text-sm">
                        <Label>Profile Photo</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                        />
                    </div>

                    <div className='flex items-center justify-center border border-[#B7B7B7] h-10 rounded-md space-y-2  text-sm'>
                        <RadioGroup className="flex items-center gap-10 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    className="cursor-pointer "
                                    type="radio"
                                    name="role"
                                    value="job seeker"
                                    checked={input.role === "job seeker"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1" className="text-zinc-700 dark:text-zinc-300 min-w-fit">Job Seeker</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    className="cursor-pointer"
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1" className="text-zinc-700 dark:text-zinc-300 ">Recruiter</Label>
                            </div>

                        </RadioGroup>
                    </div>
                    {
                        loading ? <button className="rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] w-full hover:text-black"><div className="flex justify-center items-center"><Loader2 className="mr-2 animate-spin h-3 w-3" /> <div>Have patience.....</div></div></button> : <button type="submit" className="rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] hover:text-black w-full">Sign up</button>
                    }
                </form>
                <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
                    Don&apos;t have an account?
                    <Link to='/login' className="font-semibold underline hover:text-[#FF6500]">
                        Log in
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default SignUp;