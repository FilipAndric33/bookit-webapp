const handleDateChangeV1 = (date, setStartDate, setEndDate) => {
    if(Array.isArray(date)) {
        const [start, end] = date;
        setStartDate(start);
        setEndDate(end);
    } else {
        setStartDate(date);
        setEndDate(null);
    }
};

export default handleDateChangeV1;