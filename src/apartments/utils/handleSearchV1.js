const handleSearchV1 = async (location, guests, priceRange, selectedDate, setResults) => {
    try {
        const response = await fetch(`http://localhost:4000/api/apartments?location=${encodeURIComponent(location)}&guests=${encodeURIComponent(guests)}&priceRange=${encodeURIComponent(priceRange)}&selectedDate=${encodeURIComponent(selectedDate)}`);
        if (!response.ok) {
            throw new Error('Error with the response');
        }
        const data = await response.json();
        setResults(data);
    } catch (err) {
        console.error("Error fetching data: ", err);
    }
}
 
export default handleSearchV1;