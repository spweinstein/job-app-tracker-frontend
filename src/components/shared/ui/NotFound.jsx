import { useNavigate } from "react-router";

const NotFound = () => { 
    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            {/* Back to previous page button using useNavigate */}
            <button onClick={() => navigate(-1)}>Back to Previous Page</button>
        </div>
    );
};

export default NotFound;