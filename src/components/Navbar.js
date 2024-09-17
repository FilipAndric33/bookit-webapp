import { Link } from "react-router-dom"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    let token;

    if(Cookies.get('token')) 
        token = Cookies.get('token')
    

    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    };

    return ( 
        <nav className="navbar">
            <h1>BookIT.com</h1>

            <div className="links">
                    {token ? (
                        <>
                        <Link to="/">Home</Link>
                        <Link to="/add">Add a property</Link>
                        <Link to="/profile">My profile</Link>
                        <Link to="/" onClick={handleLogout}>Log out</Link>
                        </>
                    ) : (
                        <>
                        <Link to="/">Home</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Log in</Link>
                        </>
                    )}
            </div>
        </nav>
    );
};
 
export default Navbar;