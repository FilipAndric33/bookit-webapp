const handleRemoveDatesV1 = (e, selectedDate, apartment) => {
    e.preventDefault();

    if(selectedDate.length > 0) {

        const removeDates = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/removeDates', {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({ dates: selectedDate, id: apartment._id })
                });
                if(!response.ok) {
                    throw new Error("error getting a response");
                };
                } catch(err) {
                    console.log(err)
                };
        };
        removeDates();
    };
};

export default handleRemoveDatesV1;