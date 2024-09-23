const deleteApartmentV1 = async (apartment, fetchUser, user) => {
    try {
        const response = await fetch(`http://localhost:4000/api/delete?apartment=${encodeURIComponent(apartment)}&user=${encodeURIComponent(user._id)}`, {
            method: "DELETE",
            headers: { "ContentType" : "application/json" }
        }).then(response => {
            if(!response.ok) {
                throw new Error("Error with the response");
            };
            return response.json();
        }).then(data => {
            alert("apartment deleted successfully ", data);
        });
        
        fetchUser();
        return;
    } catch(err) {
        console.log("Error deleting", err);
    };
};

export default deleteApartmentV1;