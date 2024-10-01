import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const Login = () => {
    const [seePassword, setSeePassword] = useState(false);
    const [input,setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInput({...input, [e.target.name] : e.target.value})
    }


    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(input);
    }
    return (
        <section className="min-h-screen flex items-center">
            <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
                <h1 className="text-3xl font-semibold tracking-tight">Log in</h1>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-2 text-sm">
                        <label htmlFor="username" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:border-[#FF6500] focus-visible:outline-none border-[#B7B7B7]"
                            placeholder="Enter your email"
                            name="email"
                            value={input.email}
                            type="email"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>
                    <div className="space-y-2 text-sm">
                        <label htmlFor="password" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Password
                        </label>
                        <div className="flex items-center">
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:border-[#FF6500] focus-visible:outline-none border-[#B7B7B7]"
                                placeholder="Enter password"
                                name="password"
                                value={input.password}
                                type={seePassword ? "text" : "password"}
                                onChange={changeEventHandler}
                                required
                            />
                            <span onClick={() => setSeePassword(!seePassword)} className="-ml-6">
                                {
                                    seePassword ? <BsEye className="text-xl"></BsEye> : <IoEyeOffOutline className="text-xl"></IoEyeOffOutline>
                                }
                            </span>
                        </div>


                    </div>


                    <div className='flex items-center justify-center border border-[#B7B7B7] h-10 rounded-md space-y-2  text-sm'>
                        <RadioGroup className="flex items-center gap-10 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    className="cursor-pointer"
                                    type="radio"
                                    name="role"
                                    onChange={changeEventHandler}
                                    value="job seeker"
                                    checked={input.role === "job seeker"}
                                />
                                <Label htmlFor="r1" className="text-zinc-700 dark:text-zinc-300 ">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    className="cursor-pointer"
                                    type="radio"
                                    name="role"
                                    onChange={changeEventHandler}
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                />
                                <Label htmlFor="r1" className="text-zinc-700 dark:text-zinc-300 ">Student</Label>
                            </div>

                        </RadioGroup>
                    </div>
                    <button type="submit" className="rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] w-full">Log in</button>
                </form>
                <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
                    Don&apos;t have an account?
                    <Link to='/signUp' className="font-semibold underline hover:text-[#FF6500]">
                        Sign Up
                    </Link>
                </p>
            </div>
        </section>

    );
};

export default Login;