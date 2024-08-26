import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval } from 'date-fns';
import { fetchApartmentV1, fetchPhoneNumberV1, handleDateChangeV1, getAvailableDatesV1, isDateAvailableV1, handleRemoveDatesV1, calculatePriceV1 } from '../apartments/index';

const ApartmentDetails = () => {
    const { id } = useParams();
    const [apartment, setApartment] = useState();
    const [number, setNumber] = useState(); 
    const [selectedDate, setSelectedDate] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const fetchApartment = () => fetchApartmentV1(id, setApartment);
        fetchApartment();
    }, [id]);

    useEffect(() => {
        if(apartment) {
        const ownerId = apartment.owner;
        const fetchPhoneNumber = () => fetchPhoneNumberV1(ownerId, setNumber);
        fetchPhoneNumber();
        };
    }, [apartment]);

    const handleDateChange = (date) => handleDateChangeV1(date, setStartDate, setEndDate);
    const getAvailableDates = () => getAvailableDatesV1(apartment);
    const availableDates = getAvailableDates();
    const isDateAvailable = (date) => isDateAvailableV1(date, availableDates);
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

    const handleSubmit = (e) => handleRemoveDatesV1(e, selectedDate, apartment);
    const calculatePrice = () => calculatePriceV1(apartment, selectedDate);
    
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
                        <form onSubmit={handleSubmit}>
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