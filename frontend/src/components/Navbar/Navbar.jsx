
import './Navbar.css';
import dlithe from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext'; // adjust path as needed

const Navbar = () => {
    const { isAuthenticated } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={dlithe} alt="Logo" className="logo" />
            </div>
            {isAuthenticated && (
                <div className="navbar-right">
                    <Link to="/tmg">Trainers</Link>
                    <Link to="/trp">Training</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
