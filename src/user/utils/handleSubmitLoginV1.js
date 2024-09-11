import Cookies from "js-cookie";

const handleSubmitLoginV1 = (e, user, navigate) => {
    e.preventDefault();

    fetch('http://localhost:4000/api/login', {
        method: "POST", 
        headers: {"Content-Type" : "application/json"},
        credentials: "include",
        body: JSON.stringify(user)
    }).then(response => { if(response.ok) {
        return response.json().then(data => {
            const token = data;
            Cookies.set('token', token, { expires: 3});
            navigate('/');
        });
            } else {
                return response.json().then(data => {
                alert(data.message || "login failed");
            });
    }}).catch(error => {
        console.error("login failed. ", error);
        alert("an error occurred during login. Try again later.");
    });
};

export default handleSubmitLoginV1;