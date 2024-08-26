const getAvailableDatesV1 = (apartment) => {
    if(!apartment || !apartment.availability) return [];

    return apartment.availability.map(dateStr => {
        const date = new Date(dateStr);
        date.setUTCHours(0, 0, 0, 0);
        return date;
    });
};

export default getAvailableDatesV1;