import {Link} from "react-router-dom";
import {assets} from "../assets/assets.js";

const MobileNav = () => {
    return (
        <nav className="md:hidden flex justify-around py-2 text-white text-xs bg-black shrink-0">
            <Link to="/" className="flex flex-col items-center gap-1">
                <img className="w-6" src={assets.home_icon} alt="Home"/>
                Home
            </Link>
            <Link to="/search" className="flex flex-col items-center gap-1">
                <img className="w-6" src={assets.search_icon} alt="Search"/>
                Search
            </Link>
            <Link to="/library" className="flex flex-col items-center gap-1">
                <img className="w-6" src={assets.stack_icon} alt="Library"/>
                Library
            </Link>
        </nav>
    )
}

export default MobileNav
