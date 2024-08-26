import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleChangeUserV1, handleSubmitLoginV1 } from '../user/index';

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();
    const handleChange = (e) => handleChangeUserV1(e, user, setUser);
    const handleSubmit = (e) => handleSubmitLoginV1(e, user, navigate);

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