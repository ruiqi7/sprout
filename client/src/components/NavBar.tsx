import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    
    const handleSignOut = () => {
        axios.post("http://localhost:8000/signout")
            .then(res => navigate("/"))
    }
    
    return (
        <div className="navbar">
            <button className="signout-button" onClick={handleSignOut}>Sign out!</button>
        </div>
    );
}

export default NavBar;