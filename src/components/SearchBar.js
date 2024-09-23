import { useEffect, useState } from 'react';
import { handleSearchV1, fetchAvailabilityV1, handleDateChangeV1, handleLocationChangeV1 } from '../apartments/index';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval } from 'date-fns';

const SearchBar = ({ setLocatedApartments }) => {
    const [location, setLocation] = useState("");
    const [guests, setGuests] = useState("");
    const [priceRange, setPriceRange] = useState(500); 
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedDate, setSelectedDate] = useState([]);
    const [results, setResults] = useState([]);
    const [availableLocations, setAvailableLocations] = useState([]);
    const [availableGuests, setAvailableGuests] = useState("");  
    const [suggestions, setSuggestions] = useState([]);

    const handleGuestsChange = (e) => setGuests(e.target.value);
    const handleSubmit = () => handleSearchV1(location, guests, priceRange, selectedDate, setResults);
    const handleDateChange = (e) => handleDateChangeV1(e, setStartDate, setEndDate);
    const handlePriceChange = (e) => {
        const price = e.target.value;
        setPriceRange(price);
    };
    const handleLocationChange = (e) => handleLocationChangeV1(e, availableLocations, setLocation, setSuggestions);
    

    useEffect(() => {
        if(location.length > 0) {

        }
    }, [location])

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

    useEffect(() => {
        const fetchAvailability = () => fetchAvailabilityV1(setAvailableLocations, setAvailableGuests);
        fetchAvailability();
    }, []);
    
    useEffect(() => {
        if(results) {
            setLocatedApartments(results);
        }

    }, [results]);

    return ( 
        <>
          <div className="searchbar">
            <div className="input-row">
                  <div className='location-input-search'>
                    <input
                      type='text'
                      name='location'
                      id='location'
                      value={location}
                      placeholder='Select desired location'
                      onChange={handleLocationChange}
                      list='location-suggestions'
                    />
                    <datalist name="location-suggestions" id='location-suggestions'>
                      {suggestions.length > 0 && suggestions.map((sug, index) => (
                        <option value={sug} key={index}>{sug}</option>
                      ))}
                    </datalist>
                  </div>
                  
                  <div className='date-input-search' >
                    <DatePicker
                      selectsRange
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(date) => handleDateChange(date)}
                      placeholderText='Select a date.'
                    />
                  </div>
                  
                  <div className='guest-input-search'>
                    <select name="availableGuests" value={guests} onChange={handleGuestsChange}>
                      <option value="" disabled hidden>How many guests?</option>
                      {availableGuests.length > 0 && availableGuests.map((guest, guestIndex) => (
                        <option value={guest} key={guestIndex}>{guest}</option>
                      ))}
                    </select>
                  </div>

                    <div className="price-range-search">
                        <label>Put in your price range:</label>
                        <input 
                          type='range'
                          id='priceRange'
                          name='priceRange'
                          min="0"
                          max="1000"
                          step="1"
                          value={priceRange} 
                          onChange={handlePriceChange}
                        />
                    </div>
                    <div className="price-input-search">
                        <p>Current price(€): 
                          <input 
                            className="price-range-input" 
                            type='number' 
                            name="priceRange" 
                            value={priceRange} 
                            onChange={handlePriceChange}
                          />
                        </p>
                    </div>
            </div>
                            
            <div className="search-btn">
                <button type='submit' onClick={handleSubmit} role='button'>Search</button>
              </div>
          </div>
        </>
      );
}
 
export default SearchBar;