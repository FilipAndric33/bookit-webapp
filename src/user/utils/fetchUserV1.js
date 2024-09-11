const fetchUserV1 = async (setUser, decoded) => {
    try {
        const response = await fetch('http://localhost:4000/api/user', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(decoded)
        });
        if (!response.ok) {
            throw new Error('error with the response');
        }
        const data = await response.json();
        setUser(data);
    } catch (err) {
        console.error(err);                
    };
};

export default fetchUserV1;