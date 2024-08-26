import { useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Link } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        const token = Cookies.get('token');
        if(token) {
            const decoded = jwtDecode(token);

        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/user', {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({ id: decoded.id })
                });
                if (!response.ok) {
                    throw new Error('error with the response');
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.error(err);                
            };
        };

    fetchUser();
};
    }, []);


    return (  
        <div className="userInfo">
            {user ? (
                <div className='profileInformation'>
                    <h2 className="profileInformationText">Profile Information: </h2>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <p><b>My property: </b></p>
                    {user.apartments.length > 0 ? (
                        <ul>
                        {user.apartments.map((apartment, apartmentIndex) => (
                            <li key={apartmentIndex}>
                                <Link to={`/apartment/${apartment}`}>apartment {apartmentIndex + 1}</Link>
                            </li>
                        ))}
                    </ul>
                    ) : (
                        <p>No property listed.</p>
                    )}
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
            <div className="profileButton">
                <button><Link to="/add">Add new poperty</Link></button>
            </div>
        </div>
    );
};

export default Profile;