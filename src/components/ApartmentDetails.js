import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval, isSameDay } from 'date-fns';

const ApartmentDetails = () => {
    const { id } = useParams();
    const [apartment, setApartment] = useState();
    const [number, setNumber] = useState(); 
    const [selectedDate, setSelectedDate] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const fetchApartment = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/apartmentDetails", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: id })
                });
                if (!response.ok) {
                    throw new Error("Error with the response");
                } 
                const data = await response.json();
                setApartment(data);
            } catch (err) {
                console.log("Error fetching apartment", err);
            }
        };

        fetchApartment();
    }, [id]);

    useEffect(() => {
        if(apartment) {
        const ownerId = apartment.owner;
        
        const fetchPhoneNumber = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/ownerNumber', {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({ id: ownerId })
                });
                if(!response.ok) {
                    throw new Error('error getting a response');
                } 
                    const data = await response.json();
                    setNumber(data)
            } catch(err) {
                console.log("error fetching number: ",err);
            }
        };

        fetchPhoneNumber();
        };
    }, [apartment]);

    const handleDateChange = (date) => {
        if(Array.isArray(date)) {
            const [start, end] = date;
            setStartDate(start);
            setEndDate(end);
        } else {
            setStartDate(date);
            setEndDate(null);
        }
    };

    const getAvailableDates = () => {
        if(!apartment || !apartment.availability) return [];

        return apartment.availability.map(dateStr => {
            const date = new Date(dateStr);
            date.setUTCHours(0, 0, 0, 0);
            return date;
        });
    };

    const availableDates = getAvailableDates();

    const isDateAvailable = (date) => {
        const normalizedDate = new Date(date);
        normalizedDate.setUTCHours(0, 0, 0, 0);

        return availableDates.some(availableDate => isSameDay(normalizedDate, availableDate));
    };

    const filterDate = (date) => {
        return isDateAvailable(date);
    };

    useEffect(() => {
        if(startDate && endDate) {
            const dateArray = eachDayOfInterval({
                start: new Date(startDate),
                end: new Date(endDate)
            });
            setSelectedDate(dateArray);
        } else {
            setSelectedDate([]);
        };
    }, [startDate, endDate]);

    const handlesubmit = (e) => {
        e.preventDefault();

        if(selectedDate.length > 0) {

            const removeDates = async () => {
                try {
                    const response = await fetch('http://localhost:4000/api/removeDates', {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify({ dates: selectedDate, id: apartment._id })
                    });
                    if(!response.ok) {
                        throw new Error("error getting a response");
                    };
                    } catch(err) {
                        console.log(err)
                    };
            };
            removeDates();
        };
    };

    const calculatePrice = () => {
        let price;

        if(selectedDate.length === 1) {
            price = apartment.startPrice;
        } else if (selectedDate.length > 1 && selectedDate.length < 5) {
            price = apartment.startPrice * (0.8 * selectedDate.length);
        } else {
            price = apartment.startPrice * (0.7 * selectedDate.length);
        };
        return price.toFixed(2);
    };

    return (
        <div className="details">
            <h2 className="apartmentDetailsTitle">Apartment Details:</h2>
            <div className="apartmentDetailsImages">
                {number ? (
                    apartment.images.map((image, imageIndex) => (
                        <Link to={`http://localhost:4000/${image}`} key={imageIndex}>
                            <img className='apartmentImage'
                            src={`http://localhost:4000/${image}`}
                            alt="property"
                            style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '30px' }}
                            />
                        </Link>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            {apartment ? (
                <div className="apartmentDetailsInfo">
                    <div className="apartmentDetailsLeft">
                        <p>Size: {apartment.apartmentSize}m²</p>
                        <p>Air Conditioning: {apartment.airConditioning ? 'Yes' : 'No'}</p>
                        <p>Heating: {apartment.heating ? 'Yes' : 'No'}</p>
                        <p>Balcony: {apartment.balcony ? 'Yes' : 'No'}</p>
                        <p>Parking: {apartment.parking ? 'Yes' : 'No'}</p>
                        <p>Free Wi-Fi: {apartment.freeWifi ? 'Yes' : 'No'}</p>
                        <p>Private Bathroom: {apartment.privateBathroom ? 'Yes' : 'No'}</p>
                        <p>Smoking: {apartment.smoking ? 'Yes' : 'No'}</p>
                        <p>Kitchen: {apartment.kitchen ? 'Yes' : 'No'}</p>
                        <p>For more information call number: {number}</p>
                        <p className="apartmentDescription">Description: {apartment.description}</p>
                    </div>
                    <div className="apartmentDetailsRight">
                        {selectedDate.length > 0 ? (
                            <h2 className='totalPrice'>Total price: {calculatePrice()}€</h2>
                        ) : (
                            <h2 className='startingPrice'>Starting price: {apartment.startPrice}€</h2>
                        )}
                        <form onSubmit={handlesubmit}>
                            <h3>Select a date:</h3>
                            <DatePicker
                                selected={startDate} 
                                startDate={startDate}
                                endDate={endDate}
                                onChange={handleDateChange}
                                filterDate={filterDate}
                                selectsRange
                                placeholderText='Select a date.'
                            />
                            <button type='submit'>Make a reservation</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div>Loading apartment details...</div>
            )}
        </div>
    );
};

export default ApartmentDetails;