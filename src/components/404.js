import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="notFound">
            <h1>Sorry</h1>
            <p><b>This page cannot be found.</b></p>
            <Link to="/">Back to the home page...</Link>
        </div>
    );
}
 
export default NotFound;