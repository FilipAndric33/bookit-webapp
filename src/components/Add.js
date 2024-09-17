import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useOnDropV1, handleChangeApartmentsV1, handleDateChangeV1, availabilitySetterV1, handleSubmitApartmentsV1 } from '../apartments/index';

const Dropzone = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const payload = jwtDecode(token);
    const userId = payload.id;

    const [propertyData, setPropertyData] = useState({
        images: [],
        location: "",
        guests: "",
        apartmentSize: "",
        description: "",
        airConditioning: false,
        heating: false,
        balcony: false,
        parking: false,
        freeWifi: false,
        privateBathroom: false,
        smoking: false,
        kitchen: false,
        owner: userId,
        startPrice: "",
        availability: []
    });
        const [files, setFiles] = useState([]);
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);


        const onDrop = useOnDropV1(setFiles);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop,
            accept:{ "image/*" : [] },
            maxSize: 4 * 1024 * 1024,
        });


    const handleChange = (e) => handleChangeApartmentsV1(e, setPropertyData);
    const handleDateChange = (e) => handleDateChangeV1(e, setStartDate, setEndDate);

    useEffect(() => {
        if (startDate && endDate) {
            const availabilitySetter = () => availabilitySetterV1(startDate, endDate, setPropertyData);
            availabilitySetter();
        }
    }, [startDate, endDate]);

    const handleSubmit = (e) => handleSubmitApartmentsV1(e, startDate, endDate, propertyData, files, navigate);

    return (
        <form onSubmit={handleSubmit}>
        <div className='dropzoneForm'>
            <h3>Images:</h3>
            <div {...getRootProps()} className="dropzone" style={{ border: '2px dashed #007bff', padding: '20px' }}>
                <input {...getInputProps()} name="images" />
                {isDragActive ? (
                    <p> Drop files here. </p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )
                }
            </div>
            <div className='addedImages'>
                <h4>Added images: </h4>
                <ul>
                    {files.map((file) => (
                        <li key={file.name}>
                            <img src={file.preview} alt={file.name} width="100px" height="100px" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div>
            <label>Apartment location:</label>
            <input type="string" name="location" value={propertyData.location} onChange={handleChange} required />
        </div>
      
        <div>
            <label>Apartment size (sqm):</label>
            <input type="number" name="apartmentSize" value={propertyData.apartmentSize} onChange={handleChange} required />
        </div>

        <div>
            <label>Number of guests:</label>
            <input type="number" name="guests" value={propertyData.guests} onChange={handleChange} required />
        </div>

        <div>
            <label>Starting price(€): </label>
            <input type="number" name="startPrice" value={propertyData.startPrice} onChange={handleChange} required />
        </div>

        <div>
            <label>Air Conditioning:</label>
            <input type="checkbox" name="airConditioning" checked={propertyData.airConditioning} onChange={handleChange} />
        </div>

        <div>
            <label>Heating:</label>
            <input type="checkbox" name="heating" checked={propertyData.heating} onChange={handleChange} />
        </div>

        <div>
            <label>Balcony:</label>
            <input type="checkbox" name="balcony" checked={propertyData.balcony} onChange={handleChange} />
        </div>

        <div>
            <label>Parking:</label>
            <input type="checkbox" name="parking" checked={propertyData.parking} onChange={handleChange} />
        </div>

        <div>
            <label>Free WiFi:</label>
            <input type="checkbox" name="freeWifi" checked={propertyData.freeWifi} onChange={handleChange} />
        </div>

        <div>
            <label>Private Bathroom:</label>
            <input type="checkbox" name="privateBathroom" checked={propertyData.privateBathroom} onChange={handleChange} />
        </div>

        <div>
            <label>Smoking:</label>
            <input type="checkbox" name="smoking" checked={propertyData.smoking} onChange={handleChange} />
        </div>

        <div>
            <label>Kitchen:</label>
            <input type="checkbox" name="kitchen" checked={propertyData.kitchen} onChange={handleChange} />
        </div>

        <div>
            <label>Property description:</label>
            <textarea name="description" value={propertyData.description} onChange={handleChange} required></textarea>
        </div>

        <div>
            <label>Mark available dates: </label>
            <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(date) => handleDateChange(date)}
                inline
            />
        </div>

        <button type="submit">Add Property</button>
    </form>
  );
};


export default Dropzone;