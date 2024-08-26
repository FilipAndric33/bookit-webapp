const handleSubmitApartmentsV1 = async (e, startDate, endDate, propertyData, files, navigate) => {
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

export default handleSubmitApartmentsV1;