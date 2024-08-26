import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name] : value,
        });
    };

    const handleSubmit = (e) => {
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

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
            <label>Your username: </label>
            <input type="text" id="username" name="username" required value={user.username} onChange={handleChange}/>

            <label>Your password: </label>
            <input type="password" id="password" name="password" required value={user.password} onChange={handleChange}/>

            <button type="submit">Submit</button>
            </form>
        </div>
    );
}
 
export default Login;