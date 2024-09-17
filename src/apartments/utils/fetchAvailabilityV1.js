const fetchAvailabilityV1 = async (setAvailableLocations, setGuests) => {
    try {
        const response = await fetch('http://localhost:4000/api/availability');
        if(!response.ok) {
            throw Error("problem with response");
        }
        const data = await response.json();
        await setAvailableLocations(data.locations);
        await setGuests(data.guests);
        return
    } catch(err) {
        console.log("error: ", err);
    };

}
 
export default fetchAvailabilityV1;