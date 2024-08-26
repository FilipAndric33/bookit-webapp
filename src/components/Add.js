import React, { useEffect, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dropzone = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const payload = jwtDecode(token);
    const userId = payload.id;

    const [propertyData, setPropertyData] = useState({
        images: [],
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


        const onDrop = useCallback((acceptedFiles)=> {
            if(acceptedFiles?.length) {
                setFiles(previousFiles => [
                    ...previousFiles,
                    ...acceptedFiles.map(file => 
                        Object.assign(file, { preview: URL.createObjectURL(file) })
                    )
                ]);
            }
        }, []);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop,
            accept:{ "image/*" : [] },
            maxSize: 4 * 1024 * 1024,
        });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
            let tick;
            if (type === "checkbox") {
                if(checked){
                    tick = true;
                } else tick = false;
            }
            setPropertyData((prevData) => ({
                ...prevData,
                [name]: type === "checkbox" ? tick : value,
        }));
    };

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

    useEffect(() => {
        if (startDate && endDate) {
            const availabilitySetter = () => {
                let dateArray = [];
                let currentDate = new Date(startDate);

                while (currentDate <= endDate) {
                    dateArray.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                setPropertyData(prevData => ({
                    ...prevData,
                    availability: dateArray
                }));
            };

            availabilitySetter();
        }
    }, [startDate, endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!startDate || !endDate) {
            alert('Please select availability dates.');
            return;
        };
          
        const formData = new FormData();        
        formData.append('apartmentSize', propertyData.apartmentSize);
        formData.append('airConditioning', propertyData.airConditioning);
        formData.append('heating', propertyData.heating);
        formData.append('balcony', propertyData.balcony);
        formData.append('parking', propertyData.parking);
        formData.append('freeWifi', propertyData.freeWifi);
        formData.append('privateBathroom', propertyData.privateBathroom);
        formData.append('smoking', propertyData.smoking);
        formData.append('kitchen', propertyData.kitchen);
        formData.append('description', propertyData.description);
        formData.append('owner', propertyData.owner);
        formData.append('startPrice', propertyData.startPrice);
        formData.append('availability', JSON.stringify(propertyData.availability));

        files.forEach((file) => {
            formData.append('images', file);
        });

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

    try {
        const response = await fetch('http://localhost:4000/api/add', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert('Property submitted successfully');
            navigate('/profile');
        } else {
            console.error('Error submitting property');
        }
    }catch (err) {
        console.error('Error submitting property:', err);
    };
    };

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
            <label>Apartment size (sqm):</label>
            <input type="number" name="apartmentSize" value={propertyData.apartmentSize} onChange={handleChange} required />
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