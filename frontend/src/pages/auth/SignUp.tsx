import { Link } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { useState } from "react";


const SignUp = () => {
    const [seePassword, setSeePassword] = useState(false);
    
    return (
        <section className="min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
            <h1 className="text-3xl font-semibold tracking-tight">Sign Up</h1>

            <form action="#" className="space-y-6">
            <div className="space-y-2 text-sm">
                        <label htmlFor="username" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Full Name
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:border-[#FF6500] focus-visible:outline-none border-[#B7B7B7]"
                            placeholder="Enter your full name"
                            name="fullName"
                            type="text"
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
                        type="email"
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
                        type="text"
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
                                type={seePassword ? "text" : "password"}
                                required
                            />
                            <span onClick={() => setSeePassword(!seePassword)} className="-ml-6">
                                {
                                    seePassword ? <BsEye className="text-xl"></BsEye> : <IoEyeOffOutline className="text-xl"></IoEyeOffOutline>
                                }
                            </span>
                        </div>
                    
                </div>
                <button className="rounded-md bg-[#FF6500] px-4 py-2 text-white transition-colors hover:bg-[#B7B7B7] dark:bg-sky-700">Sign Up</button>
            </form>
            <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
                Don&apos;t have an account?
                <Link to='/login' className="font-semibold underline ">
                    Log in
                </Link>
            </p>
        </div>
    </section>
    );
};

export default SignUp;