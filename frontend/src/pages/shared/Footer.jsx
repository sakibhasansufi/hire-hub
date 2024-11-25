import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
    const { user } = useSelector((store) => store.auth);
    return (
        <footer className="flex flex-col justify-around gap-5  py-8  dark:text-white">
            <h5 className="text-2xl font-bold text-center text-[#FF6500]">Hire Hub</h5>
            <nav className="text-lg">
                {
                    user && user.role === 'recruiter' ? (
                        <ul className="flex justify-center gap-5">
                            <li>
                                <Link to='/admin/companies' className="cursor-pointer hover:underline">Companies</Link>
                            </li>
                            <li>
                                <Link className="cursor-pointer hover:underline">Contact</Link>
                            </li>

                        </ul>
                    ) : (
                        <ul className="flex h-full flex-wrap items-center justify-center gap-3">
                            <li>
                                <Link to='/' className="cursor-pointer hover:underline">Home</Link>
                            </li>
                            <li>
                                <Link to='/jobs' className="cursor-pointer hover:underline">Jobs</Link>
                            </li>
                        </ul>
                    )
                }

            </nav>
            <aside className="text-center text-sm">
                <p>&copy; 2024 Hire Hub. All Rights Reserved.</p>
            </aside>
        </footer>
    );
};

export default Footer;