import { Link } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const SignUp = () => {
    const [seePassword, setSeePassword] = useState(false);
    
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "",
        file:""
    })

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInput({...input,[e.target.name]: e.target.value})
    }

    const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, file: e.target.files?.[0]?.name || "" });
    };


    const submitHandler = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(input)
    }

    return (
        <section className="min-h-screen flex items-center font-lato">
            <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
                <h1 className="text-3xl font-semibold tracking-tight">Sign Up</h1>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-2 text-sm">
                        <label htmlFor="username" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Full Name
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:border-[#FF6500] focus-visible:outline-none border-[#B7B7B7]"
                            placeholder="Enter your full name"
                            name="fullName"
                            value={input.fullName}
                            type="text"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>


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
                        <label htmlFor="username" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Phone Number
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:border-[#FF6500] focus-visible:outline-none border-[#B7B7B7]"
                            placeholder="Enter your phone number"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            type="text"
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
                                    value="job seeker"
                                    checked={input.role === "job seeker"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1" className="text-zinc-700 dark:text-zinc-300 ">Student</Label>
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
                                <Label htmlFor="r1" className="text-zinc-700 dark:text-zinc-300 ">Student</Label>
                            </div>

                        </RadioGroup>
                    </div>


                    <div>
                        <Label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300 " htmlFor="password_">
                            Profile
                        </Label>
                        <Input
                            className="mt-2 border-[#B7B7B7]"
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler} 
                        />
                    </div>
                    <button type="submit" className="rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] w-full">Sign Up</button>
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