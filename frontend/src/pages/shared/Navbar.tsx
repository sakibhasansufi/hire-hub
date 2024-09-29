import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const user = true; // Assuming user is logged in for testing purposes

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div>
            <section className="shadow-md">
                <nav className="max-w-7xl mx-auto mt-2 py-4 px-4 md:px-0">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-[#FF6500]">Hire Hub</h1>
                        
                        {/* Links for larger screens */}
                        <div className="hidden md:flex gap-8 items-center">
                            <NavLink to='/' className={({ isActive }) =>
                                isActive
                                    ? "font-bold border-b-4 border-[#FF6500]"
                                    : "font-bold text-slate-500"
                            }>Home</NavLink>
                            <NavLink to='/browse' className={({ isActive }) =>
                                isActive
                                    ? "font-bold border-b-4 border-[#FF6500]"
                                    : "font-bold text-slate-500"
                            }>Browse</NavLink>
                            <NavLink to='/jobs' className={({ isActive }) =>
                                isActive
                                    ? "font-bold border-b-4 border-[#FF6500]"
                                    : "font-bold text-slate-500"
                            }>Jobs</NavLink>
                        </div>

                        {/* Profile picture & Hamburger menu for mobile */}
                        <div className="md:hidden flex items-center gap-4">
                            {!isMobileMenuOpen && user && (
                                <img src="https://via.placeholder.com/30" alt="User" className="w-8 h-8 rounded-full" />
                            )} {/* Placeholder picture */}
                            
                            <button onClick={toggleMobileMenu} className="focus:outline-none">
                                {isMobileMenuOpen ? (
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path> {/* X icon */}
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> {/* Hamburger icon */}
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Links & buttons for larger screens */}
                        <div className="hidden md:flex items-center">
                            {!user && (
                                <div>
                                    <Button className="bg-[#FF6500] hover:bg-[#B7B7B7]">Sign Up</Button>
                                    <Button variant='outline' className="ml-2 border border-[#FF6500]">Sign In</Button>
                                </div>
                            )}
                            {user && <img src="https://via.placeholder.com/40" alt="User" className="ml-8 w-10 h-10 rounded-full" />}
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-4">
                            <div className="flex flex-col gap-4">
                                <NavLink to='/' onClick={toggleMobileMenu} className={({ isActive }) =>
                                    isActive
                                        ? "font-bold text-[#FF6500]"
                                        : "font-bold text-slate-500"
                                }>Home</NavLink>
                                <NavLink to='/browse' onClick={toggleMobileMenu} className={({ isActive }) =>
                                    isActive
                                        ? "font-bold text-[#FF6500]"
                                        : "font-bold text-slate-500"
                                }>Browse</NavLink>
                                <NavLink to='/jobs' onClick={toggleMobileMenu} className={({ isActive }) =>
                                    isActive
                                        ? "font-bold text-[#FF6500]"
                                        : "font-bold text-slate-500"
                                }>Jobs</NavLink>

                                <div>
                                    {!user && (
                                        <div className="flex flex-col gap-2">
                                            <Button className="bg-[#FF6500] hover:bg-[#B7B7B7]">Sign Up</Button>
                                            <Button variant='outline' className="border border-[#FF6500]">Sign In</Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            </section>
        </div>
    );
};

export default Navbar;
