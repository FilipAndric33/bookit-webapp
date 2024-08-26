const handleSubmitRegisterV1 = (e, formData, navigate) => {
    e.preventDefault();
    
    fetch('http://localhost:4000/api/register', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    }).then(() => {
        alert("new account created successfully");
        navigate('/');
    });
};

export default handleSubmitRegisterV1;