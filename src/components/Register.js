import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleChangeUserV1, handleSubmitRegisterV1 } from '../user/index';


const Register = () => {
    const  [formData, setFormData] = useState({
        username: "",
        password: "",
        phoneNumber: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    });

    const navigate = useNavigate();
    const handleChange = (e) => handleChangeUserV1(e, formData, setFormData);
    const handleSubmit = (e) => handleSubmitRegisterV1(e, formData, navigate);

    return ( 
        <div className="register">
            <form onSubmit={handleSubmit}>
            <label>Your username: </label>
        <input type="text" id="username" name="username" value={formData.username} required onChange={handleChange}/>
        

        <label>Your password: </label>
        <input type="password" id="password" name="password" value={formData.password} required onChange={handleChange} />
        

        <label>Your phone number: </label>
        <input type="number" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} required onChange={handleChange} />
        

        <label>Credit Card Number:</label>
        <input type="text" id="cardNumber" name="cardNumber" 
               pattern="[\d\s]{13,19}" 
               placeholder="0000 0000 0000 0000" 
               value={formData.cardNumber} 
               required 
               onChange={handleChange} />
        

        <label>Expiry Date:</label>
        <input type="text" id="expiryDate" name="expiryDate" 
               pattern="\d{2}/\d{2}" 
               placeholder="MM/YY" 
               value={formData.expiryDate} 
               required 
               onChange={handleChange} />
        

        <label>CVV:</label>
        <input type="text" id="cvv" name="cvv" 
               pattern="\d{3,4}" 
               placeholder="123" 
               value={formData.cvv} 
               required 
               onChange={handleChange} />
        
        <button type="submit">Submit</button>
            </form>
        </div>
    );
}
 
export default Register;