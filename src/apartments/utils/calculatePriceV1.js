const calculatePriceV1 = (apartment, selectedDate) => {
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

export default calculatePriceV1;