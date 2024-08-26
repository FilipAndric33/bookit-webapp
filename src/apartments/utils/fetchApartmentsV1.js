const fetchApartmentsV1 = async (setApartment) => {
                try {
                    const response = await fetch('http://localhost:4000/api/home');
                    if (!response.ok) {
                        throw new Error('error with the response');
                    }
                    const data = await response.json();
                    setApartment(data);
                } catch (err) {
                    console.error("error fetching data: ", err);                
                };
            };

export default fetchApartmentsV1;