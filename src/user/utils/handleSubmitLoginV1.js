import Cookies from "js-cookie";

const handleSubmitLoginV1 = (e, user, navigate) => {
    e.preventDefault();

    fetch('http://localhost:4000/api/login', {
        method: "POST", 
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(user)
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.token) {
            Cookies.set('token', data.token, { expires: 3 });
            navigate('/');
        }
        else {
            alert("login failed.")
        };
    });
};

export default handleSubmitLoginV1;