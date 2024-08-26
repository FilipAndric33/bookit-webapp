const fetchPhoneNumberV1 = async (ownerId, setNumber) => {
    try {
        const response = await fetch('http://localhost:4000/api/ownerNumber', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ id: ownerId })
        });
        if(!response.ok) {
            throw new Error('error getting a response');
        } 
            const data = await response.json();
            setNumber(data)
    } catch(err) {
        console.log("error fetching number: ",err);
    }
};

export default fetchPhoneNumberV1;