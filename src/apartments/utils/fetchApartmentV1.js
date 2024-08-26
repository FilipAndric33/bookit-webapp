const fetchApartmentV1 = async (id, setApartment) => {
    try {
        const response = await fetch("http://localhost:4000/api/apartmentDetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        });
        if (!response.ok) {
            throw new Error("Error with the response");
        } 
        const data = await response.json();
        setApartment(data);
    } catch (err) {
        console.log("Error fetching apartment", err);
    }
};

export default fetchApartmentV1;