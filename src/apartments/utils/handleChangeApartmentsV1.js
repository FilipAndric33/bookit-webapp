const handleChangeApartmentsV1 = (e, setPropertyData) => {
    const { name, value, type, checked } = e.target;
        let tick;
        if (type === "checkbox") {
            if(checked){
                tick = true;
            } else tick = false;
        }
        setPropertyData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? tick : value,
    }));
};

export default handleChangeApartmentsV1;