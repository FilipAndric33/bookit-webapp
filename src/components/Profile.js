import { useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Link } from "react-router-dom";
import { fetchUserV1 } from '../user/index';
import { deleteApartmentV1 } from '../apartments/index';

const Profile = () => {
    const [user, setUser] = useState();

    const fetchUser = async () => {
        const token = Cookies.get('token');
        if(token) {
            const decoded = jwtDecode(token);
            await fetchUserV1(setUser, decoded);
        };
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const deleteApartment = (apartment) => deleteApartmentV1(apartment, fetchUser, user);

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
                            <li id="profile-apartments" key={apartmentIndex}>
                                <Link to={`/apartment/${apartment}`}>apartment {apartmentIndex + 1}</Link>
                                <button className="delete-button" onClick={() => deleteApartment(apartment)} key={apartmentIndex}>Delete</button>
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