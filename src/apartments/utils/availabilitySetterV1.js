const availabilitySetterV1 = (startDate, endDate, setPropertyData) => {
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

export default availabilitySetterV1;