import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/components/utils/constant';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const logOutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/login');
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <section className="shadow-md dark:border-b dark:border-[#3C3D37]">
                <nav className="max-w-7xl mx-auto mt-2 py-4 px-4 md:px-0 ">
                    <div className="flex items-center justify-between">
                        <Link to="/"><h1 className="text-2xl font-bold text-[#FF6500]">Hire Hub</h1></Link>
                        {/* Links for larger screens */}
                        <div className="hidden md:flex gap-8 items-center">
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <NavLink to='/admin/companies' className={({ isActive }) =>
                                            isActive
                                                ? "font-bold pb-5 mb-[-26px] border-b-4 border-[#FF6500]"
                                                : "font-bold text-slate-500 hover:text-black dark:hover:text-white hover:pb-5 hover:mb-[-26px] hover:border-b-4 hover:border-[#B7B7B7]"
                                        }>Companies</NavLink>
                                        <NavLink to='/admin/jobs' className={({ isActive }) =>
                                            isActive
                                                ? "font-bold pb-5 mb-[-26px] border-b-4 border-[#FF6500]"
                                                : "font-bold text-slate-500 hover:text-black dark:hover:text-white hover:pb-5 hover:mb-[-26px] hover:border-b-4 hover:border-[#B7B7B7]"
                                        }>Jobs</NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to='/' className={({ isActive }) =>
                                            isActive
                                                ? "font-bold pb-5 mb-[-26px] border-b-4 border-[#FF6500]"
                                                : "font-bold text-slate-500 hover:text-black dark:hover:text-white hover:pb-5 hover:mb-[-26px] hover:border-b-4 hover:border-[#B7B7B7]"
                                        }>Home</NavLink>
                                        <NavLink to='/jobs' className={({ isActive }) =>
                                            isActive
                                                ? "font-bold pb-5 mb-[-26px] border-b-4 border-[#FF6500]"
                                                : "font-bold text-slate-500 hover:text-black dark:hover:text-white hover:pb-5 hover:mb-[-26px] hover:border-b-4 hover:border-[#B7B7B7]"
                                        }>Jobs</NavLink>
                                    </>
                                )
                            }

                        </div>

                        {/* Profile picture & Hamburger menu for mobile */}
                        <div className="md:hidden flex items-center gap-4">
                            {!isMobileMenuOpen && user && (
                                <Popover>
                                    <PopoverTrigger>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-fit">
                                        <div className='flex items-center gap-4'>
                                            <Avatar>
                                                <AvatarImage src={user?.profile?.profilePhoto || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h2 className='font-medium'>{user?.fullName}</h2>
                                                <h2 className='text-gray-400'>{user?.email}</h2>
                                            </div>
                                        </div>
                                        {
                                            user && user.role === 'job seeker' && (
                                                <div className='mt-3 flex items-center gap-1'>
                                                    <User2 />
                                                    <Button variant='link'><Link to='/profile'>View Profile</Link></Button>
                                                </div>
                                            )
                                        }

                                        <div className='flex items-center gap-1'>
                                            <LogOut className='text-red-500' />
                                            <Button onClick={logOutHandler} variant='link'>Logout</Button>
                                        </div>
                                    </PopoverContent>

                                </Popover>
                            )}

                            {/* Hamburger Menu */}
                            <button onClick={toggleMobileMenu} className="focus:outline-none">
                                {isMobileMenuOpen ? (
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                )}
                            </button>


                        </div>

                        {/* Links & buttons for larger screens */}
                        <div className="hidden md:flex items-center gap-4">
                            {!user && (
                                <div>
                                    <Link to='/signUp'><Button className="bg-[#FF6500] hover:bg-[#B7B7B7] hover:text-black">Sign Up</Button></Link>
                                    <Link to='/login'><Button variant='outline' className="ml-2 border border-[#FF6500]">Sign In</Button></Link>
                                </div>
                            )}

                            {user && (
                                <Popover>
                                    <PopoverTrigger>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className='flex items-center gap-4'>
                                            <Avatar>
                                                <AvatarImage src={user?.profile?.profilePhoto || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h2 className='font-medium'>{user?.fullName}</h2>
                                                <h2 className='text-gray-400'>{user?.email}</h2>
                                            </div>
                                        </div>
                                        {
                                            user && user.role === 'job seeker' && (
                                                <div className='mt-3 flex items-center gap-1'>
                                                    <User2 />
                                                    <Button variant='link'><Link to='/profile'>View Profile</Link></Button>
                                                </div>
                                            )
                                        }

                                        <div className='flex items-center gap-1'>
                                            <LogOut className='text-red-500' />
                                            <Button onClick={logOutHandler} variant='link'>Logout</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}


                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-4">
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <div className='flex flex-col gap-4'>
                                            <NavLink to='/admin/companies' onClick={toggleMobileMenu} className={({ isActive }) =>
                                                isActive
                                                    ? "font-bold text-[#FF6500]"
                                                    : "font-bold text-slate-500"
                                            }>Companies</NavLink>
                                            <NavLink to='/admin/jobs' onClick={toggleMobileMenu} className={({ isActive }) =>
                                                isActive
                                                    ? "font-bold text-[#FF6500]"
                                                    : "font-bold text-slate-500"
                                            }>Jobs</NavLink>
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-4">
                                            <NavLink to='/' onClick={toggleMobileMenu} className={({ isActive }) =>
                                                isActive
                                                    ? "font-bold text-[#FF6500]"
                                                    : "font-bold text-slate-500"
                                            }>Home</NavLink>
                                            <NavLink to='/jobs' onClick={toggleMobileMenu} className={({ isActive }) =>
                                                isActive
                                                    ? "font-bold text-[#FF6500]"
                                                    : "font-bold text-slate-500"
                                            }>Jobs</NavLink>

                                            <div>
                                                {!user && (
                                                    <div className="flex flex-col gap-2">
                                                        <Link to='/signUp'>
                                                            <Button className="bg-[#FF6500] hover:bg-[#B7B7B7]">Sign Up</Button>
                                                        </Link>
                                                        <Link to='/login'>
                                                            <Button variant='outline' className="border border-[#FF6500]">Sign In</Button>
                                                        </Link>

                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    )}
                </nav>
            </section>
        </div>
    );
};

export default Navbar;
