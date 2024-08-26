import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
        const [apartments, setApartment] = useState([]);
        const navigate = useNavigate();

        useEffect(() => {
            const fetchApartments = async () => {
                try {
                    const response = await fetch('http://localhost:4000/api/home');
                    if (!response.ok) {
                        throw new Error('error with the response');
                    }
                    const data = await response.json();
                    setApartment(data);
                } catch (err) {
                    console.error("error fetching data: ", err);                
                };
            };

        fetchApartments();
        }, []);

        const handleView = (id) => {
            navigate(`/apartment/${id}`);
        };

        return (  
            <div className="apartments">
                    {apartments.map((apartment, apartmentIndex) => (
                        <div className="apartment" key={apartmentIndex}>
                            {apartment.images.length > 0 && (
                                 <div>
                                    <img 
                                    src={`http://localhost:4000/${apartment.images[0]}`}
                                    alt="property"
                                    />
                                </div>
                            )}
                            <div className="homeApartment">
                                <h3>Size: {apartment.apartmentSize}m²</h3>
                                <h3>Starting price: {apartment.startPrice}€</h3>
                                <button onClick={() => handleView(apartment._id)}>View</button>
                            </div>
                        </div>
                    ))
                    }
            </div>
        );
};


export default Home;